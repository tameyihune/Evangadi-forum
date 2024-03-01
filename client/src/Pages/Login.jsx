import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig';
import{useNavigate,Link}from'react-router-dom'
function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleSubmit(e){
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    if (!emailValue || !passwordValue) {
      alert('Please provide all required information');
      return;
    }
   try {
   const {data}= await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue,
    });
    alert('Login successfully');
    navigate('/');
    localStorage.setItem('token',data.token)
    // console.log(data)
   } catch (error) {
    alert('Something went wrong during registration. Please try again later.');
    console.log(error.response)
   }
  }
  return (
    <section>
    <form  onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input ref={emailRef}  type="email" placeholder="Email" />
      </div>
      <div>
        <label>Password:</label>
        <input ref={passwordRef}  type="password" placeholder="Password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <Link to={'/register'}>Register</Link>
  </section>
  )
}

export default Login