const jwtUtil = require('../utils/jwt.util');
const baseResponse = require('../utils/baseResponse.util');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return baseResponse(res, false, 401, 'Authentication token required', null);
    }

    const decoded = jwtUtil.verifyToken(token);

    if (!decoded) {
        return baseResponse(res, false, 403, 'Invalid or expired token', null);
    }

    req.user = decoded;
    next();
};

module.exports = authenticateToken;