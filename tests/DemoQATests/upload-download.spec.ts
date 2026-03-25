import { test, expect } from '../../utils/test-base';
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

    const filePath = 'utils\\sampleFile.jpeg';

    //Extraer el nombre del archivo de la ruta completa
    const fileName = filePath.split('\\').pop();

    await uploadDownloadPage.uploadFile(filePath);

    const uploadedFilePath = await uploadDownloadPage.getUploadedFilePath();
    // Verificar que la ruta del archivo subido sea correcta
    expect(uploadedFilePath).toContain(`C:\\fakepath\\${fileName}`);

});

