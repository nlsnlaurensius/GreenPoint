const db = require('../database/pg.database');

exports.getAllWasteDeposits = async () => {
    try {
        const result = await db.query('SELECT * FROM waste_deposit');
        return result.rows;
    } catch (error) {
        console.error('Error fetching waste deposits:', error);
        throw error;
    }
}

exports.getWasteDepositById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM waste_deposit WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching waste deposit by ID:', error);
        throw error;
    }
}

exports.createWasteDeposit = async (wasteDeposit) => {
    try {
        const { name, description, location } = wasteDeposit;
        const result = await db.query(
            'INSERT INTO waste_deposit (name, description, location) VALUES ($1, $2, $3) RETURNING *',
            [name, description, location]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating waste deposit:', error);
        throw error;
    }
}

exports.getWasteDeposiByUserId = async (userId) => {
    try {
        const result = await db.query('SELECT * FROM waste_deposit WHERE user_id = $1', [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching waste deposit by user ID:', error);
        throw error;
    }
}

exports.deleteWasteDeposit = async (id) => {
    try {
        const result = await db.query('DELETE FROM waste_deposit WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting waste deposit:', error);
        throw error;
    }
}