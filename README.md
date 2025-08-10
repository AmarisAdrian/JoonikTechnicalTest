# PRUEBA TECNICA JOONIK

## Descripción del Proyecto

Esta prueba está diseñada para evaluar las habilidades técnicas de un desarrollador full stack con experiencia en Laravel y React, utilizando TypeScript. Los aspectos
clave a evaluar incluyen la implementación de una API REST, la comunicación entre el frontend y el backend, y la capacidad de escribir código limpio y mantenible
siguiendo las mejores prácticas.

- **Backend**: Laravel (PHP)
- **Frontend**: React.Js
- **Base de datos**: Sqlite

## Requisitos Previos

- Docker
- Docker Compose
- Git

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AmarisAdrian/JoonikTechnicalTest.git
   cd JoonikTechnicalTest
   
2. Configurar variables de entorno en el entorno de docker 

     Archivo 1:  Configuración .ENV en backend : Debe copiar el archivo .env.example y modificar    
      -DB_CONNECTION=sqlite
      -DB_DATABASE=/var/www/html/database/database.sqlite
      -API_KEY=tu_api_key
   
    Archivo 2: Frontend/.env (Copiar de backend/.env.example y modificar):
      -VITE_API_URL=http://localhost:8000/api/v1/
      -VITE_API_KEY=tu_api_key
   
4. El proyecto se encuentra dockerizado por lo que al levantar el servicio se crea la base de datos, se ejecutan los seeders y las migraciones
5. Para crear una imagen de la prueba debe ejecutar docker-compose  --build up -d
6. El aplicativo se ejecuta en el navegador con las url :
    - FRONTEND : http://localhost:5173/
    - BACKEND  : http://localhost:8000/


