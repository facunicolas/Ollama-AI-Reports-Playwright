declare namespace NodeJS {
    interface ProcessEnv {
        //Aqui se deben agregar las variables de entorno 
        // que se van a usar en el proyecto, para que Typescript 
        // no tire error de que no encuentra la variable
        tqaBookStoreUserName: string;
        tqaBookStorePassword: string;
    }
  }