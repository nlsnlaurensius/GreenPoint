const depositCodeRepo = require('../repositories/depositCode.repository');
const baseResponse = require('../utils/baseResponse.util');
let activeDepositCode = null;
function generateRandomCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}
exports.generateDepositCode = (req, res) => {
    let code;
    do {
        code = generateRandomCode();
    } while (activeDepositCode && activeDepositCode.code === code && !activeDepositCode.used && activeDepositCode.expiredAt > Date.now());
    const expiredAt = Date.now() + 30 * 1000;
    activeDepositCode = { code, expiredAt, used: false };
    res.status(201).json({
        success: true,
        message: 'Deposit code generated',
        payload: { code, expired_at: new Date(expiredAt) }
    });
};
exports.getActiveDepositCode = (req, res) => {
    if (!activeDepositCode || activeDepositCode.used || activeDepositCode.expiredAt < Date.now()) {
        activeDepositCode = null;
        return res.status(404).json({
            success: false,
            message: 'No active code',
            payload: null
        });
    }
    res.json({
        success: true,
        message: 'Active deposit code',
        payload: { code: activeDepositCode.code, expired_at: new Date(activeDepositCode.expiredAt) }
    });
};
exports.validateDepositCode = (req, res) => {
    const { code } = req.body;
    if (!activeDepositCode || activeDepositCode.used || activeDepositCode.expiredAt < Date.now() || activeDepositCode.code !== code) {
        return res.status(400).json({
            success: false,
            message: 'Invalid or expired code',
            payload: null
        });
    }
    activeDepositCode.used = true;
    res.json({
        success: true,
        message: 'Code valid',
        payload: null
    });
};
