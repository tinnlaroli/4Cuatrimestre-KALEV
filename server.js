require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Importamos el paquete cors
const { pool } = require("./src/config/dbConfig");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Habilitar CORS para todos los orígenes
app.use(cors());

// O si deseas permitir solo tu dominio local:
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Middleware
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar rutas
const userRoutes = require("./src/routes/userRoutes");
const gruposRoutes = require("./src/routes/gruposRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const styleRoutes = require("./src/routes/styleRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");

// Usar rutas
app.use("/usuarios", userRoutes);
app.use("/grupos", gruposRoutes);
app.use("/students", studentRoutes);
app.use("/styles", styleRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/reportes", reportRoutes);
app.use("/feedback", feedbackRoutes);

// Verificar conexión a la base de datos antes de iniciar el servidor
(async () => {
  try {
    // Realizar una consulta simple para verificar la conexión
    await pool.query("SELECT NOW()");
    console.log("Conexión a la base de datos establecida.");

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en ${API_URL}`);
      console.log(`Documentación Swagger en ${API_URL}/api-docs`);
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1); // Finalizar proceso si no hay conexión
  }
})();
