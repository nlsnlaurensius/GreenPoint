require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
});

const connect = async () => {
    try {
        await pool.query('SELECT 1');
        console.log("Connected to PostgreSQL database");
    } catch (error) {
        console.error("Error connecting to PostgreSQL database", error);
    }
};

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

module.exports = {
    query,
    pool,
    connect
};