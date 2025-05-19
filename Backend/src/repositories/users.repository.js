const db = require('../database/pg.database');

exports.getAllUsers = async () => {
    try {
        const result = await db.query('SELECT id, username, email, role, total_points, created_at, updated_at FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

exports.getUserById = async (id) => {
    try {
        const result = await db.query('SELECT id, username, email, role, total_points, created_at, updated_at FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

exports.findUserByEmail = async (email) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

exports.createUser = async (user) => {
    try {
        const { username, email, password, role } = user;
        const result = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, total_points, created_at, updated_at',
            [username, email, password, role || 'user']
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

exports.updateUser = async (id, user) => {
    try {
        const { username, email, password, role, total_points } = user;
        const fields = [];
        const params = [];
        let paramIndex = 1;

        if (username !== undefined) {
            fields.push(`username = $${paramIndex++}`);
            params.push(username);
        }
        if (email !== undefined) {
            fields.push(`email = $${paramIndex++}`);
            params.push(email);
        }
        if (password !== undefined) {
            fields.push(`password = $${paramIndex++}`);
            params.push(password);
        }
         if (role !== undefined) {
            fields.push(`role = $${paramIndex++}`);
            params.push(role);
        }
         if (total_points !== undefined) {
            fields.push(`total_points = $${paramIndex++}`);
            params.push(total_points);
        }

        if (fields.length === 0) {
            return null;
        }

        params.push(id);
        const queryText = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex} RETURNING id, username, email, role, total_points, created_at, updated_at`;

        const result = await db.query(queryText, params);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

exports.updateUserTotalPoints = async (userId, pointsToAdd) => {
    try {
        const result = await db.query(
            'UPDATE users SET total_points = total_points + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, username, email, role, total_points',
            [pointsToAdd, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating user total points:', error);
        throw error;
    }
};

exports.decreaseUserTotalPoints = async (userId, pointsToDecrease) => {
     try {
        const result = await db.query(
            'UPDATE users SET total_points = total_points - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND total_points >= $1 RETURNING id, username, email, role, total_points',
            [pointsToDecrease, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error decreasing user total points:', error);
        throw error;
    }
};

exports.deleteUser = async (id) => {
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, username, email', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

exports.pool = db.pool;