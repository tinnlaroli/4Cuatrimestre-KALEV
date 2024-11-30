require("dotenv").config();
const express = require("express");
const pool = require("./src/config/dbConfig"); // Configuración de la base de datos
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
app.use("/estudiantes", studentRoutes);
app.use("/estilos-aprendizaje", styleRoutes);
app.use("/recomendaciones", recommendationRoutes);
app.use("/reportes", reportRoutes);
app.use("/feedback", feedbackRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    message: "Error interno del servidor.",
    error: err.message,
  });
});

// Iniciar la aplicación y probar la conexión a la base de datos
pool
  .connect()
  .then(() => {
    console.log("Conexión a la base de datos establecida.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en ${API_URL}`);
      console.log(`Documentación Swagger en ${API_URL}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
