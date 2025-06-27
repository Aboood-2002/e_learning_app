import { chatActions } from "../slices/chatSlice";
import request from "../../utils/request";
import {toast} from "react-toastify"

export function setInput(value) {
  return (dispatch) => {
    dispatch(chatActions.setInput(value));
  };
}

export function setSelected(chatId) {
  return (dispatch) => {
    dispatch(chatActions.setSelected(chatId));
  };
}


export function createNewChat() { 
  return async (dispatch, getState) => {
    try {
      dispatch(chatActions.setLoading());
      const { data } = await request.post(
        `/api/chats`,
        {},
        { 
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          } 
        }
      );
      
      dispatch(chatActions.addChat(data));
      dispatch(chatActions.setSelected(data._id));
      dispatch(chatActions.clearLoading()); // Clear loading state
      
      // Return the created chat data for navigation
      return { payload: data };
      
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      dispatch(chatActions.setError(message));
      dispatch(chatActions.clearLoading());
      
      // Return error for proper error handling
      throw error;
    }
  };
}
export function fetchChats() {
  return async (dispatch, getState) => {
    try {
      dispatch(chatActions.setLoading());
      const { data } = await request.get(`/api/chats`, {
        headers : {
        Authorization : "Bearer " + getState().auth.user.token,
      },
      });
      dispatch(chatActions.setChats(data));
      if (data.length > 0 && !getState().chat.selected) {
        dispatch(chatActions.setSelected(data[0]._id));
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Fetch chats failed';
      toast.error(message);
      dispatch(chatActions.setError(message));
      dispatch(chatActions.clearLoading());
    }
  };
}

export function fetchMessages(chatId) {
  return async (dispatch, getState) => {
    try {
      dispatch(chatActions.setLoading());
      const { data } = await request.get(`/api/chats/${chatId}`, {
        headers : {
        Authorization : "Bearer " + getState().auth.user.token,
      },
      });
      dispatch(chatActions.setConversations(data));
    } catch (error) {
      const message = error.response?.data?.message || 'Fetch messages failed';
      toast.error(message);
      dispatch(chatActions.setError(message));
      dispatch(chatActions.clearLoading());
    }
  };
}


export function sendMessage({ text, image, chatId }) {
  return async (dispatch, getState) => {
    try {
      dispatch(chatActions.setLoading());
      let targetChatId = chatId || getState().chat.selected;
      if (!targetChatId) {
        const { data } = await request.post(
          `/api/chats`,
          {},
        {
          headers: {
            Authorization : "Bearer " + getState().auth.user.token,
            'Content-Type': 'multipart/form-data',
          },
        }
        );
        targetChatId = data._id;
        dispatch(chatActions.addChat(data));
        dispatch(chatActions.setSelected(targetChatId));
      }

      const formData = new FormData();
      if (text) {
        formData.append('question', text);
      }
      if (image) {
        const blob = await fetch(image).then((res) => res.blob());
        formData.append('image', blob, 'image.jpg');
      }

      const { data } = await request.post(
        `/api/chats/${targetChatId}`,
        formData,
        {
          headers: {
            Authorization : "Bearer " + getState().auth.user.token,
            'Content-Type': 'multipart/form-data',
          },
        
        }
      );
      console.log('sendMessage success:', data);

      dispatch(chatActions.addConversation({
        prompt: text || '',
        response: data.conversation.answer,
        questionImage: data.conversation.questionImage?.url ? { url: data.conversation.questionImage.url } : null,
      }));
      dispatch(chatActions.setInput(''));
      dispatch(chatActions.clearLoading());
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Error sending message';
      console.error('sendMessage error:', message);
      toast.error(message);
      dispatch(chatActions.setError(message));
      dispatch(chatActions.clearLoading());
      return Promise.reject({ error: message });
    }
  };
}


export function deleteChat(chatId) {
  return async (dispatch, getState) => {
    try {
      dispatch(chatActions.setLoading());
      
      await request.delete(
        `/api/chats/${chatId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        }
      );
      
      // Remove the chat from Redux store
      dispatch(chatActions.removeChat(chatId));
      
      // Clear selected if it was the deleted chat
      const currentSelected = getState().chat.selected;
      if (currentSelected === chatId) {
        dispatch(chatActions.setSelected(null));
      }
      
      dispatch(chatActions.clearLoading());
      toast.success("Chat deleted successfully");
      
      return { success: true, deletedId: chatId };
      
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete chat';
      toast.error(message);
      dispatch(chatActions.setError(message));
      dispatch(chatActions.clearLoading());
      throw error;
    }
  };
}