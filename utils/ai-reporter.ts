import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

interface TestFailure {
    title: string;
    error: string;
    aiAnalysis: string;
}

class AIReporter implements Reporter {
    private ollamaUrl = 'http://localhost:11434/api/generate';
    private failures: TestFailure[] = [];
    private analysisPromises: Promise<void>[] = [];

    // Función para limpiar códigos de colores ANSI que confunden al LLM
    private stripAnsi(str: string): string {
        return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
    }

    async onTestEnd(test: TestCase, result: TestResult) {
        if (result.status === 'failed' || result.status === 'timedOut') {
            // Limpiamos el error antes de mandarlo a la IA
            const cleanError = this.stripAnsi(result.error?.message || 'Sin error');
            const cleanStack = this.stripAnsi(result.error?.stack || 'Sin stack');
            const snippet = result.errors.length > 0
                ? result.errors[0].snippet
                : "No disponible";

            const promise = this.getAIAnalysis(test.title, cleanError, cleanStack, snippet ?? "No hay snippet disponible");
            this.analysisPromises.push(promise);
        }
    }

    private async getAIAnalysis(title: string, error: string, stack: string, snippet: string): Promise<void> {
        try {
            console.log(`🤖 Analizando: ${title}...`);
            const response = await axios.post(this.ollamaUrl, {
                model: 'llama3', // Asegúrate de tener este modelo en Ollama
                prompt: `
        [ROL: SENIOR QA AUTOMATION ENGINEER]
        [CONTEXTO: DEPURACION DE ERROR EN PRUEBAS AUTOMATIZADAS CON PLAYWRIGHT]
        [MODO: ANÁLISIS DE CAUSA RAÍZ (RCA)]
        [OBLIGATORIO: QUE TODA LA RESPUESTA SEA EN ESPAÑOL]
        
        DATOS DEL FALLO:
        - TEST: ${title}
        - ERROR: ${error} 
        - STACK: ${stack} 
        - SNIPPET_FALLIDO: ${snippet} // Si podés capturar las líneas del error
      
        INSTRUCCIONES DE PROCESAMIENTO:
        1. No utilices introducciones como "Claro", "Entiendo" o "Parece que", No des opiniones personales.  
        2. Analizá el STACK para identificar el archivo y línea exactos.
        3. Si el error es un Timeout o SelectorNotFound, evaluá si el selector actual cumple con las Best Practices de Playwright.
        4. Generá la salida estrictamente en codigo typescript sin preámbulos.
      
        ### 🔴 DIAGNÓSTICO
        - Identificar el tipo de error (Error de Aserción, Timeout, Selector No Encontrado) y la causa raíz exacta basada en el log.
        - Explicación técnica de por qué falló (ej: "El elemento fue tapado por un modal" o "El estado del DOM cambió antes de la aserción").
        
        ### 🔍 DISCREPANCIA
        - **Esperado**: 
        - **Recibido**:
      
        ### 🛠 ACCIÓN o REFACTOR SUGERIDO

      `,
                stream: false,
            }, { timeout: 60000 });

            this.failures.push({
                title,
                error,
                aiAnalysis: response.data.response
            });
        } catch (err) {
            console.error(`❌ Error en IA para ${title}`);
        }
    }

    async onEnd() {
        await Promise.all(this.analysisPromises);
        if (this.failures.length > 0) {
            const reportPath = this.generateHTML();
            this.openReport(reportPath);
        }
    }

