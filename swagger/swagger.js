const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opciones de configuración para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KALEV API",
      description: "Documentación de la API para el proyecto KALEV",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Introduce el token JWT en el encabezado Authorization con el formato 'Bearer <token>'",
        },
      },
      schemas: {
        // Esquema para un usuario completo
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            nombre: {
              type: "string",
              example: "Juan Pérez",
            },
            correo: {
              type: "string",
              format: "email",
              example: "juan.perez@example.com",
            },
            contraseña: {
              type: "string",
              format: "password",
              example: "123456",
            },
          },
          required: ["id", "nombre", "correo", "contraseña"],
        },
        // Esquema para un nuevo usuario (registro)
        NuevoUsuario: {
          type: "object",
          properties: {
            nombre: {
              type: "string",
              example: "Ana Torres",
            },
            correo: {
              type: "string",
              format: "email",
              example: "ana.torres@example.com",
            },
            rol: {
              type: "string",
              example: "docente",
            },
            contraseña: {
              type: "string",
              format: "password",
              example: "abcdef",
            },
          },
          required: ["nombre", "correo", "contraseña"],
        },
        // Esquema para el login de usuario
        LoginUsuario: {
          type: "object",
          properties: {
            correo: {
              type: "string",
              format: "email",
              example: "admin@example.com",
            },
            contraseña: {
              type: "string",
              format: "password",
              example: "admin12345",
            },
          },
          required: ["correo", "contraseña"],
        },
        // Esquema para cambiar la contraseña
        CambiarContrasenia: {
          type: "object",
          properties: {
            nueva_contraseña: {
              type: "string",
              format: "password",
              example: "nuevacontraseña123",
            },
          },
          required: ["nueva_contraseña"],
        },
        // Esquema para una clase
        Clase: {
          type: "object",
          properties: {
            id_clase: {
              type: "integer",
              example: 101,
            },
            nombre_clase: {
              type: "string",
              example: "Matemáticas Avanzadas",
            },
            nivel: {
              type: "string",
              example: "Secundaria",
            },
            descripcion: {
              type: "string",
              example: "Clase enfocada en álgebra y geometría.",
            },
          },
          required: ["id_clase", "nombre_clase", "nivel", "descripcion"],
        },
        // Esquema para unirse a una clase
        UnirseClase: {
          type: "object",
          properties: {
            codigo_clase: {
              type: "string",
              example: "ABC123",
            },
          },
          required: ["codigo_clase"],
        },
        // Esquema para un juego
        Juego: {
          type: "object",
          properties: {
            id_juego: {
              type: "integer",
              example: 1,
            },
            nombre_juego: {
              type: "string",
              example: "Aventura Matemática",
            },
            descripcion: {
              type: "string",
              example: "Juego interactivo para practicar operaciones matemáticas.",
            },
            nivel_dificultad: {
              type: "string",
              example: "Fácil",
            },
          },
          required: ["id_juego", "nombre_juego", "descripcion", "nivel_dificultad"],
        },
        // Esquema para reporte en PDF
        ReportePDF: {
          type: "object",
          properties: {
            nombre_docente: {
              type: "string",
              example: "Laura Gómez",
            },
            nombre_clase: {
              type: "string",
              example: "Ciencias Naturales",
            },
            estudiantes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  nombre_estudiante: {
                    type: "string",
                    example: "Carlos Díaz",
                  },
                  progreso: {
                    type: "string",
                    example: "70%",
                  },
                  estilos_aprendizaje: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "Visual",
                    },
                  },
                  calificacion: {
                    type: "number",
                    format: "float",
                    example: 85.5,
                  },
                },
                required: ["nombre_estudiante", "progreso", "estilos_aprendizaje", "calificacion"],
              },
            },
          },
          required: ["nombre_docente", "nombre_clase", "estudiantes"],
        },
      },
    },
    security: [
      {
        BearerAuth: []
      }
    ],
    servers: [
      {
        url: "https://api-appkalev.up.railway.app",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Asegúrate de que esta ruta sea correcta
};

// Inicializa Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Función para configurar Swagger en tu aplicación
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;