const express = require('express');
var RouterSunSet = express.Router();
const jwt = require('jsonwebtoken'); // Add this line for token generation
const bcrypt = require('bcryptjs'); // Add this line for password encryption

const UserModal = require('../../db/users/users');

//create router
RouterSunSet.get('/', (req, res) => {
    res.send('Router Api');
});

// router and params
RouterSunSet.get('/:id', (req, res) => {
    res.send('Router Api' + req.params.id);
});

// create user
RouterSunSet.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        // Check if username or password is empty
        if ( ! username || ! password || ! email) {
            return res.status(400).json({ error: 'Field invalid' });
        }

        // Check if the username already exists
        const existingUser = await UserModal.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const newUser = new UserModal({ username, password, email });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
RouterSunSet.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username or password is empty
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if the user exists
        const user = await UserModal.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Password is wrong!' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// router nào được khai báo trước sẽ được ưu tiên xử lí trước.
// khai báo router có params thì phải khai báo sau router không có params
module.exports = RouterSunSet;