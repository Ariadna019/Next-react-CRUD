import mysql from 'serverless-mysql';

export const conn = mysql({
  config: {
    host: 'localhost',
    user: 'usuario',
    password: 'mina',//cambia la contraseña  por la que tengas tu en mysql
    database: 'productos_db', //nombre de la base de datos dentro de mysql
    port: 3307,  // Asegúrate de que el puerto sea 3307
    }
});
