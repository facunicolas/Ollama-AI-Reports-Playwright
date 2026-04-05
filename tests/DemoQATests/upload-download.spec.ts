import { test, expect } from '../../utils/test-base';
import path from 'path';
import fs from 'fs'

test.beforeEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.navigate();
});

test('Descargar un archivo y verificar su existencia física', async ({ uploadDownloadPage }) => {
    
    const file = await uploadDownloadPage.downloadFile();

    // Verificar que Playwright completó la descarga
    expect(file.path).not.toBeNull();

    // Verificar que el archivo existe realmente en el sistema de archivos
    const fileExists = fs.existsSync(file.path!);
    expect(fileExists).toBeTruthy();

    // Verificar nombre sugerido del archivo
    expect(file.name).toBe('sampleFile.jpeg'); 

});

test('Subir un archivo y verificar su ruta', async ({ uploadDownloadPage }) => {
    
    // 1. Usamos path.join para que la ruta sea válida en Windows (utils\...) y Linux (utils/...)
    const filePath = path.join('utils', 'sampleFile.jpeg');

    // 2. Extraer el nombre de forma segura sin importar el separador
    const fileName = path.basename(filePath); 

    await uploadDownloadPage.uploadFile(filePath);

    const uploadedFilePath = await uploadDownloadPage.getUploadedFilePath();
    
    // 3. Verificación flexible
    // Usamos una expresión regular o simplemente verificamos que contenga el nombre del archivo
    // 'fakepath' es un estándar de los navegadores, pero las barras pueden variar
    expect(uploadedFilePath).toContain(fileName);
    expect(uploadedFilePath).toMatch(/fakepath/); 
});

