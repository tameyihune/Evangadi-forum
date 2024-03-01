import React from 'react'
import { useRef } from 'react'
import{useNavigate,Link}from'react-router-dom'
import axios from '../axiosConfig';
function Register() {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const firstnameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleSubmit(e){
    e.preventDefault();
    const usernameValue = userNameRef.current.value;
    const firstnameValue = firstnameRef.current.value;
    const lastnameValue = lastNameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    if (!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue) {
      alert('Please provide all required information');
      return;
    }
   try {
    await axios.post('/users/register', {
      username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
    });
    alert('Registered successfully');
    navigate('/login');
   } catch (error) {
    alert('Something went wrong during registration. Please try again later.');
    console.log(error.response)
   }
  }
  return (
    <section>
      <form  onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input  type="text" ref={userNameRef} placeholder="Username" />
        </div>
        <div>
          <label>First Name:</label>
          <input ref={firstnameRef}   type="text" placeholder="First Name" />
        </div>
        <div>
          <label>Last Name:</label>
          <input ref={lastNameRef}  type="text" placeholder="Last Name" />
        </div>
        <div>
          <label>Email:</label>
          <input ref={emailRef}  type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordRef}  type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </section>
  )
}

export default Register