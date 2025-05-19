const db = require('../database/pg.database');

exports.createRewardRedemption = async (redemptionData) => {
    try {
        const { user_id, reward_id, points_used } = redemptionData;
        const result = await db.query(
            'INSERT INTO reward_redemptions (user_id, reward_id, points_used) VALUES ($1, $2, $3) RETURNING *',
            [user_id, reward_id, points_used]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating reward redemption:', error);
        throw error;
    }
};

exports.getRewardRedemptionsByUserId = async (userId) => {
    try {
        const result = await db.query(`
            SELECT
                rr.id,
                rr.user_id,
                rr.reward_id,
                r.name as reward_name,
                r.point_cost,
                rr.points_used,
                rr.redemption_date
            FROM reward_redemptions rr
            JOIN rewards r ON rr.reward_id = r.id
            WHERE rr.user_id = $1
            ORDER BY rr.redemption_date DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error fetching reward redemptions by user ID:', error);
        throw error;
    }
};

exports.getAllRewardRedemptions = async () => {
     try {
        const result = await db.query(`
            SELECT
                rr.id,
                rr.user_id,
                u.username,
                rr.reward_id,
                r.name as reward_name,
                r.point_cost,
                rr.points_used,
                rr.redemption_date
            FROM reward_redemptions rr
            JOIN users u ON rr.user_id = u.id
            JOIN rewards r ON rr.reward_id = r.id
            ORDER BY rr.redemption_date DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error fetching all reward redemptions:', error);
        throw error;
    }
};