const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.sstatus(401).json({ error: 'Authorization token missing or Invalid'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id, username: decoded.username, role: decoded.role };

        next();
    } catch (error){
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;