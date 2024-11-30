const jwt = require('jsonwebtoken');

const validarToken = () => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'Acceso denegado. Token requerido.' });
        }

        // Verificar si el token tiene el prefijo "Bearer "
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        try {
            const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
            req.usuario = decoded;
            next();
        } catch (error) {
            console.error('Error al verificar el token:', error);
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }
    };
};

module.exports = validarToken;
