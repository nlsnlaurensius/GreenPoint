const db = require('../database/pg.database');

exports.getAllUsers = async () => {
    try {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

exports.getUserById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

exports.findUserByEmailpassword = async (email, password) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by email and password:', error);
        throw error;
    }
}

exports.findUserByEmail = async (email) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

exports.createUser = async (user) => {
    try {
        const { name, email, password } = user;
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

exports.updateUser = async (id, user) => {
    try {
        const { name, email, password } = user;
        const result = await db.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};