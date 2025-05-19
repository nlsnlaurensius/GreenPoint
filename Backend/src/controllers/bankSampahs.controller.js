const bankSampahsRepository = require('../repositories/bankSampahs.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllBankSampahs = async (req, res) => {
    try {
        const bankSampahs = await bankSampahsRepository.getAllBankSampahs();
        baseResponse(res, true, 200, 'Bank Sampahs fetched successfully', bankSampahs);
    } catch (error) {
        console.error('Error fetching bank sampahs:', error);
        baseResponse(res, false, 500, 'Error fetching bank sampahs', null);
    }
};

exports.getBankSampahById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Bank Sampah ID is required', null);
    }

    try {
        const bankSampah = await bankSampahsRepository.getBankSampahById(id);
        if (!bankSampah) {
            return baseResponse(res, false, 404, 'Bank Sampah not found', null);
        }
        baseResponse(res, true, 200, 'Bank Sampah fetched successfully', bankSampah);
    } catch (error) {
        console.error('Error fetching bank sampah:', error);
        baseResponse(res, false, 500, 'Error fetching bank sampah', null);
    }
};

exports.createBankSampah = async (req, res) => {
    const { name, location, latitude, longitude } = req.body;
    if (!name || !location) {
        return baseResponse(res, false, 400, 'Name and location are required', null);
    }

    try {
        const newBankSampah = await bankSampahsRepository.createBankSampah({ name, location, latitude, longitude });
        baseResponse(res, true, 201, 'Bank Sampah created successfully', newBankSampah);
    } catch (error) {
        console.error('Error creating bank sampah:', error);
        baseResponse(res, false, 500, 'Error creating bank sampah', null);
    }
};

exports.updateBankSampah = async (req, res) => {
    const { id } = req.params;
    const { name, location, latitude, longitude } = req.body;
    if (!id) {
        return baseResponse(res, false, 400, 'Bank Sampah ID is required', null);
    }

    if (!name && !location && latitude === undefined && longitude === undefined) {
         return baseResponse(res, false, 400, 'At least one field (name, location, latitude, longitude) is required for update', null);
    }

    try {
        const updatedBankSampah = await bankSampahsRepository.updateBankSampah(id, { name, location, latitude, longitude });
        if (!updatedBankSampah) {
            return baseResponse(res, false, 404, 'Bank Sampah not found', null);
        }
        baseResponse(res, true, 200, 'Bank Sampah updated successfully', updatedBankSampah);
    } catch (error) {
        console.error('Error updating bank sampah:', error);
        baseResponse(res, false, 500, 'Error updating bank sampah', null);
    }
};

exports.deleteBankSampah = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'Bank Sampah ID is required', null);
    }

    try {
        const deletedBankSampah = await bankSampahsRepository.deleteBankSampah(id);
        if (!deletedBankSampah) {
            return baseResponse(res, false, 404, 'Bank Sampah not found', null);
        }
        baseResponse(res, true, 200, 'Bank Sampah deleted successfully', deletedBankSampah);
    } catch (error) {
        console.error('Error deleting bank sampah:', error);
        baseResponse(res, false, 500, 'Error deleting bank sampah', null);
    }
};