import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db.js';
import fs from 'fs';
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jsonFilePath = './state.json';

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty@12321",
    database: "users"
});

console.log("Connected to the Database");

app.get('/api/status', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

// API to toggle appliance
app.post('/api/toggle', (req, res) => {
  const { appliance } = req.body;

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    const states = JSON.parse(data);

    if (!(appliance in states)) {
      return res.status(400).send('Invalid appliance');
    }

    // Toggle logic
    states[appliance] = states[appliance] === "0" ? "1" : "0";

    fs.writeFile(jsonFilePath, JSON.stringify(states, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.json({ success: true, newState: states[appliance] });
    });
  });
});


app.get("/api/users",async (req, res)=>{
    const [users] = await db.query(`SELECT * FROM users_data`);
    res.json(users);
});

app.get("/userdata",async (req, res)=>{
    const [users] = await db.query(`SELECT username FROM users_data`);
    res.json(users);
});

// In index.js or routes file
app.post('/remove', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const sql = 'DELETE FROM users_data WHERE username = ? AND password = ?';
    const [result] = await pool.execute(sql, [username, password]);

    if (result.affectedRows > 0) {
      res.json({ message: 'User removed successfully' });
    } else {
      res.json({ message: 'User not found or password incorrect' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// index.js — Add this route below /adduser
// index.js me add karo ye route

app.post('/adduser', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const sql = 'INSERT INTO users_data (username, password) VALUES (?, ?)';
    const [result] = await pool.execute(sql, [username, password]);
    res.status(201).json({ message: 'User added successfully', userId: result.insertId });
  } catch (error) {
    console.error('Add user error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});





app.listen(3000,()=> console.log("Server is running on http//localhost:3000"));