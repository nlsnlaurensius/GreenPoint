const baseResponse = require('../utils/baseResponse.util');

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        baseResponse(res, false, 403, 'Admin access required', null);
    }
};

module.exports = checkAdmin;