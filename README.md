# Hackathon 2026

Repositorio central del proyecto. Sistema SaaS B2B para la gestion de bares ludicos y gamificacion de la experiencia de usuario.

## 1. Estructura del Proyecto

El repositorio utiliza una estructura de monorepo para facilitar la gestion de dependencias y el despliegue continuo.

/
├── backend/             # API REST en Node.js y Express (Desplegado en Azure)
├── frontend/            # Aplicacion React con Vite y TypeScript (Desplegado en Vercel)
├── infra/               # Docker Compose local y scripts de inicializacion de PostgreSQL
├── .github/workflows/   # Configuracion de CI/CD para Azure y Vercel
├── .gitignore           # Exclusion de node_modules y archivos .env
└── README.md            # Documentacion principal

## 2. Linea Base y Requisitos

El proyecto se encuentra en su Linea Base 0. El entorno esta configurado para asegurar que el despliegue sea exitoso desde el inicio.

### Requisitos previos
* Node.js v18 o superior
* Docker y Docker Compose (para base de datos local)
* Git instalado

### Configuracion Local
1. Clonar el repositorio.
2. Crear archivos .env en /backend y /frontend basandose en los archivos .env.example.
3. Ejecutar npm install en ambas carpetas.
4. Para levantar la base de datos local: docker-compose up -d (desde la carpeta infra).

## 3. Gestion de Codigo (SCM)

### Estrategia de Ramas
* main: Codigo estable y productivo. Conectado a los entornos de produccion.
* feature/nombre-tarea: Desarrollo de nuevas funcionalidades.
* fix/nombre-error: Correccion de errores criticos.

### Reglas de Colaboracion
* Prohibido trabajar dos personas sobre la misma rama de feature. Esto evita conflictos de merge complejos.
* Si una funcionalidad requiere cambios en Front y Back, dividir en feature/tarea-front y feature/tarea-back.
* Antes de iniciar cualquier tarea, ejecutar: git checkout main && git pull origin main.

## 4. Convencion de Commits

Utilizamos el estandar de Conventional Commits para mantener un historial legible. Formato: tipo: descripcion en minusculas.

* feat: Nuevas funcionalidades (ej: feat: login con validacion de mesa).
* fix: Correccion de errores (ej: fix: error de conexion con azure).
* chore: Tareas de mantenimiento o dependencias (ej: chore: instalacion de playwright).
* docs: Cambios en documentacion (ej: docs: actualizacion de variables de entorno).

## 5. Flujo de Pull Requests (PR)

1. Al finalizar una funcionalidad, subir la rama al repositorio remoto.
2. Abrir una PR hacia la rama main.
3. Al menos un companero debe realizar una revision rapida (Sanity Check) antes de aprobar el merge.
4. Una vez aprobado, el despliegue a Azure o Vercel se disparara de forma automatica.
