const db = require('../database/pg.database');

exports.getAllBankSampahs = async () => {
    try {
        const result = await db.query('SELECT * FROM bank_sampahs');
        return result.rows;
    } catch (error) {
        console.error('Error fetching bank sampahs:', error);
        throw error;
    }
};

exports.getBankSampahById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM bank_sampahs WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching bank sampah by ID:', error);
        throw error;
    }
};

exports.createBankSampah = async (bankSampah) => {
    try {
        const { name, location, latitude, longitude } = bankSampah;
        const result = await db.query(
            'INSERT INTO bank_sampahs (name, location, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, location, latitude, longitude]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating bank sampah:', error);
        throw error;
    }
};

exports.updateBankSampah = async (id, bankSampah) => {
    try {
        const { name, location, latitude, longitude } = bankSampah;
        const result = await db.query(
            'UPDATE bank_sampahs SET name = $1, location = $2, latitude = $3, longitude = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, location, latitude, longitude, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating bank sampah:', error);
        throw error;
    }
};

exports.deleteBankSampah = async (id) => {
    try {
        const result = await db.query('DELETE FROM bank_sampahs WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting bank sampah:', error);
        throw error;
    }
};