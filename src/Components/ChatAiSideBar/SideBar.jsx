import { useState, useEffect } from 'react';
import './sidebar.css';
import { assets } from '../../Assets/chatAiAssets';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewChat, fetchChats, deleteChat } from '../redux/apiCalls/chatApiCall';
import { logoutUser } from '../redux/apiCalls/authApiCall';

const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const { chats, selected } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newChatHandler = async () => {
    try {
      const resultAction = await dispatch(createNewChat());
      // Check if the action was fulfilled and get the new chat data
      if (resultAction.payload && resultAction.payload._id) {
        navigate(`/chat/${resultAction.payload._id}`);
      } else {
        // Fallback: wait a bit for state to update, then navigate to selected chat
        setTimeout(() => {
          if (selected) {
            navigate(`/chat/${selected}`);
          }
        }, 100);
      }
    } catch (err) {
      console.error('Error creating new chat:', err);
    }
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // Refetch chats when selected chat changes (for real-time updates)
  useEffect(() => {
    if (selected) {
      dispatch(fetchChats());
    }
  }, [selected, dispatch]);

  // Don't auto-navigate to latest chat on page load
  // Let user decide which chat to view

  const deleteChatHandler = async (id) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      try {
        await dispatch(deleteChat(id));
        
        // Check if the currently viewed chat is the one being deleted
        const currentChatId = window.location.pathname.split('/chat/')[1];
        if (currentChatId === id) {
          // Navigate to the most recent remaining chat or landing page
          const remainingChats = chats.filter(chat => chat._id !== id);
          if (remainingChats.length > 0) {
            // Navigate to the most recent remaining chat
            navigate(`/chat/${remainingChats[0]._id}`);
          } else {
            // No chats left, navigate to landing page
            navigate('/landing');
          }
        }
      } catch (error) {
        console.error('Error deleting chat:', error);
      }
    }
  };

  const logoutHandler = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/login');
    });
  };

  const clickEvent = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="sideBar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={newChatHandler} className="new_chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="title_recent">Recent</p>
            {chats && chats.length > 0 ? (
              chats.map((e) => (
                <div
                  key={e._id}
                  className="renet_entry"
                  onClick={() => clickEvent(e._id)}
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{e.latestMessage.slice(0, 18)}...</p>
                  <img
                    src={assets.delete_icon}
                    alt=""
                    onClick={(event) => {
                      event.stopPropagation(); // Prevent clickEvent from firing
                      deleteChatHandler(e._id);
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No chats yet</p>
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom_item renet_entry" onClick={() => navigate('/landing')}>
          <img src={assets.home_icon} alt="" />
          {extended ? <p>Home</p> : null}
        </div>
        <div className="bottom_item renet_entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom_item renet_entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
        <div className="bottom_item renet_entry" onClick={logoutHandler}>
          <img src={assets.logout_icon} alt="" />
          {extended ? <p>LogOut</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;