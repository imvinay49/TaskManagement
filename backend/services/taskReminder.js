const cron = require('node-cron');
const Task = require('../models/task');
const sendReminder = require('../utils/sendReminder');
const moment = require('moment'); // For handling date comparisons

//This will learn every hour to check pending task and send mail to complete 0 * * * *
cron.schedule('0 * * * *', async () => { 
    try {
        // Find tasks that are not completed
        const pendingTasks = await Task.find({
            completed: false // Only fetch tasks that are not completed
        }).populate('user'); // Assuming task has a 'user' reference for the email

        // Check if there are any pending tasks
        if (pendingTasks.length > 0) {
            // Loop through each pending task and send reminder emails
            for (const task of pendingTasks) {
                const user = task.user;
                const taskTitle = task.title;

                // Send reminder email to the user
                await sendReminder(user.email, `Reminder: You have a pending task "${taskTitle}"`, task.deadline);
                console.log(`Reminder email sent to ${user.email} for pending task "${taskTitle}"`);
            }
        } else {
            console.log('No pending tasks found.');
        }
    } catch (error) {
        console.error('Error sending reminders:', error.message);
    }
});

//This is will send mail when the task is failed to complete with the deadline
cron.schedule('* * * * *', async () => {
    try {
        const currentTime = new Date();

        // Find tasks that are overdue and not completed
        const overdueTasks = await Task.find({
            deadline: { $lt: currentTime },
            completed: false,
            failed: false
        }).populate('user');

        // Loop through each overdue task and mark it as failed
        for (const task of overdueTasks) {
            const user = task.user;

            // Mark the task as failed
            task.failed = true;
            await task.save();

            // Send email notification to the user
            await sendReminder(user.email, `Task "${task.title}" has failed`, task.deadline);
            console.log(`Task "${task.title}" has been marked as failed and email sent to ${user.email}`);
        }
    } catch (error) {
        console.error('Error processing overdue tasks:', error.message);
    }
});