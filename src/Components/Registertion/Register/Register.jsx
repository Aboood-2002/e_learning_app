import './Register.css';
import micky from '../../../Assets/mickyhiar.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch , useSelector } from "react-redux"
import { registerUser } from "../../redux/apiCalls/authApiCall"
import swal from "sweetalert"

const Register = () => {

  const dispatch = useDispatch()
  const { registerMessage } = useSelector(state => state.auth)
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (userName.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(registerUser({ userName, email, password }))
  };

  const navigate = useNavigate()


    if(registerMessage){
    swal({
      title : registerMessage,
      icon : "success"
    }).then(isOk => {
      if(isOk){
        navigate("/login")
      }
    })
  }
    
  return (
    <div className='Register-Container'>
      <img src={micky} alt="Registration Illustration" />
      <form onSubmit={formSubmitHandler}>
      <div className="Register-Form">
        <h1>Create an Account</h1>
        <div className="Register-Buttons">
          <button className='Register-Log' onClick={() => navigate('/login')}>Log In</button>
          <button className='Register-SignUp'>Register</button>
        </div>
        <div className="Register-Fields">
            <p>Email Address</p>
            <input
             type="email" 
             placeholder='Your Email'
             onChange={(e) => setEmail(e.target.value)}
             value={email} 
             />
            <p>Username</p>
            <input 
            type="text" 
            placeholder='Your Username'
            onChange={(e) => setUsername(e.target.value)}
            value={userName} 
            />
            <p>Password</p>
            <input 
            type="password" 
            placeholder='Your Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
             />
        </div>
        <button className='Register-SignUp' >Register</button>
      </div>
      </form>
    </div>
  );
}

export default Register;
