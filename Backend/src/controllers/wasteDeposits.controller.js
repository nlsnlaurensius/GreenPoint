const wasteDepositRepository = require('../repositories/wasteDeposits.repository');
const wasteTypesRepository = require('../repositories/wasteTypes.repository');
const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllWasteDeposits = async (req, res) => {
    try {
        const wasteDeposits = await wasteDepositRepository.getAllWasteDeposits();
        baseResponse(res, true, 200, 'Waste deposits fetched successfully', wasteDeposits);
    } catch (error) {
        console.error('Error fetching waste deposits:', error);
        baseResponse(res, false, 500, 'Error fetching waste deposits', null);
    }
};

exports.getWasteDepositById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Waste deposit ID is required', null);
    }

    try {
        const wasteDeposit = await wasteDepositRepository.getWasteDepositById(id);
        if (!wasteDeposit) {
            return baseResponse(res, false, 404, 'Waste deposit not found', null);
        }

        if (req.user.role !== 'admin' && req.user.id !== wasteDeposit.user_id) {
             return baseResponse(res, false, 403, 'Access denied', null);
        }

        baseResponse(res, true, 200, 'Waste deposit fetched successfully', wasteDeposit);
    } catch (error) {
        console.error('Error fetching waste deposit:', error);
        baseResponse(res, false, 500, 'Error fetching waste deposit', null);
    }
};

exports.createWasteDeposit = async (req, res) => {
    const { user_id, bank_sampah_id, waste_type_id, waste_type_name, weight_kg } = req.body;

    const depositUserId = (req.user.role === 'admin' && user_id !== undefined) ? user_id : req.user.id;

    if (!depositUserId || !bank_sampah_id || (!waste_type_id && !waste_type_name) || !weight_kg) {
        return baseResponse(res, false, 400, 'User ID (if admin), Bank Sampah ID, Waste Type (ID or Name), and Weight are required', null);
    }

    if (isNaN(weight_kg) || weight_kg <= 0) {
        return baseResponse(res, false, 400, 'Valid weight_kg is required', null);
    }

    try {
        let typeId = waste_type_id;
        if (!typeId && waste_type_name) {
            const wasteType = await wasteTypesRepository.getWasteTypeByName(waste_type_name);
            if (!wasteType) {
                return baseResponse(res, false, 400, 'Invalid waste type name provided', null);
            }
            typeId = wasteType.id;
        } else if (!typeId) {
            return baseResponse(res, false, 400, 'Waste Type (ID or Name) is required', null);
        }

        const pointsEarned = Number(weight_kg);

        const newWasteDeposit = await wasteDepositRepository.createWasteDeposit({
            user_id: depositUserId,
            bank_sampah_id,
            waste_type_id: typeId,
            weight_kg,
            points_earned: pointsEarned
        });

        const updatedUser = await usersRepository.updateUserTotalPoints(depositUserId, pointsEarned);

        if (!updatedUser) {
            console.error(`Failed to update points for user ${depositUserId}`);
        }

        baseResponse(res, true, 201, 'Waste deposit recorded successfully', { wasteDeposit: newWasteDeposit, updatedUser });
    } catch (error) {
        console.error('Error creating waste deposit:', error);
        baseResponse(res, false, 500, 'Error creating waste deposit', null);
    }
};

exports.getWasteDepositsByUserId = async (req, res) => {
    const { userId } = req.params;
     if (!userId) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    if (req.user.role !== 'admin' && req.user.id !== parseInt(userId)) {
         return baseResponse(res, false, 403, 'Access denied', null);
    }

    try {
        const wasteDeposits = await wasteDepositRepository.getWasteDepositsByUserId(userId);
        if (!wasteDeposits || wasteDeposits.length === 0) {
            return baseResponse(res, false, 404, 'No waste deposits found for this user', null);
        }
        baseResponse(res, true, 200, 'Waste deposits fetched successfully', wasteDeposits);
    } catch (error) {
        console.error('Error fetching waste deposits by user ID:', error);
        baseResponse(res, false, 500, 'Error fetching waste deposits by user ID', null);
    }
};

exports.deleteWasteDeposit = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Waste deposit ID is required', null);
    }

    try {
        const wasteDepositToDelete = await wasteDepositRepository.getWasteDepositById(id);
        if (!wasteDepositToDelete) {
            return baseResponse(res, false, 404, 'Waste deposit not found', null);
        }

        const deletedWasteDeposit = await wasteDepositRepository.deleteWasteDeposit(id);

        if (deletedWasteDeposit) {
            await usersRepository.updateUserTotalPoints(wasteDepositToDelete.user_id, -Number(wasteDepositToDelete.points_earned));
        } else {
            return baseResponse(res, false, 404, 'Waste deposit not found', null);
        }

        baseResponse(res, true, 200, 'Waste deposit deleted successfully', deletedWasteDeposit);
    } catch (error) {
        console.error('Error deleting waste deposit:', error);
        baseResponse(res, false, 500, 'Error deleting waste deposit', null);
    }
};