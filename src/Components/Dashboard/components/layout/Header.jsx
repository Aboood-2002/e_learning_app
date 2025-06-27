import Button from '../common/Button';
import './main.css'
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { getUsersCount } from "../../../redux/apiCalls/profileApiCall";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/login');
  };
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="heading">Dashboard</h1>
        <div className="user-menu">
          <span className="text-secondary">{user.userName}</span>
          <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;