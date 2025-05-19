const wasteTypesRepository = require('../repositories/wasteTypes.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllWasteTypes = async (req, res) => {
    try {
        const wasteTypes = await wasteTypesRepository.getAllWasteTypes();
        baseResponse(res, true, 200, 'Waste Types fetched successfully', wasteTypes);
    } catch (error) {
        console.error('Error fetching waste types:', error);
        baseResponse(res, false, 500, 'Error fetching waste types', null);
    }
};

exports.getWasteTypeById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Waste Type ID is required', null);
    }

    try {
        const wasteType = await wasteTypesRepository.getWasteTypeById(id);
        if (!wasteType) {
            return baseResponse(res, false, 404, 'Waste Type not found', null);
        }
        baseResponse(res, true, 200, 'Waste Type fetched successfully', wasteType);
    } catch (error) {
        console.error('Error fetching waste type:', error);
        baseResponse(res, false, 500, 'Error fetching waste type', null);
    }
};