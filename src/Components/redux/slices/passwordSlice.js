import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
    step: 'email',
  },
  reducers: {
    setError(state) {
      state.isError = true;
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    resetSteps(state) {
      state.isError = false;
      state.step = 'email';
    }
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordActions, passwordReducer };
