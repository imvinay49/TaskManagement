const express = require('express');
const router = express.Router();
const {createTask, getAllTask, deleteTask, completedTask, markTaskAsFailed} = require('../controllers/taskController');

// Apply authentication middleware to all task routes
const { auth } = require('../middlewares/authMiddleware.js');

router.post('/createTask',auth,createTask,(req,res)=>{
    res.send("Task created successfully");
});

router.get('/getAllTask', auth, getAllTask,(req,res)=>{
    res.send("All tasks retrieved successfully");
})

router.delete('/deleteTask/:id',auth, deleteTask,(req,res)=>{
    res.send("Task deleted successfully");
})

router.put('/completedTask/:id',auth,completedTask,(req,res)=>{
    res.send("Task completed successfully");
})

router.put('/markTaskAsFailed/:id',auth,markTaskAsFailed,(req,res)=>{
    res.send("Task marked as failed successfully");
})


module.exports = router;