import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetCode, verifyResetCode, resetPassword } from '../../redux/apiCalls/passwordApiCall';
import '../LogIn/Login.css'; // Reuse login page style
import password1 from '../../../Assets/password1.png';
import password2 from '../../../Assets/password2.png';
import password3 from '../../../Assets/password3.png';
import {CheckCircle} from 'lucide-react'; 

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.password);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetCode(email));
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyResetCode(email, code));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    dispatch(resetPassword(email, password, confirmPassword));
  };

  

  return (
    <div className='Login-Container'>
      <img src={step === 'email' ? password1 : step === 'code' ? password2 : password3} alt="Password Illustration" className="Login-Image" />
      <div className="Login-Form">
        <h1>Reset Password</h1>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} className="Login-Fields">
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="Login-SignIn">Send Code</button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="Login-Fields">
            <p>Verification Code</p>
            <input
              type="text"
              placeholder="Enter the code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit" className="Login-SignIn">Verify</button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="Login-Fields">
            <p>New Password</p>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showPassword}
              </button>
            </div>

            <p>Confirm Password</p>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showConfirmPassword}
              </button>
            </div>

            <button type="submit" className="Login-SignIn">Reset Password</button>
          </form>
        )}

        {step === 'success' && (
          <div className="modal-content">
            <div className="modal-body">
              <div className="success-icon">
                <CheckCircle size={32} />
              </div>
              <h2>Password Reset</h2>
              <p>Your password has been updated successfully.</p>
            </div>
            <button
              className="modal-button"
              onClick={() => {
                // dispatch(resetSteps());
                setEmail('');
                setCode('');
                setPassword('');
                setConfirmPassword('');
                navigate('/login')
              }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
