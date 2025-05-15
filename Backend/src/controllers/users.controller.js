const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Email validation regex
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

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return baseResponse(res, false, 400, 'Name, email and password are required', null);
    }

    // Validate email format
    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        // Check if email already exists
        const existingUser = await usersRepository.findUserByEmail(email);
        if (existingUser) {
            return baseResponse(res, false, 400, 'Email already registered', null);
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await usersRepository.createUser({ name, email, password: hashedPassword });
        
        // Don't send password in response
        delete newUser.password;
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

    // Validate email format
    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        const user = await usersRepository.findUserByEmail(email);
        
        if (!user) {
            return baseResponse(res, false, 401, 'Invalid email or password', null);
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return baseResponse(res, false, 401, 'Invalid email or password', null);
        }

        // Don't send password in response
        delete user.password;
        baseResponse(res, true, 200, 'Login successful', user);
    } catch (error) {
        console.error('Error during login:', error);
        baseResponse(res, false, 500, 'Error during login', null);
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

exports.findUserByEmail = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return baseResponse(res, false, 400, 'Email is required', null);
    }

    // Validate email format
    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        const user = await usersRepository.findUserByEmail(email);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
        // Don't send password in response
        delete user.password;
        baseResponse(res, true, 200, 'User fetched successfully', user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        baseResponse(res, false, 500, 'Error fetching user by email', null);
    }
};