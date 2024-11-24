const jwt = require('jsonwebtoken');

const validarToken = (rolesPermitidos = []) => (req, res, next) => {
    console.log('Middleware validarToken alcanzado'); // Este mensaje debe aparecer

    const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token del header
    console.log('Token recibido:', token); // Ver el token que se recibe

    if (!token) {
        console.log('Token no proporcionado');
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        console.log('Verificando token...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
        req.usuario = decoded; // Guardar los datos decodificados en la solicitud

        console.log('Token verificado y decodificado:', decoded);

        if (rolesPermitidos.length && !rolesPermitidos.includes(decoded.rol)) {
            console.log('Rol no autorizado');
            return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado.' });
        }

        console.log('Token verificado con éxito. Pasando al siguiente middleware.');
        next(); // Avanzar al siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        console.log('Stack Trace:', error.stack); // Ver el stack trace completo del error

        // Revisamos si el error es expiración
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión nuevamente.' });
        }

        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = validarToken;
