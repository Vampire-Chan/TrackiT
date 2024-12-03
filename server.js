const express = require('express');
const cors = require('cors');  // Importing the CORS module
const path = require('path');
const bcrypt = require('bcrypt');  // Ensure bcrypt is required
const mysql = require('mysql2');  // Ensure mysql2 is required
const app = express();
const port = 3000;

// Enable CORS to allow all origins (or specify your frontend domain if necessary)
app.use(cors());  // This will allow all origins to access the server

// Middleware to parse JSON request bodies
app.use(express.json());  // Ensures that we can read JSON data from the body of POST requests

// Serve static files from the root directory (if you have other static files like images, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Serve the index.html file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Sends the index.html when accessing the root
});

// Database connection (ensure that you have your MySQL connection set up)
const db = mysql.createConnection({
    host: "localhost",    // Use your MySQL host
    user: "root",         // Use your MySQL username
    password: "password", // Replace with your MySQL password
    database: "trackit_db",    // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Registration API endpoint
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "Email is already registered." });
                }
                return res.status(500).json({ error: "Database error." });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Login API endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Both email and password are required." });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error." });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const user = results[0];

        // Compare the password from the request with the hashed password from the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Send back a success message and the user info
        res.status(200).json({ message: "Login successful!", user: { id: user.id, username: user.username } });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
