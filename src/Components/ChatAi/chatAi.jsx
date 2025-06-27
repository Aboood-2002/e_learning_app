import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import './chatAi.css';
import { assets } from '../../Assets/chatAiAssets';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SideBar from '../ChatAiSideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import MarkDown from 'react-markdown';
import { toast } from 'react-toastify';
import { setSelected, setInput, fetchMessages, sendMessage, fetchChats } from '../redux/apiCalls/chatApiCall';
import { getUserProfile } from '../redux/apiCalls/profileApiCall';

const ChatAi = () => {
  const { conversations, loading, input, selected } = useSelector((state) => state.chat);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const dispatch = useDispatch();

  // Only set selected if chatId exists and is different from current selected
  useEffect(() => {
    if (chatId && chatId !== 'undefined' && chatId !== selected) {
      dispatch(setSelected(chatId));
    } else if (!chatId || chatId === 'undefined') {
      // Clear selected when no valid chatId
      dispatch(setSelected(null));
    }
  }, [chatId, selected, dispatch]);

  // Only fetch messages if we have a valid chatId
  useEffect(() => {
    if (chatId && chatId !== 'undefined') {
      dispatch(fetchMessages(chatId));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserProfile(user._id));
    }
  }, [user?._id, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (input.trim() || image)) {
      sendMessageHandler();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const sendMessageHandler = async () => {
    if (input.trim() || image) {
      try {
        // If no chat is selected or chatId is undefined, create a new chat first
        if (!selected && (!chatId || chatId === 'undefined')) {
          const { createNewChat } = await import('../redux/apiCalls/chatApiCall');
          const resultAction = await dispatch(createNewChat());
          
          if (resultAction.payload && resultAction.payload._id) {
            // Navigate to the new chat and send the message
            const newChatId = resultAction.payload._id;
            navigate(`/chat/${newChatId}`);
            
            // Send the message to the new chat
            await dispatch(sendMessage({ text: input, image, chatId: newChatId }));
            dispatch(setInput(''));
            setImage(null);
            
            // Refresh chats list to update sidebar
            dispatch(fetchChats());
          }
        } else {
          // Use existing chat
          const validChatId = selected || chatId;
          if (validChatId && validChatId !== 'undefined') {
            await dispatch(sendMessage({ text: input, image, chatId: validChatId }));
            dispatch(setInput(''));
            setImage(null);
            
            // Refresh chats list to update sidebar with latest message
            dispatch(fetchChats());
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message. Please try again.');
      }
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };

  // Show different content based on whether a chat is selected
  const renderChatContent = () => {
    if (!chatId || chatId === 'undefined') {
      return (
        <div className="no-chat-selected">
          <div className="hello">
            <p><span>Hello, {profile?.userName ? profile?.userName : 'User'}</span></p>
            <p>How can I help you today? Start typing to begin a new conversation!</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="hello">
          <p><span>Hello, {profile?.userName ? profile?.userName : 'User'}</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="conversation-list">
          {loading ? (
            <div className="loader">
              <hr /><hr /><hr />
            </div>
          ) : conversations && conversations.length > 0 ? (
            conversations.map((conv, index) => (
              <div key={index} className="conversation">
                <div className="titleResult">
                  <img src={profile?.profilePhoto?.url} alt="" />
                  <p>{conv.question || conv.prompt}</p>
                </div>
                <div className="resultData">
                  <img src={assets.gemini_icon} alt="" />
                  <div className="juster">
                    <div className="response-text">
                      <MarkDown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <div className="code-block-container">
                                <div className="code-block-header">
                                  <span className="code-language">{match[1].toUpperCase()}</span>
                                  <button
                                    className="copy-button"
                                    onClick={() => copyToClipboard(String(children))}
                                  >
                                    Copy
                                  </button>
                                </div>
                                <SyntaxHighlighter language={match[1]} style={style}>
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              </div>
                            ) : (
                              <code className={className} {...props}>{children}</code>
                            );
                          },
                        }}
                      >
                        {conv.answer || conv.response || ''}
                      </MarkDown>
                    </div>
                    {conv.questionImage?.url && (
                      <img src={conv.questionImage.url} alt="Attachment" className="attachment-image" />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No conversations yet. Start a new chat!</p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="total">
      <SideBar />
      <div className="nav_chat">
        <p>Gemini</p>
        <img src={profile?.profilePhoto?.url} alt="" />
      </div>
      <div className="container">
        {renderChatContent()}
        <div className="main_bottom">
          <div className="search_box">
            <input
              onChange={(e) => dispatch(setInput(e.target.value))}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleKeyDown}
            />
            {image && <img src={image} alt="Selected" className="preview-image" />}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img
                src={assets.gallery_icon}
                alt="Attach"
                onClick={handlePictureClick}
                style={{ cursor: 'pointer' }}
              />
              <img src={assets.mic_icon} alt="" />
              {(input || image) && (
                <img onClick={sendMessageHandler} src={assets.send_icon} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatAi;