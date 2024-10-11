const mongoose = require('mongoose');

const connectDB = async() => {
    try{    
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    }catch(error){
        console.log('Error connecting to MongoDB');
        process.exit(1);
    }
}

module.exports = connectDB;