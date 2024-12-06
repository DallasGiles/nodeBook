const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

require('dotenv').config();

//this creates a JWT token.
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id, username: user.username, role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h' //makes token valid for an hour.
        }
    );
};

//signup should POST on /api/auth/register
const signUp = async (req, res) => {
    const {
        username, email, password
    } 
    = req.body;

    try {

        console.log('Incoming data:', { username, email });

        const existingUser = await User.findOne(
            { 
                $or: [{ email }, { username }] 
        });

        console.log('Existing user found:', existingUser);
        
        if (existingUser){
            return res.status(400).json({error: 'email or username is alredy in use'});
        }

        //hashes pass
        const hashedPassword = await bcrypt.hash(password, 10);

        //creates new user using name email and hashedpass
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        //generates a new JWT
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'User registered Successfully',
            token,
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).josn({ error: 'internal server error' });
    }
};

// Authenticate user and get token
//should POST on /api/auth/login
const login = async (req, res) => {

    const {email, password } = req.body;

    try {
        //looks for user email
        const user = await User.findOne({ email });
        //if no user is found by email returns invalid email
        if (!user){
            return res.status(401).json({ error: 'invalid email'});
        }
        //checks for password match if wrong returns wrong
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({ error: 'Password is incorrect'});
        }

        const token = generateToken(user);

        res.json({
            message: 'login successful',
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error'});
    }
};

module.exports = { signUp, login };
