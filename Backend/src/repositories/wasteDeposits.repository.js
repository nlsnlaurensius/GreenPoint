const db = require('../database/pg.database');

exports.getAllWasteDeposits = async () => {
    try {
        const result = await db.query(`
            SELECT
                wd.id,
                wd.user_id,
                u.username,
                wd.bank_sampah_id,
                bs.name as bank_sampah_name,
                wd.waste_type_id,
                wt.name as waste_type_name,
                wd.weight_kg,
                wd.points_earned,
                wd.deposit_date
            FROM waste_deposits wd
            JOIN users u ON wd.user_id = u.id
            JOIN bank_sampahs bs ON wd.bank_sampah_id = bs.id
            JOIN waste_types wt ON wd.waste_type_id = wt.id
            ORDER BY wd.deposit_date DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error fetching waste deposits:', error);
        throw error;
    }
};

exports.getWasteDepositById = async (id) => {
    try {
         const result = await db.query(`
            SELECT
                wd.id,
                wd.user_id,
                u.username,
                wd.bank_sampah_id,
                bs.name as bank_sampah_name,
                wd.waste_type_id,
                wt.name as waste_type_name,
                wd.weight_kg,
                wd.points_earned,
                wd.deposit_date
            FROM waste_deposits wd
            JOIN users u ON wd.user_id = u.id
            JOIN bank_sampahs bs ON wd.bank_sampah_id = bs.id
            JOIN waste_types wt ON wd.waste_type_id = wt.id
            WHERE wd.id = $1
        `, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching waste deposit by ID:', error);
        throw error;
    }
};

exports.createWasteDeposit = async (wasteDepositData) => {
    try {
        const { user_id, bank_sampah_id, waste_type_id, weight_kg, points_earned } = wasteDepositData;
        const result = await db.query(
            'INSERT INTO waste_deposits (user_id, bank_sampah_id, waste_type_id, weight_kg, points_earned) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, bank_sampah_id, waste_type_id, weight_kg, points_earned]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating waste deposit:', error);
        throw error;
    }
};

exports.getWasteDepositsByUserId = async (userId) => {
    try {
        const result = await db.query(`
            SELECT
                wd.id,
                wd.user_id,
                wd.bank_sampah_id,
                bs.name as bank_sampah_name,
                wd.waste_type_id,
                wt.name as waste_type_name,
                wd.weight_kg,
                wd.points_earned,
                wd.deposit_date
            FROM waste_deposits wd
            JOIN bank_sampahs bs ON wd.bank_sampah_id = bs.id
            JOIN waste_types wt ON wd.waste_type_id = wt.id
            WHERE wd.user_id = $1
            ORDER BY wd.deposit_date DESC
        `, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching waste deposits by user ID:', error);
        throw error;
    }
};

exports.deleteWasteDeposit = async (id) => {
    try {
        const result = await db.query('DELETE FROM waste_deposits WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting waste deposit:', error);
        throw error;
    }
};