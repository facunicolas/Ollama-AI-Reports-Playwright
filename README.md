# 🎭 Playwright y TypeScript + Análisis de Errores con Ollama AI

Este repositorio contiene mis prácticas y experimentos avanzados en automatización de pruebas E2E. El enfoque principal es la creación de un framework mantenible, escalable y potenciado por herramientas de inteligencia artificial ejecutadas localmente.

En este proyecto, estoy aplicando patrones de diseño y funcionalidades avanzadas de Playwright,

POM (Page Object Model): Estructuración del código para separar la lógica de las pruebas de los selectores de los elementos de la interfaz, mejorando la mantenibilidad y legibilidad.

Fixtures: Uso de fixtures personalizados para configurar el estado de las pruebas, gestionar la autenticación y preparar el entorno de forma limpia y reutilizable.
_________
## 🤖 Integración de IA Local (Ollama)

Para optimizar el proceso de depuración (debugging), este proyecto incluye un Reporter personalizado que se integra con Ollama:

Análisis Automático: Cuando un test falla, el reporter envía el error, el stack trace y el fragmento de código afectado a un modelo de lenguaje local.

Diagnóstico Técnico: La IA genera un reporte con la causa raíz y una sugerencia de corrección siguiendo el patrón Page Object Model (POM).

Privacidad y Costo: Al usar Ollama, el análisis se realiza de forma local sin enviar datos a la nube y sin depender de suscripciones a APIs externas.
_________
## NOTA: El archivo .env se incluye en este repositorio solo con fines demostrativos para facilitar la ejecución inmediata de las pruebas.
_________
### Para ejecutar este proyecto en tu entorno local, sigue estos pasos en la consola:

1- Clona el repositorio:
`git clone https://github.com/facunicolas/Ollama-AI-Reports-Playwright.git`

2- Instala las dependencias:
`npm install`

3- Configurar Ollama (Opcional si se quiere ejecutar el reporte de IA):

 - Tener instalado Ollama.

 - Descargar un modelo compatible: `ollama pull llama3` .

4- Instalar los navegadores de Playwright:
`npx playwright install`
_________
### Cómo ejecutar las pruebas

Puedes ejecutar todas las pruebas con el siguiente comando:
`npx playwright test`

El reporte de resultados después de la ejecución esta configurado para abrirse automaticamente, tanto el nativo de playwright como el reporte html personalizado para la respuesta de la IA .

_________
### Objetivos del Proyecto

- [x] Aprender a estructurar proyectos de automatización escalables.
- [x] Dominio de esperas asincronas y aserciones web.
- [x] Dominar el manejo de estados mediante fixtures.
- [x] Implementar buenas prácticas de selectores y aserciones.
- [X] Uso de herramientas AI para analisis de errores.

_________
### Retos Tecnicos y Soluciones

* Interacciones de Drag and Drop: Se detectó que en entornos de ejecución rápida (Headless), las acciones nativas de mouse no disparaban correctamente los eventos de la librería SortableJS. Se implementó una solución mediante page.evaluate para manipular el DOM directamente para garantizar la confiabilidad del test.

* Validación Dinámica de Formularios: En lugar de validar colores de bordes (que pueden ser inconsistentes), se utilizó la API de validación nativa de HTML5 (checkValidity) a través de Locators del POM para verificar los estados de error.