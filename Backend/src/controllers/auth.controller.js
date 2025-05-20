const usersRepository = require('../repositories/users.repository');
const baseResponse = require('../utils/baseResponse.util');
const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwt.util');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
};

// In-memory store for reset tokens (replace with DB in production)
const resetTokens = {};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return baseResponse(res, false, 400, 'Username, email, and password are required', null);
    }

    if (!validateEmail(email)) {
        return baseResponse(res, false, 400, 'Invalid email format', null);
    }

    if (!validatePassword(password)) {
        return baseResponse(res, false, 400, 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character', null);
    }

    try {
        const existingEmail = await usersRepository.findUserByEmail(email);
        if (existingEmail) {
            return baseResponse(res, false, 400, 'Email already registered', null);
        }
        const existingUsername = await usersRepository.findUserByUsername(username);
        if (existingUsername) {
            return baseResponse(res, false, 400, 'Username already registered', null);
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

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return baseResponse(res, false, 400, 'Email is required', null);
    }
    try {
        const user = await usersRepository.findUserByEmail(email);
        if (!user) {
            return baseResponse(res, true, 200, 'If the email is registered, a reset link has been sent.', null);
        }
        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        resetTokens[token] = { userId: user.id, expires: Date.now() + 1000 * 60 * 30 };
        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Password GreenPoint',
            html: `<p>Klik link berikut untuk reset password: <a href="${resetUrl}">${resetUrl}</a></p>`
        });
        baseResponse(res, true, 200, 'If the email is registered, a reset link has been sent.', null);
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        baseResponse(res, false, 500, 'Error sending reset email', null);
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
        return baseResponse(res, false, 400, 'Token and new password are required', null);
    }
    const data = resetTokens[token];
    if (!data || data.expires < Date.now()) {
        return baseResponse(res, false, 400, 'Invalid or expired token', null);
    }
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await usersRepository.updateUserPassword(data.userId, hashedPassword);
        delete resetTokens[token];
        baseResponse(res, true, 200, 'Password reset successful', null);
    } catch (error) {
        console.error('Error in resetPassword:', error);
        baseResponse(res, false, 500, 'Error resetting password', null);
    }
};