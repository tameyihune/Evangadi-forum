const jwt = require('jsonwebtoken');

async function Authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { username, userid } = jwt.verify(token, process.env.jwt_key);
        req.user = { username, userid };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = Authmiddleware;
