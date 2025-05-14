const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersRepository.getAllUsers();
        baseResponse(res, true, 200, 'Users fetched successfully', users);
    } catch (error) {
        console.error('Error fetching users:', error);
        baseResponse(res, false, 500, 'Error fetching users', null);
    }
};


exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return baseResponse(res, false, 400, 'Name, email and password are required', null);
    }

    try {
        const newUser = await usersRepository.createUser({ name, email, password });
        baseResponse(res, true, 201, 'User created successfully', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        baseResponse(res, false, 500, 'Error creating user', null);
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    try {
        const user = await usersRepository.getUserById(id);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        baseResponse(res, true, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error fetching user:', error);
        baseResponse(res, false, 500, 'Error fetching user', null);
    }
};


exports.findUserByEmailpassword = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return baseResponse(res, false, 400, 'Email and password are required', null);
    }

    try {
        const user = await usersRepository.findUserByEmailpassword(email, password);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        baseResponse(res, true, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error fetching user:', error);
        baseResponse(res, false, 500, 'Error fetching user', null);
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    try {
        const updatedUser = await usersRepository.updateUser(id, { name, email, password });
        if (!updatedUser) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        baseResponse(res, true, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        baseResponse(res, false, 500, 'Error updating user', null);
    }
};