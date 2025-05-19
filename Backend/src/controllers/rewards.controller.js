const rewardsRepository = require('../repositories/rewards.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await rewardsRepository.getAllRewards();
        baseResponse(res, true, 200, 'Rewards fetched successfully', rewards);
    } catch (error) {
        console.error('Error fetching rewards:', error);
        baseResponse(res, false, 500, 'Error fetching rewards', null);
    }
};

exports.getRewardById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Reward ID is required', null);
    }

    try {
        const reward = await rewardsRepository.getRewardById(id);
        if (!reward) {
            return baseResponse(res, false, 404, 'Reward not found', null);
        }
        baseResponse(res, true, 200, 'Reward fetched successfully', reward);
    } catch (error) {
        console.error('Error fetching reward:', error);
        baseResponse(res, false, 500, 'Error fetching reward', null);
    }
};

exports.createReward = async (req, res) => {
    const { name, description, point_cost, stock } = req.body;
    if (!name || point_cost === undefined) {
        return baseResponse(res, false, 400, 'Name and point_cost are required', null);
    }
    if (isNaN(point_cost) || point_cost < 0) {
         return baseResponse(res, false, 400, 'Valid point_cost (>= 0) is required', null);
    }
     if (stock !== undefined && (isNaN(stock) || stock < 0)) {
         return baseResponse(res, false, 400, 'Valid stock (>= 0) is required', null);
    }

    try {
        const newReward = await rewardsRepository.createReward({ name, description, point_cost, stock });
        baseResponse(res, true, 201, 'Reward created successfully', newReward);
    } catch (error) {
        console.error('Error creating reward:', error);
        baseResponse(res, false, 500, 'Error creating reward', null);
    }
};

exports.updateReward = async (req, res) => {
    const { id } = req.params;
    const { name, description, point_cost, stock } = req.body;
    if (!id) {
        return baseResponse(res, false, 400, 'Reward ID is required', null);
    }

    if (!name && !description && point_cost === undefined && stock === undefined) {
         return baseResponse(res, false, 400, 'At least one field (name, description, point_cost, stock) is required for update', null);
    }

    if (point_cost !== undefined && (isNaN(point_cost) || point_cost < 0)) {
         return baseResponse(res, false, 400, 'Valid point_cost (>= 0) is required', null);
    }
     if (stock !== undefined && (isNaN(stock) || stock < 0)) {
         return baseResponse(res, false, 400, 'Valid stock (>= 0) is required', null);
    }

    try {
        const updatedReward = await rewardsRepository.updateReward(id, { name, description, point_cost, stock });
        if (!updatedReward) {
            return baseResponse(res, false, 404, 'Reward not found', null);
        }
        baseResponse(res, true, 200, 'Reward updated successfully', updatedReward);
    } catch (error) {
        console.error('Error updating reward:', error);
        baseResponse(res, false, 500, 'Error updating reward', null);
    }
};

exports.deleteReward = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Reward ID is required', null);
    }

    try {
        const deletedReward = await rewardsRepository.deleteReward(id);
        if (!deletedReward) {
            return baseResponse(res, false, 404, 'Reward not found', null);
        }
        baseResponse(res, true, 200, 'Reward deleted successfully', deletedReward);
    } catch (error) {
        console.error('Error deleting reward:', error);
        baseResponse(res, false, 500, 'Error deleting reward', null);
    }
};