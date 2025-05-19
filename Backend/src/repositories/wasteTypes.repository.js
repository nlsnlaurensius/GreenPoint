const db = require('../database/pg.database');

exports.getAllWasteTypes = async () => {
    try {
        const result = await db.query('SELECT * FROM waste_types');
        return result.rows;
    } catch (error) {
        console.error('Error fetching waste types:', error);
        throw error;
    }
};

exports.getWasteTypeById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM waste_types WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching waste type by ID:', error);
        throw error;
    }
};

exports.getWasteTypeByName = async (name) => {
    try {
        const result = await db.query('SELECT * FROM waste_types WHERE name = $1', [name]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching waste type by name:', error);
        throw error;
    }
};