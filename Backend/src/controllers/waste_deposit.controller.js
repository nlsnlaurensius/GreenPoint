const waste_depositRepository = require('../repositories/waste_deposit.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllWasteDeposits = async (req, res) => {
    try {
        const wasteDeposits = await waste_depositRepository.getAllWasteDeposits();
        baseResponse(res, true, 200, 'Waste deposits fetched successfully', wasteDeposits);
    } catch (error) {
        console.error('Error fetching waste deposits:', error);
        baseResponse(res, false, 500, 'Error fetching waste deposits', null);
    }
}

exports.getWasteDepositById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, 'Waste deposit ID is required', null);
    }

    try {
        const wasteDeposit = await waste_depositRepository.getWasteDepositById(id);
        if (!wasteDeposit) {
            return baseResponse(res, false, 404, 'Waste deposit not found', null);
        }
        baseResponse(res, true, 200, 'Waste deposit fetched successfully', wasteDeposit);
    } catch (error) {
        console.error('Error fetching waste deposit:', error);
        baseResponse(res, false, 500, 'Error fetching waste deposit', null);
    }
};

exports.createWasteDeposit = async (req, res) => {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
        return baseResponse(res, false, 400, 'Name, description and location are required', null);
    }

    try {
        const newWasteDeposit = await waste_depositRepository.createWasteDeposit({ name, description, location });
        baseResponse(res, true, 201, 'Waste deposit created successfully', newWasteDeposit);
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

    try {
        const wasteDeposits = await waste_depositRepository.getWasteDeposiByUserId(userId);
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
        const deletedWasteDeposit = await waste_depositRepository.deleteWasteDeposit(id);
        if (!deletedWasteDeposit) {
            return baseResponse(res, false, 404, 'Waste deposit not found', null);
        }
        baseResponse(res, true, 200, 'Waste deposit deleted successfully', deletedWasteDeposit);
    } catch (error) {
        console.error('Error deleting waste deposit:', error);
        baseResponse(res, false, 500, 'Error deleting waste deposit', null);
    }
};
