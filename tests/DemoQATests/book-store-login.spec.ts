import { test, expect } from '../../utils/test-base';

/*
NOTA: En un caso real el archivo .env no deberia ser incluido en el repositorio
pero a fines practicos lo incluí para que se puedan ejecutar los tests y se
pueda verificar cual fue la logica que usé para los mismos
*/

test("Prueba de login en Book Store con variables de entorno", async ({ bookStoreLoginPage }) => {    
    const user = process.env.bookStoreUserName;
    const pass = process.env.bookStorePassword;

    // 1. Validación de credenciales
    if (!user || !pass) {
        throw new Error("ERROR: Definir bookStoreUserName y bookStorePassword en el entorno.");
    }

    await bookStoreLoginPage.navigateLogin();

    // 2. Intento de login inicial
    await bookStoreLoginPage.login(user, pass);

    // 3. Verificación inteligente
    // Usamos un pequeño timeout para verificar si el login fue exitoso
    const isLogged = await bookStoreLoginPage.usernameLabel.isVisible({ timeout: 5000 }).catch(() => false);

    if (!isLogged) {
        console.log("Usuario no encontrado o sesión fallida. Intentando crear usuario...");
        await bookStoreLoginPage.createUser(user, pass);
        
        // Reintento de login tras creación
        await bookStoreLoginPage.navigateLogin();
        await bookStoreLoginPage.login(user, pass);
    }

    // 4. Assert final (El corazón del test)
    await expect(bookStoreLoginPage.usernameLabel).toBeVisible();
    await expect(bookStoreLoginPage.usernameLabel).toHaveText(user);
});
