// import React, { useState } from 'react';
// import axios from 'axios';
// import moment from 'moment'; // Make sure to import moment

// const CreateTask = ({onTaskCreated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       const token = localStorage.getItem('token'); // Get token from local storage

//       // Format the deadline to the required format
//       const formattedDeadline = moment(deadline).format('YYYY-MM-DD hh:mm:ss A'); // Use 'hh' for 12-hour format

//       const response = await axios.post('http://localhost:4000/api/v1/createTask', {
//         title,
//         description,
//         deadline: formattedDeadline, // Use the formatted deadline
//       },{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });

//       const newTask = response.data.task;
//       setSuccess('Task created successfully!');
//       setError(''); // Clear previous errors
//       // Optionally, reset the form fields
//       onTaskCreated(newTask);
//       setTitle('');
//       setDescription('');
//       setDeadline('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create task');
//       setSuccess(''); // Clear previous success messages
//     }
//   };

//   return (
//     <div>
//       <h2>Create Task</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Task Title"
//           required
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Task Description"
//           required
//         />
//         <input
//           type="datetime-local"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//           required
//         />
//         <button type="submit">Create Task</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//     </div>
//   );
// };

// export default CreateTask;


import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Track success as a boolean

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const token = localStorage.getItem('token'); // Get token from local storage

      // Format the deadline to the required format
      const formattedDeadline = moment(deadline).format('YYYY-MM-DD hh:mm:ss A'); // Use 'hh' for 12-hour format

      const response = await axios.post('http://localhost:4000/api/v1/createTask', {
        title,
        description,
        deadline: formattedDeadline, // Use the formatted deadline
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const newTask = response.data.task;
      setSuccess(true); // Set success to true
      setError(''); // Clear previous errors
      // Optionally, reset the form fields
      onTaskCreated(newTask);
      setSuccess(true)
      setTitle(''); // Reset title field
      setDescription(''); // Reset description field
      setDeadline(''); // Reset deadline field
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
      setSuccess(false); // Set success to false if the task creation fails
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Task created successfully!</p>}
    </div>
  );
};

export default CreateTask;
