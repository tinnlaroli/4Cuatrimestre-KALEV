const jwt = require('jsonwebtoken');

const validarToken = () => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'Acceso denegado. Token requerido.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token no válido.' });
        }
    };
};

module.exports = validarToken;
