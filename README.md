# Tripleten web_project_api_full

# Around the U.S. - Proyecto Full-Stack (API + React)

## Descripción del proyecto y funcionalidad

Aplicación web interactiva completa (Full-Stack) donde los usuarios pueden registrarse, iniciar sesión, editar su perfil y foto de avatar, así como publicar, eliminar y dar "me gusta" a tarjetas con fotografías. Este repositorio integra el frontend desarrollado en React con una API REST propia construida en Node.js, Express y MongoDB.

Funcionalidades principales:

- Registro e inicio de sesión de usuarios con autenticación mediante JWT (vigencia de 7 días).
- Protección de rutas en frontend y backend.
- Creación, visualización, eliminación (exclusiva para el autor) y conteo de likes de tarjetas.
- Validación de datos de entrada y manejo centralizado de errores y registros (logs).

## Tecnologías y técnicas utilizadas

- **Frontend:** React 18, Vite, React Router DOM, CSS3 (Metodología BEM), Fetch API.
- **Backend:** Node.js, Express.js, MongoDB y Mongoose.
- **Seguridad y Validación:** JSON Web Tokens (`jsonwebtoken`), encriptación con `bcryptjs`, validación de esquemas con `celebrate` / `Joi` y `validator`, configuración de CORS y variables de entorno (`dotenv`).
- **Monitoreo y Despliegue:** Registro de eventos y errores con `winston` y `express-winston`, servidor en la nube con NGINX, gestión de procesos con PM2 y certificados SSL (Let's Encrypt / Certbot).

## Enlaces de despliegue (URLs de la App)

- **Frontend (Dominio principal):** https://aroundexp.chickenkiller.com/
- **Backend (Subdominio API):** https://api.aroundexp.chickenkiller.com/
