const db = require('../database/pg.database');

exports.getAllRewards = async () => {
    try {
        const result = await db.query('SELECT * FROM rewards');
        return result.rows;
    } catch (error) {
        console.error('Error fetching rewards:', error);
        throw error;
    }
}

exports.getRewardById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM rewards WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching reward by ID:', error);
        throw error;
    }
}

exports.createReward = async (reward) => {
    try {
        const { name, description, points } = reward;
        const result = await db.query(
            'INSERT INTO rewards (name, description, points) VALUES ($1, $2, $3) RETURNING *',
            [name, description, points]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating reward:', error);
        throw error;
    }
}

exports.updateReward = async (id, reward) => {
    try {
        const { name, description, points } = reward;
        const result = await db.query(
            'UPDATE rewards SET name = $1, description = $2, points = $3 WHERE id = $4 RETURNING *',
            [name, description, points, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating reward:', error);
        throw error;
    }
}

exports.deleteReward = async (id) => {
    try {
        const result = await db.query('DELETE FROM rewards WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting reward:', error);
        throw error;
    }
}