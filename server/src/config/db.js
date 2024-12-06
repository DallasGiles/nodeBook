const mongoose = require('mongoose');
//loads the dotenv file refrenced in the root project.
require('dotenv').config();

const connectDB = async () => {
    try{
        //attempts to connect to DB using .env file pathway.
        const connectData = await mongoose.connect(process.env.MONGO_URI,{
            //ensures proper connection to DB.
            useNewUrlParser: true,

            //allows a new connection management engine.
            useUnifiedTopology: true,
        });
        console.log(`mongoDB Connected: ${connectData.connection.host}`);
    } catch(error){

        console.error(`Error: ${error.message}`);

        //if connection fails this will exit the application.
        process.exit(1);
    }
};

console.log('mongoURI:', process.env.MONGO_URI);

module.exports = {connectDB, };