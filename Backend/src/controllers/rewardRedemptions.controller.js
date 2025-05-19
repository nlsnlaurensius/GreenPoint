const rewardRedemptionsRepository = require('../repositories/rewardRedemptions.repository');
const rewardsRepository = require('../repositories/rewards.repository');
const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getRewardRedemptionsByUserId = async (req, res) => {
    const { userId } = req.params;
     if (!userId) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    if (req.user.role !== 'admin' && req.user.id !== parseInt(userId)) {
         return baseResponse(res, false, 403, 'Access denied', null);
    }

    try {
        const redemptions = await rewardRedemptionsRepository.getRewardRedemptionsByUserId(userId);
        if (!redemptions || redemptions.length === 0) {
            return baseResponse(res, false, 404, 'No reward redemptions found for this user', null);
        }
        baseResponse(res, true, 200, 'Reward redemptions fetched successfully', redemptions);
    } catch (error) {
        console.error('Error fetching reward redemptions by user ID:', error);
        baseResponse(res, false, 500, 'Error fetching reward redemptions by user ID', null);
    }
};

exports.redeemReward = async (req, res) => {
    const userId = req.user.id;
    const { reward_id } = req.body;

    if (!reward_id) {
        return baseResponse(res, false, 400, 'Reward ID is required', null);
    }

    try {
        const reward = await rewardsRepository.getRewardById(reward_id);
        if (!reward) {
            return baseResponse(res, false, 404, 'Reward not found', null);
        }

        if (reward.stock <= 0) {
            return baseResponse(res, false, 400, 'Reward is out of stock', null);
        }

        const user = await usersRepository.getUserById(userId);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }

        if (user.total_points < reward.point_cost) {
            return baseResponse(res, false, 400, 'Insufficient points', null);
        }

        const client = await usersRepository.pool.connect();

        try {
            await client.query('BEGIN');

            const updatedUser = await client.query(
                'UPDATE users SET total_points = total_points - $1 WHERE id = $2 RETURNING id, username, email, total_points',
                [reward.point_cost, userId]
            );

            if (updatedUser.rows.length === 0) {
                 throw new Error('Failed to decrease user points or insufficient points during transaction');
            }

            const updatedReward = await client.query(
                'UPDATE rewards SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING *',
                [reward_id]
            );

             if (updatedReward.rows.length === 0) {
                 throw new Error('Failed to decrease reward stock or insufficient stock during transaction');
            }

            const newRedemption = await client.query(
                'INSERT INTO reward_redemptions (user_id, reward_id, points_used) VALUES ($1, $2, $3) RETURNING *',
                [userId, reward_id, reward.point_cost]
            );

            await client.query('COMMIT');

            baseResponse(res, true, 201, 'Reward redeemed successfully', {
                redemption: newRedemption.rows[0],
                updatedUser: updatedUser.rows[0],
                updatedReward: updatedReward.rows[0]
            });

        } catch (transactionError) {
            await client.query('ROLLBACK');
            console.error('Transaction error during reward redemption:', transactionError);
            if (transactionError.message.includes('insufficient points')) {
                 return baseResponse(res, false, 400, 'Insufficient points', null);
            }
             if (transactionError.message.includes('insufficient stock')) {
                 return baseResponse(res, false, 400, 'Reward is out of stock', null);
            }
            baseResponse(res, false, 500, 'Error redeeming reward', null);
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Error during reward redemption process:', error);
        baseResponse(res, false, 500, 'Error redeeming reward', null);
    }
};

exports.getAllRewardRedemptions = async (req, res) => {
    try {
        const result = await rewardRedemptionsRepository.getAllRewardRedemptions();
        baseResponse(res, true, 200, 'Reward redemptions fetched successfully', result);
    } catch (error) {
        console.error('Error fetching all reward redemptions:', error);
        baseResponse(res, false, 500, 'Error fetching all reward redemptions', null);
    }
};