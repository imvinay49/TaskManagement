const Task = require('../models/task');
const moment = require('moment');

exports.createTask = async(req,res) => {
    try{
        const { title, description, deadline } = req.body;

        //Parse the deadline to a Javascript Date Object
        const parsedDeadline = moment(deadline,"YYYY-MM-DD HH:mm:ss A",true)

         // Check if the parsed date is valid
         if (!parsedDeadline.isValid()) {
            return res.status(400).json({ message: 'Invalid date format. Please use the format "YYYY-MM-DD HH:mm:ss AM/PM"' });
        }

        const task = await Task.create({
            title,
            description,
            deadline: parsedDeadline.toDate(),
            user: req.user.id //assuming that it is append by the middleware
        })

        res.status(200).json({
            message: 'Task created successfully',
            task
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getAllTask = async(req,res) => {
    const { id: userId } = req.user;
    try{
        const tasks = await Task.find({ user: userId }).populate('user', 'name email');
        
        if(tasks.length === 0){
            return res.status(404).json({
                message: 'No tasks found fot this user',
            })
        }

        res.status(200).json({
            tasks
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.deleteTask = async(req,res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user.id; //Get the authenticated user id from the JWT (set by the auth middleware)

        //Find the task by ID and ensure that the user is the owner
        const task = await Task.findOne({_id: taskId, user: userId})

        if(!task){
            return res.status(404).json({message: 'Task not found or you are not the'});
        }

        //Delete the task
        await Task.findByIdAndDelete(taskId);
        //return res

        return res.status(200).json({
            message: 'Task deleted successfully'
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//mark a task as complete
exports.completedTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const userId = req.user.id;

        //Find the task by ID and ensure the user is the owner
        const task = await Task.findOne({_id: taskId, user: userId});

        if(!task){
            return res.status(404).json({
                message: 'Task not found or you are not the owner'
            })
        }

        task.completed = !task.completed;
        await task.save();

        return res.status(200).json({
            message: `Task marked as ${task.completed ? 'complete' : 'incomplete'}`,
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//Route to manually mark a task as failed if its deadline has passed
exports.markTaskAsFailed = async(req,res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user.id;

        //Find the task and check the user is the owner
        const task = await Task.findOne({_id: taskId, user: userId});
        if(!task){
            return res.status(404).json({
                message: "Task not found or you are not authorized"
            })
        }

        //Check if the deadline has passed and it hasn't been completed
        if(task.deadline < new Date && !task.completed){
            task.failed = true;
            await task.save();

            return res.status(200).json({
                message: "Task marked as failed"
            })
        }
        return res.status(400).json({ message: 'Task is either already completed or the deadline has not passed' });
    }catch(error){

    }
}