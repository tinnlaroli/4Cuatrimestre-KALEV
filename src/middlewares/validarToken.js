const jwt = require('jsonwebtoken');
const validarToken = () => {
    return (req, res, next) => {
        console.log('Authorization Header:', req.headers['authorization']);
        const token = req.headers['authorization'];
        if (!token) {
            console.error('Token no proporcionado');
            return res.status(403).json({ message: 'Acceso denegado. Token requerido.' });
        }

        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        try {
            const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
            console.log('Token Decodificado:', decoded);
            req.usuario = decoded;
            next();
        } catch (error) {
            console.error('Error al verificar el token:', error.message);
            return res.status(401).json({ message: 'Token no válido o expirado.' });
        }
    };
};
module.exports = validarToken;
