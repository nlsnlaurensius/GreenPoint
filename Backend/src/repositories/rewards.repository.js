const db = require('../database/pg.database');

exports.getAllRewards = async () => {
    try {
        const result = await db.query('SELECT * FROM rewards ORDER BY point_cost ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching rewards:', error);
        throw error;
    }
};

exports.getRewardById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM rewards WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching reward by ID:', error);
        throw error;
    }
};

exports.createReward = async (reward) => {
    try {
        const { name, description, point_cost, stock } = reward;
        const result = await db.query(
            'INSERT INTO rewards (name, description, point_cost, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, point_cost, stock || 0]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating reward:', error);
        throw error;
    }
};

exports.updateReward = async (id, reward) => {
    try {
        const { name, description, point_cost, stock } = reward;
        const result = await db.query(
            'UPDATE rewards SET name = $1, description = $2, point_cost = $3, stock = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, description, point_cost, stock, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating reward:', error);
        throw error;
    }
};

exports.deleteReward = async (id) => {
    try {
        const result = await db.query('DELETE FROM rewards WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting reward:', error);
        throw error;
    }
};

exports.decreaseRewardStock = async (rewardId, quantity = 1) => {
    try {
         const result = await db.query(
            'UPDATE rewards SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING *',
            [quantity, rewardId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error decreasing reward stock:', error);
        throw error;
    }
};