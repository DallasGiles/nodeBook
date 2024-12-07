const mongoose = require('mongoose');

//creating the schema based on chosen parameters.
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true, //trim will remove extra spaces
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address', // regex to ensure that it is in fact an email address.
            ],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'], //two possible user roles.
            default: 'user',
        },
    },
    {
        timestamps: true, //automatically adds a 'createdAt' and 'updatedAt'
    },
);

//creates the model for the user from the schema.
const User = mongoose.model('User', userSchema);

module.exports = User;