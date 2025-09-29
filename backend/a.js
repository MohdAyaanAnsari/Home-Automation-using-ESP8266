// index.js
const express = require('express');
const cors = require('cors');
const pool = require('../database/db');
const path = require('path');
// db.js
const mysql = require('mysql2/promise');

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty@12321",
    database: "users"
});

module.exports = pool;


const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files

// Route to register user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const [result] = await pool.execute(sql, [username, password]);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
