const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersRepository.getAllUsers();
        baseResponse(res, true, 200, 'Users fetched successfully', users);
    } catch (error) {
        console.error('Error fetching users:', error);
        baseResponse(res, false, 500, 'Error fetching users', null);
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
        return baseResponse(res, false, 403, 'Access denied', null);
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

exports.findUserByEmail = async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return baseResponse(res, false, 400, 'Email is required', null);
    }

    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        const user = await usersRepository.findUserByEmail(email);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        delete user.password;
        baseResponse(res, true, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        baseResponse(res, false, 500, 'Error fetching user by email', null);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role, total_points } = req.body;
    if (!id) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
        return baseResponse(res, false, 403, 'Access denied', null);
    }

    if (req.user.role !== 'admin') {
        if (role !== undefined) {
            return baseResponse(res, false, 403, 'Access denied: Cannot change role', null);
        }
         if (total_points !== undefined) {
            return baseResponse(res, false, 403, 'Access denied: Cannot change total_points', null);
        }
    }

    let hashedPassword = undefined;
    if (password) {
        hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    try {
        const updatedUser = await usersRepository.updateUser(id, {
            username,
            email,
            password: hashedPassword,
            role,
            total_points
        });

        if (!updatedUser) {
            const existingUser = await usersRepository.getUserById(id);
            if (!existingUser) {
                 return baseResponse(res, false, 404, 'User not found', null);
            }
             return baseResponse(res, false, 400, 'No valid fields provided for update', null);
        }
        baseResponse(res, true, 200, 'User updated successfully', updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        baseResponse(res, false, 500, 'Error updating user', null);
    }
};

exports.deleteUser = async (req, res) => {
     const { id } = req.params;
     if (!id) {
        return baseResponse(res, false, 400, 'User ID is required', null);
    }

    try {
        const deletedUser = await usersRepository.deleteUser(id);
        if (!deletedUser) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        baseResponse(res, true, 200, 'User deleted successfully', deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        baseResponse(res, false, 500, 'Error deleting user', null);
    }
};