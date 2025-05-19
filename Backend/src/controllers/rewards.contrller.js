const rewardsReprository = require("../controllers/rewards.controller");
const baseResponse = require("../utils/baseResponse");

exports.getAllRewards = async (req, res) => {
    try {
        const rewards = await rewardsReprository.getAllRewards();
        baseResponse(res, true, 200, "Rewards fetched successfully", rewards);
    } catch (error) {
        console.error("Error fetching rewards:", error);
        baseResponse(res, false, 500, "Error fetching rewards", null);
    }
}

exports.getRewardById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, "Reward ID is required", null);
    }

    try {
        const reward = await rewardsReprository.getRewardById(id);
        if (!reward) {
            return baseResponse(res, false, 404, "Reward not found", null);
        }
        baseResponse(res, true, 200, "Reward fetched successfully", reward);
    } catch (error) {
        console.error("Error fetching reward:", error);
        baseResponse(res, false, 500, "Error fetching reward", null);
    }
}

exports.createReward = async (req, res) => {
    const { name, description, points } = req.body;

    if (!name || !description || !points) {
        return baseResponse(res, false, 400, "Name, description and points are required", null);
    }

    try {
        const newReward = await rewardsReprository.createReward({ name, description, points });
        baseResponse(res, true, 201, "Reward created successfully", newReward);
    } catch (error) {
        console.error("Error creating reward:", error);
        baseResponse(res, false, 500, "Error creating reward", null);
    }
}

exports.updateReward = async (req, res) => {
    const { id } = req.params;
    const { name, description, points } = req.body;

    if (!id) {
        return baseResponse(res, false, 400, "Reward ID is required", null);
    }

    if (!name || !description || !points) {
        return baseResponse(res, false, 400, "Name, description and points are required", null);
    }

    try {
        const updatedReward = await rewardsReprository.updateReward(id, { name, description, points });
        if (!updatedReward) {
            return baseResponse(res, false, 404, "Reward not found", null);
        }
        baseResponse(res, true, 200, "Reward updated successfully", updatedReward);
    } catch (error) {
        console.error("Error updating reward:", error);
        baseResponse(res, false, 500, "Error updating reward", null);
    }
}

exports.deleteReward = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, "Reward ID is required", null);
    }

    try {
        const deletedReward = await rewardsReprository.deleteReward(id);
        if (!deletedReward) {
            return baseResponse(res, false, 404, "Reward not found", null);
        }
        baseResponse(res, true, 200, "Reward deleted successfully", deletedReward);
    } catch (error) {
        console.error("Error deleting reward:", error);
        baseResponse(res, false, 500, "Error deleting reward", null);
    }
}
