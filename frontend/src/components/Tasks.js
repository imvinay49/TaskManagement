
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // State to hold the tasks
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(''); // State to handle errors
  const [successMessage, setSuccessMessage] = useState(''); // State to handle success message
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        // Get the JWT token from local storage
        const response = await axios.get('http://localhost:4000/api/v1/getAllTask', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const { tasks } = response.data;
        setTasks(tasks);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add the new task to the existing tasks
  };

  // Delete task function
  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage
      await axios.delete(`http://localhost:4000/api/v1/deleteTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted task from the UI by updating the state
      setTasks(tasks.filter(task => task._id !== taskId));
      setSuccessMessage('Task Deleted Successfully'); // Set the success message
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>; // Show loading message while tasks are being fetched
  }

  if (error) {
    <p>{error}</p>; // Show error message if there is an error
  }

  return (
    <div>
      <h1>All Tasks OnGoing</h1>

      {successMessage && <p>{successMessage}</p>} {/* Display success message if exists */}

      {tasks.length > 0 ? ( // Check if tasks array has items
        <ul>
          {tasks.map((task) => (
            <li key={task.id}> 
              - {task.title} - {task.description} 
              <button onClick={() => deleteTask(task._id)}>Delete</button> {/* Delete button */}
              {task.deadline}
            </li>
          ))}
        </ul>
      ) : (
          <p>No tasks available. Please create a task below:</p>
      )}

      {/* Always render CreateTask component */}
      <CreateTask onTaskCreated={handleTaskCreated}/>
    </div>
  );
};

export default Tasks;

