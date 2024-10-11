
// import React, { useState } from 'react';
// import './App.css';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
// import ResetPassword from './components/ResetPassword';

// function App() {
//   const [isLogin, setIsLogin] = useState(true); // State to track if the user is logging in or signing up

//   // Function to toggle between login and signup
//   const toggleForm = () => {
//     setIsLogin(!isLogin); // Toggle the value of isLogin
//   };

//   return (
//     <div className='App'>
//       {isLogin ? (
//         <>
//           {/* <h2>Login</h2> */}
//           <Login />
//           <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
//           <ResetPassword/>
//         </>
//       ) : (
//         <>
//           <h2>Sign Up</h2>
//           <SignUp />
//           <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import EmailPass from './components/EmailPass'; // Import EmailPass component

function App() {
  const [isLogin, setIsLogin] = useState(true); // State to track if the user is logging in or signing up

  // Function to toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle the value of isLogin
  };

  return (
    <Router>
      <div className='App'>
        {/* Login or Sign-up Form */}
        {isLogin ? (
          <>
            <Login />
            <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
          </>
        ) : (
          <>
            <SignUp />
            <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
          </>
        )}

        {/* Reset Password Button */}
        <Link to="/reset-password">
          <button>Reset Password</button>
        </Link>

        {/* Routes for Reset Password and EmailPass */}
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<EmailPass />} /> {/* Route for resetting password */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

