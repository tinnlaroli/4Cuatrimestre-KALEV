    const express = require("express");
    const router = express.Router();
    const usuariosController = require("../controllers/usuariosController");
    const validarToken = require("../middlewares/validarToken");
    const multer = require("multer");
    
    /**
     * @swagger
     * tags:
     *   - name: Prueba
     *     description: Rutas de prueba para verificar la funcionalidad de la API.
     */

    /**
     * @swagger
     * /prueba:
     *   get:
     *     summary: Ruta de prueba básica
     *     description: Verifica que la API está funcionando y alcanzable. No requiere token de autenticación.
     *     tags: [Prueba]
     *     responses:
     *       200:
     *         description: Respuesta de prueba exitosa.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Prueba exitosa después del middleware global"
     */

    /**
     * @swagger
     * tags:
     *   - name: Usuarios
     *     description: Rutas relacionadas con la gestión de usuarios.
     */

    /**
     * @swagger
     * /usuarios:
     *   post:
     *     summary: Crear un nuevo usuario
     *     description: Crea un nuevo usuario en la base de datos. Ruta pública.
     *     tags: [Usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/NuevoUsuario'
     *     responses:
     *       201:
     *         description: Usuario creado con éxito.
     *       400:
     *         description: Datos inválidos o incompletos.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios:
     *   get:
     *     summary: Obtener todos los usuarios
     *     description: Recupera todos los usuarios registrados. Requiere token de autenticación.
     *     tags: [Usuarios]
     *     security:
     *      - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de usuarios.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Usuario'
     *       401:
     *         description: Token de autenticación no válido o no proporcionado.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios/{id}:
     *   get:
     *     summary: Obtener un usuario por ID
     *     description: Recupera un usuario específico mediante su ID. Requiere token de autenticación.
     *     tags: [Usuarios]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Usuario encontrado.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       404:
     *         description: Usuario no encontrado.
     *       401:
     *         description: Token de autenticación no válido o no proporcionado.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios/{id}:
     *   put:
     *     summary: Actualizar un usuario
     *     description: Actualiza los detalles de un usuario específico. Requiere token de autenticación.
     *     tags: [Usuarios]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Usuario'
     *     responses:
     *       200:
     *         description: Usuario actualizado con éxito.
     *       400:
     *         description: Datos inválidos o incompletos.
     *       404:
     *         description: Usuario no encontrado.
     *       401:
     *         description: Token de autenticación no válido o no proporcionado.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios/{id}:
     *   delete:
     *     summary: Eliminar un usuario
     *     description: Elimina un usuario específico. Requiere token de autenticación.
     *     tags: [Usuarios]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario.
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Usuario eliminado con éxito.
     *       404:
     *         description: Usuario no encontrado.
     *       401:
     *         description: Token de autenticación no válido o no proporcionado.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios/login:
     *   post:
     *     summary: Autenticar usuario y generar JWT
     *     description: Permite a un usuario autenticarse y recibir un token JWT. Ruta pública.
     *     tags: [Usuarios]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginUsuario'
     *     responses:
     *       200:
     *         description: Autenticación exitosa y token generado.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHBpcmF0aW9uIjoiMTY1Njg0OTI2MiIsInJvbGUiOiJ1c2VyaW8iLCJpYXQiOjE2NTY4NDk2MjJ9.1Hl5YoQJytHwXg4ybNpj2k1H3_zQ8hizR2Pp1uNfZTg"
     *       401:
     *         description: Credenciales incorrectas.
     *       500:
     *         description: Error interno del servidor.
     */

    /**
     * @swagger
     * /usuarios/cambiarContrasenia/{id}:
     *   put:
     *     summary: Cambiar contraseña de un usuario
     *     description: Permite a un usuario cambiar su contraseña. Requiere token de autenticación.
     *     tags: [Usuarios]
     *     security:
     *      - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID del usuario.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CambiarContrasenia'
     *     responses:
     *       200:
     *         description: Contraseña cambiada con éxito.
     *       400:
     *         description: Datos inválidos o incompletos.
     *       401:
     *         description: Token de autenticación no válido o no proporcionado.
     *       404:
     *         description: Usuario no encontrado.
     *       500:
     *         description: Error interno del servidor.
     */
/**
 * @swagger
 * /usuarios/{id_usuario}/foto:
 *   post:
 *     summary: Subir la foto de un usuario
 *     description: Permite subir una foto de perfil para un usuario. Requiere token de autenticación.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         description: ID del usuario al que se le sube la foto.
 *         schema:
 *           type: integer
 *       - name: foto
 *         in: formData
 *         required: true
 *         description: Foto del usuario.
 *         type: file
 *     responses:
 *       200:
 *         description: Foto subida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 url_foto:
 *                   type: string
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


    // Ruta de prueba básica (solo para verificar que funciona sin validarToken)
    router.get("/prueba", (req, res) => {
    console.log("Ruta alcanzada después del middleware global");
    res.json({ message: "Prueba exitosa después del middleware global" });
    });

    // Rutas para manejar los usuarios

    router.post("/", usuariosController.crearUsuario); // Crear un nuevo usuario (público)

    router.get("/", validarToken(), usuariosController.obtenerUsuarios); // Obtener todos los usuarios (protegido)

    router.get("/:id", validarToken(), usuariosController.obtenerUsuarioPorId); // Obtener un usuario por ID (protegido)

    router.put("/:id", validarToken(), usuariosController.actualizarUsuario); // Actualizar un usuario (protegido)

    router.delete("/:id", validarToken(), usuariosController.eliminarUsuario); // Eliminar un usuario (protegido)

    router.post("/login", usuariosController.loginUsuario); // Autenticar usuario y generar JWT (público)

    router.put(
    "/cambiarContrasenia/:id",
    validarToken(),
    usuariosController.cambiarContraseña
    ); // Cambiar contraseña (protegido)


    // Configuración de Multer para el almacenamiento de archivos
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta de destino para las fotos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    });

    const upload = multer({ storage: storage });
    // Ruta para subir la foto de un usuario
    router.post('/usuarios/:id_usuario/foto', upload.single('foto'), usuariosController.subirFoto);

    module.exports = router;
