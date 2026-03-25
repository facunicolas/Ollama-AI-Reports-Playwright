import { test, expect } from '../../utils/test-base';

/*
NOTA: En un caso real el archivo .env no deberia ser incluido en el repositorio
pero a fines practicos lo incluí para que se puedan ejecutar los tests y se
pueda verificar cual fue la logica que usé para los mismos
*/

test("Prueba de login en Book Store con variables de entorno", async ({ bookStoreLoginPage }) => {
    const user = process.env.bookStoreUserName;
    const pass = process.env.bookStorePassword;

    // el ! verifica que ni el user ni la password sean vacias o null, 
    // y el || es OR para que si alguna de las dos es falsa se lance el error
    if (!user || !pass) {
        throw new Error("Faltan las credenciales en las variables de entorno");
    }

    await bookStoreLoginPage.navigate();
    await bookStoreLoginPage.login(user, pass);

    await expect(bookStoreLoginPage.usernameLabel).toHaveText(user);
});
