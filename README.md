# Social-Network-wuth-React-and-Node.js
# Social Network – React + Node.js

Mini red social fullstack construida con **React**, **Node.js**, **Express**, **TypeScript** y **PostgreSQL**.  
Incluye autenticación JWT, feed global, posts personales, likes, edición y eliminación de publicaciones.

---

## 🚀 Features

- 🔐 Autenticación con JWT
- ➕ Creación de usuarios
- 🧾 Crear publicaciones
- 🌍 Feed global de posts
- 👤 Feed personal (My posts)
- ❤️ Likes con contador
- 🔁 Toggle like (like / unlike)
- 💾 Persistencia de likes al recargar
- ✏️ Editar publicaciones propias
- 🗑️ Eliminar publicaciones propias
- 📊 Contador de likes por post
- 🔎 Buscador de usuarios, cuando se selecciona a un usuario se muestran los post de este usuario
- 🧠 Protección de rutas backend
- 🧱 Arquitectura frontend + backend separada

---

## 🛠️ Tecnologías usadas

### Frontend
- React
- TypeScript
- React Router
- Axios
- CSS 
- Vite

### Backend
- Node.js
- Express
- TypeScript
- Sequelize ORM
- PostgreSQL
- JWT
- Docker & Docker Compose

---

## 📦 Requisitos

- Docker
- Docker Compose
- Node.js (solo si ejecutas frontend fuera de Docker)

---

## 🧑‍💻 Usuarios de prueba (seed)

El proyecto incluye usuarios genéricos creados por seed:

| Username | Password |
|--------|----------|
| alice  | 123456   |
| bob    | 123456   |

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/social-network-react-node.git
cd social-network-react-node

### 2. Levantar backend + base de datos

docker compose up --build
Esto levanta:

Backend en http://localhost:3000

PostgreSQL en el puerto 5432

### 3. Ejecutar frontend

cd frontend
npm install
npm run dev
Frontend disponible en:
http://localhost:5173

# Social Network – React + Node.js

Mini full-stack social network built with **React**, **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.  
Includes JWT authentication, global feed, personal posts, likes, editing, and deleting posts.

---

## 🚀 Features

- 🔐 Authentication with JWT
- ➕ User creation
- 🧾 Create posts
- 🌍 Global feed of posts
- 👤 Personal feed (My posts)
- ❤️ Likes with counter
- 🔁 Toggle like (like / unlike)
- 💾 Persistence of likes when reloading
- ✏️ Edit your own posts
- 🗑️ Delete your own posts
- 📊 Like counter per post
- 🔎 User search engine; when a user is selected, that user's posts are displayed
- 🧠 Backend route protection
- 🧱 Separate frontend + backend architecture

---

## 🛠️ Technologies used

### Frontend
- React
- TypeScript
- React Router
- Axios
- CSS 
- Vite

### Backend
- Node.js
- Express
- TypeScript
- Sequelize ORM
- PostgreSQL
- JWT
- Docker & Docker Compose

---

## 📦 Requirements

- Docker
- Docker Compose
- Node.js (only if you run frontend outside of Docker)

---

## 🧑‍💻 Test users (seed)

The project includes generic users created by seed:

| Username | Password |
|--------|----------|
| alice  | 123456   |
| bob    | 123456   |

---

## ⚙️ How to run the project

### 1. Clone the repository

git clone https://github.com/tu-usuario/social-network-react-node.git
cd social-network-react-node

### 2. Set up backend + database

docker compose up --build
This sets up:

Backend at http://localhost:3000

PostgreSQL on port 5432

### 3. Run frontend

cd frontend
npm install
npm run dev
Frontend available at:
http://localhost:5173

