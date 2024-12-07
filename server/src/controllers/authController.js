const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

require('dotenv').config();

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h', // Token valid for an hour
        }
    );
};

// Sign-up
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        console.log('Incoming data:', { username, email });

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        console.log('Existing user found:', existingUser);

        if (existingUser) {
            return res.status(400).json({ error: 'Email or username is already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user', // Default role
        });

        await newUser.save();

        // Generate JWT
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            expiresIn: '1h',
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Look for user by email
        const user = await User.findOne({ email });

        // Validate credentials
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            expiresIn: '1h',
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signUp, login };
