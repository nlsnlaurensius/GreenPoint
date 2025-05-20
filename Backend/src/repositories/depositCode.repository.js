const db = require('../database/pg.database');

exports.createDepositCode = async (code, expiredAt) => {
    const result = await db.query(
        'INSERT INTO deposit_codes (code, created_at, expired_at, used) VALUES ($1, NOW(), $2, false) RETURNING *',
        [code, expiredAt]
    );
    return result.rows[0];
};

exports.getActiveDepositCode = async () => {
    const result = await db.query(
        'SELECT * FROM deposit_codes WHERE used = false AND expired_at > NOW() ORDER BY created_at DESC LIMIT 1'
    );
    return result.rows[0];
};

exports.useDepositCode = async (code) => {
    const result = await db.query(
        'UPDATE deposit_codes SET used = true WHERE code = $1 RETURNING *',
        [code]
    );
    return result.rows[0];
};

exports.validateDepositCode = async (code) => {
    const result = await db.query(
        'SELECT * FROM deposit_codes WHERE code = $1 AND used = false AND expired_at > NOW()',
        [code]
    );
    return result.rows[0];
};
