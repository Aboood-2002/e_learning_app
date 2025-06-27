import {  createSlice  }  from "@reduxjs/toolkit" ;

const chatSlice = createSlice({
  name: 'chat',

  initialState: {
    input: '',
    recentPrompt: '',
    prevPrompt: [],
    showResult: false,
    loading: false,
    resultData: '',
    conversations: [],
    chats: [],
    selected: null,
    error: null,
  },
  
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setRecentPrompt: (state, action) => {
      state.recentPrompt = action.payload;
    },
    setPrevPrompt: (state, action) => {
      state.prevPrompt = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
      state.loading = false;
    },
    addChat: (state, action) => {
      state.chats = [action.payload, ...state.chats];
      state.loading = false;
    },
    removeChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
      state.loading = false;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
      state.loading = false;
    },
    addConversation: (state, action) => {
      state.conversations = [...state.conversations, action.payload];
      state.loading = false;
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    setShowResult: (state, action) => {
      state.showResult = action.payload;
    },
  },
});


const chatReducer = chatSlice.reducer
const chatActions = chatSlice.actions

export {chatReducer,chatActions}