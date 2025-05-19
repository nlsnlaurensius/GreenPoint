const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');
const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwt.util');

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return baseResponse(res, false, 400, 'Username, email, and password are required', null);
    }

    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        const existingUser = await usersRepository.findUserByEmail(email);
        if (existingUser) {
            return baseResponse(res, false, 400, 'Email already registered', null);
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await usersRepository.createUser({ username, email, password: hashedPassword });

        const token = jwtUtil.generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

        baseResponse(res, true, 201, 'User registered successfully', { user: newUser, token });
    } catch (error) {
        console.error('Error during registration:', error);
        baseResponse(res, false, 500, 'Error during registration', null);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return baseResponse(res, false, 400, 'Email and password are required', null);
    }

    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    try {
        const user = await usersRepository.findUserByEmail(email);

        if (!user) {
            return baseResponse(res, false, 401, 'Invalid email or password', null);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return baseResponse(res, false, 401, 'Invalid email or password', null);
        }

        const token = jwtUtil.generateToken({ id: user.id, email: user.email, role: user.role });

        delete user.password;
        baseResponse(res, true, 200, 'Login successful', { user, token });
    } catch (error) {
        console.error('Error during login:', error);
        baseResponse(res, false, 500, 'Error during login', null);
    }
};

exports.getProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await usersRepository.getUserById(userId);
        if (!user) {
            return baseResponse(res, false, 404, 'User not found', null);
        }
         baseResponse(res, true, 200, 'User profile fetched successfully', user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        baseResponse(res, false, 500, 'Error fetching user profile', null);
    }
};