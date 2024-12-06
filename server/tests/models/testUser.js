const mongoose = require('mongoose');
const User = require('../../src/models/User');
require('dotenv').config();


const testUserModel = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });

            console.log('connected to Database');

            const newUser = await User.create({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

            console.log('user created:', newUser);
            //closes connection after created user is logged or on fail.
            mongoose.connection.close();

    } catch (error) {
        console.error(error);
        mongoose.connection.close();
    }
};

testUserModel();