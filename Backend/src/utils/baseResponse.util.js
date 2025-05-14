const baseResponse = (res, success, status, message, payload) => {
    return res.status(status).json({
        success,
        status,
        message,
        payload,
    });
}

module.exports = baseResponse;