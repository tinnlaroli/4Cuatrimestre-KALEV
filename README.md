# Proyecto KALEV - Cuarto Cuatrimestre

Este repositorio contiene los componentes principales del proyecto **KALEV**, desarrollado como parte de los estudios del cuarto cuatrimestre en la UTCV. El objetivo del proyecto es reducir el abandono escolar mediante la personalización de métodos de enseñanza basados en los estilos de aprendizaje de los estudiantes.

## Índice
1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Contenidos del Repositorio](#contenidos-del-repositorio)
3. [Instalación](#instalación)
   - [Requisitos Previos](#requisitos-previos)
   - [Configuración Inicial](#configuración-inicial)
4. [Uso](#uso)
5. [Características Destacadas](#características-destacadas)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Contribución](#contribución)
8. [Autores](#autores)
9. [Licencia](#licencia)

## Contenidos del Repositorio

1. **Aplicación Móvil:**
   - Plataforma diseñada para estudiantes y docentes.
   - Desarrollo en **Android (Java)**.
   - Funcionalidades principales:
     - Estudiantes: Acceso a juegos educativos y personalización del perfil.
     - Docentes: Creación y gestión de clases, asignación de juegos y generación de reportes en PDF.

2. **APIs:**
   - Backend desarrollado en **Node.js** con **PostgreSQL** como base de datos.
   - Rutas implementadas:
     - Gestión de usuarios.
     - Administración de clases.
     - Seguimiento de progreso de estudiantes.
     - Control de premios y logros.

3. **Documentación:**
   - Casos de prueba
   - Estimación de costos
   - Definición de modelo de calidad

## Instalación

### Requisitos Previos
- **Node.js** (v16 o superior)
- **PostgreSQL** (configurado en el puerto 5444)
- **Android Studio** (para la app móvil)

### Configuración Inicial
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/kalev.git
   cd kalev
   ```

2. Instala las dependencias del backend:
   ```bash
   cd api
   npm install
   ```

3. Configura la base de datos PostgreSQL:
   - Asegúrate de que PostgreSQL esté corriendo en el puerto **5444**.
   - Importa el esquema de la base de datos desde el archivo `db/schema.sql`.

4. Configura el archivo `.env` en la carpeta `api` con las siguientes variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5444
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=kalev
   ```

5. Inicia el servidor de las APIs:
   ```bash
   npm start
   ```

6. Importa el proyecto de la app móvil en Android Studio y ejecútalo en un emulador o dispositivo físico.

## Uso

- **Docentes:**
  1. Inicia sesión en la app móvil.
  2. Crea una nueva clase y comparte el código con los estudiantes.
  3. Asigna juegos a la clase y revisa el progreso desde la sección de reportes.

- **Estudiantes:**
  1. Ingresa con tu correo y el código de clase proporcionado.
  2. Participa en los juegos asignados y mejora tu aprendizaje.
  3. Consulta tu progreso y logros desde tu perfil.

## Características Destacadas
- **Personalización de la enseñanza:** Uso de IA para identificar estilos de aprendizaje.
- **Gamificación:** Juegos educativos personalizados para estudiantes.
- **Reportes:** Generación de informes en PDF para los docentes.

## Tecnologías Utilizadas
- **Frontend móvil:** Java para Android.
- **Backend:** Node.js.
- **Base de datos:** PostgreSQL.
- **Herramientas adicionales:** Postman, Git, Obsidian.

## Contribución
Este proyecto es parte del aprendizaje, pero cualquier sugerencia o mejora es bienvenida. Puedes abrir un issue o enviar un pull request.

## Autores
- **Martín Lara:** Coordinador del proyecto, desarrollo del backend y base de datos.
- **Fernanda Pacheco:** Desarrollo de la aplicación móvil y diseño de interfaz.
- **Maria Jose Bazan:** Documentación y análisis de requisitos.
- **Bet-sua Madai Velazquez:** Pruebas de calidad y control de versiones.

Estudiantes de Tecnologías de la Información área Desarrollo de Software Multiplataforma, UTCV, Veracruz, México.


