import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import request from '../utils/request';
import './Payment.css';

const PaymentSuccess = () => {
  const [message, setMessage] = useState('Verifying payment...');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
      if (!sessionId) {
        setMessage('Invalid session');
        return;
      }

      if (!user?.token) {
        setMessage('Please log in to verify payment');
        navigate('/login');
        return;
      }

      try {
        const response = await request.get(`/api/payments/verify?session_id=${sessionId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        setMessage(`✅ Success! Enrolled in "${response.data.course.title}"`);
        setTimeout(() => navigate(`/course/${response.data.course._id}/lessons`), 3000);
      } catch (err) {
        setMessage(err.response?.data?.message || '❌ Payment verification failed');
      }
    };

    verifyPayment();
  }, [location, navigate, user]);

  return (
    <div className="payment-container success">
      <div className="payment-box">
        <h1 className="payment-title success-title">{message}</h1>
        {message.includes('Success') && (
          <p className="payment-message">Redirecting to course...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
