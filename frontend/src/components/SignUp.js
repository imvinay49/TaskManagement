import React, { useState } from 'react'
import axios from 'axios';

const SignUp = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            console.log('here')
            const response = await axios.post('http://localhost:4000/api/v1/signup',{ email,name, password});
            console.log(response);
            setSuccess(true);
        }catch(err){
            setError(err.response?.data?.message || 'Signup failed');
        }
    }

  return (
    <div>
        <form onSubmit={handleSignup}>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email'/>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password'/>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name'/>
            <button type='submit'>SignUp</button>
            {success && <p>Account Created Successfully</p>}
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default SignUp