    private generateHTML(): string {
        const reportPath = path.join(process.cwd(), 'test-results', 'ai-dashboard.html');

        const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reporte de errores IA</title>
        <style>
            :root {
                --bg-color: #121212;
                --card-bg: #1e1e1e;
                --text-main: #e0e0e0;
                --text-muted: #a0a0a0;
                --error-color: #ff6b6b;
                --error-bg: #2d1a1a;
                --ai-color: #4dabf7;
                --ai-bg: #1a2635;
                --border-color: #333333;
                --accent: #00d2ff;
            }

            body { 
                font-family: 'Segoe UI', Roboto, Helvetica, sans-serif; 
                background-color: var(--bg-color); 
                color: var(--text-main);
                padding: 30px; 
                margin: 0;
            }

            .container { 
                max-width: 1000px; 
                margin: auto; 
            }

            header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--border-color);
                margin-bottom: 30px;
            }

            header h1 { 
                margin: 0; 
                font-size: 28px; 
                color: var(--accent);
                display: flex;
                align-items: center;
                gap: 15px;
            }

            header .stats {
                background-color: var(--error-bg);
                color: var(--error-color);
                padding: 5px 15px;
                border-radius: 20px;
                font-weight: bold;
                font-size: 0.9em;
                border: 1px solid var(--error-color);
            }

            .card { 
                background-color: var(--card-bg); 
                border-radius: 12px; 
                padding: 25px; 
                margin-bottom: 25px; 
                border-left: 6px solid var(--error-color); 
                box-shadow: 0 4px 15px rgba(0,0,0,0.3); 
                transition: transform 0.2s;
            }

            .card:hover {
                transform: translateY(-3px);
            }

            .card h3 {
                margin-top: 0;
                color: var(--text-main);
                font-size: 1.3em;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 10px;
                margin-bottom: 20px;
            }

            .section-label {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 0.8em;
                color: var(--text-muted);
                margin-bottom: 8px;
                display: block;
            }

            .error-container { 
                background-color: var(--error-bg); 
                color: var(--error-color); 
                padding: 15px; 
                border-radius: 8px; 
                font-family: 'Cascadia Code', 'Consolas', monospace; 
                font-size: 0.9em; 
                margin-bottom: 20px; 
                border: 1px solid rgba(255, 107, 107, 0.3);
                white-space: pre-wrap; /* Mantiene saltos de línea y espacios */
                overflow-x: auto; /* Scroll horizontal si es necesario */
            }

            .ai-container { 
                background-color: var(--ai-bg); 
                padding: 20px; 
                border-radius: 8px; 
                border: 1px solid var(--ai-color); 
                line-height: 1.7; 
                color: var(--text-main);
            }

            .ai-container strong.ai-title { 
                color: var(--ai-color); 
                font-size: 1.1em; 
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
            }

            .ai-content {
                color: var(--text-main);
            }

            /* Estilo básico para bloques de código dentro del análisis de IA */
            .ai-content code {
                background-color: rgba(255,255,255,0.1);
                padding: 2px 5px;
                border-radius: 4px;
                font-family: monospace;
            }

            footer {
                text-align: center;
                margin-top: 50px;
                color: var(--text-muted);
                font-size: 0.85em;
                padding-top: 20px;
                border-top: 1px solid var(--border-color);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>🚀 Panel QA - IA 🚀</h1>
                <div class="stats">Fallos: ${this.failures.length}</div>
            </header>

            ${this.failures.map(f => `
                <div class="card">
                    <h3>🔴 Test: ${f.title}</h3>
                    
                    <span class="section-label">Detalle del Error</span>
                    <div class="error-container">${f.error}</div>
                    
                    <div class="ai-container">
                        <strong class="ai-title">Analisis y Sugerencia</strong>
                        <div class="ai-content">${f.aiAnalysis.replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
            `).join('')}

            <footer>
                Generado automáticamente por AIReporter local - Playwright Automation - Modo Oscuro
            </footer>
        </div>
    </body>
    </html>`;

        // Aseguramos que el directorio existe antes de escribir
        const reportDir = path.dirname(reportPath);
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        fs.writeFileSync(reportPath, htmlContent);
        return reportPath;
    }

    private openReport(reportPath: string) {
        const cmd = process.platform === 'win32' ? 'start' : 'open';
        exec(`${cmd} "" "${reportPath}"`);
    }
}

export default AIReporter;