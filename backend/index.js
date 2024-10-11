const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const cors = require('cors');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(cookieParser());

//connect DB
connectDB();

//import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use("/api/v1/",authRoutes);
app.use("/api/v1/",taskRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

require('./services/taskReminder');