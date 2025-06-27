import { useNavigate } from 'react-router-dom';
import './Payment.css';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container cancel">
      <div className="payment-box">
        <h1 className="payment-title cancel-title">Payment Cancelled</h1>
        <p className="payment-message">You have cancelled the payment. Would you like to try again?</p>
        <button className="payment-button cancel-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
