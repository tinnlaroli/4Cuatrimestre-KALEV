require("dotenv").config();
const express = require("express");
const { pool } = require("./src/config/dbConfig"); // Configuración de la base de datos
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Middleware
app.use(express.json());

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar rutas
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const classRoutes = require("./src/routes/classRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const styleRoutes = require("./src/routes/styleRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");

// Usar rutas
app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/clases", classRoutes);
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
