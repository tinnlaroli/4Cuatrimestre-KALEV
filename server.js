require("dotenv").config();
const express = require("express");
const pool = require("./src/config/dbConfig"); // Importa la configuración de la base de datos
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Importar y usar rutas
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
app.use("/usuarios", userRoutes); // Para rutas de gestión de usuarios (CRUD)
app.use("/clases", classRoutes);
app.use("/estudiantes", studentRoutes);
app.use("/estilos-aprendizaje", styleRoutes);
app.use("/recomendaciones", recommendationRoutes);
//app.use("/reportes", reportRoutes);
//app.use("/feedback", feedbackRoutes);

// Iniciar la aplicación y probar la conexión a la base de datos
pool
  .connect()
  .then(() => {
    console.log("Conexión a la base de datos establecida.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });
