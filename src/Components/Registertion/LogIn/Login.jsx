import './Login.css';
import sosa from '../../../Assets/littelsosa.png';
import { useNavigate , Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useState } from "react";
import {useDispatch}  from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({email, password}));
  };

  return (
    <div className='Login-Container'>
      <img src={sosa} alt="Login Illustration" />
      <form onSubmit={formSubmitHandler} className="Login-Form">
        <h1>Welcome Back!</h1>
        <div className="Login-Buttons">
          <button type="submit" className='Login-SignIn'>Log In</button>
          <button 
            type="button" 
            className='Login-Register' 
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
        <div className="Login-Fields">
          <p>Email Address</p>
          <input 
            type="email" 
            placeholder='Your Email' 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-input" 
          />
          <p>Password</p>
          <input 
            type="password" 
            placeholder='Your Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-input" 
          />
        </div>
        <div className="Login-RememberMe">
          <Link to="/forgetPassword">Forgot Password</Link>
        </div>
        <button type="submit" className='Login-SignIn'>Log In</button>
      </form>
    </div>
  );
}

export default Login;