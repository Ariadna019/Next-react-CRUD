# Proyecto Next.js  con MySQL, Cloudinary y Tailwind

Este es un proyecto construido con Next.js que se conecta a una base de datos MySQL y permite realizar operaciones CRUD. Además, permite subir imágenes a la nube mediante Cloudinary y está estilizado con Tailwind CSS.


Tecnologías utilizadas
Next.js 13 (App Router, Server Actions)

MySQL (Base de datos)

Cloudinary (Gestión y almacenamiento de imágenes)

Tailwind CSS (Estilos y diseño)

Postman (Pruebas de API)

# ⚙️ Instalación y configuración  

Para ejecutar este proyecto en tu máquina local, sigue los siguientes pasos:  

### 1️⃣ Clonar el repositorio  
Ejecuta el siguiente comando en la terminal:  


### 2️⃣ Instalar dependencias  
Instala las dependencias del proyecto con:  

```bash
npm install
```

### 3️⃣ Configurar variables de entorbi mmodifica en la carpeta libs del archivo mysql.js ahi msofica segun tu base de dato mysql, lo mismo para cloudinary 
```env
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/nombre_base_datos
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

Reemplaza los valores con tus credenciales correspondientes.  

---

## 🗄️ Estructura de la base de datos  

El proyecto utiliza una tabla llamada **productos**, cuya estructura en MySQL es la siguiente:  

```sql
CREATE TABLE productos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🌐 API Endpoints, vista del front end , de la pagina web :

### 📌 Obtener todos los productos (Página principal)  

```http
http://localhost:3000/api/products
```
Devuelve una lista con todos los productos almacenados.  



### 📌 Crear un nuevo producto  
Al acceder a la siguiente URL, se generará automáticamente un formulario donde podrás ingresar los datos del producto y subir imágenes:

```http
 http://localhost:3000/api/products/new

```
Agrega un nuevo producto a la base de datos.  

### 📌 Editar un producto  
En la página web, al hacer clic sobre un producto listado en `/api/products`, serás redirigido automáticamente a un formulario donde podrás modificar el nombre, descripción, precio, etc., y eliminar el producto si lo deseas.

```http
http://localhost:3000/api/products/{id}

```

