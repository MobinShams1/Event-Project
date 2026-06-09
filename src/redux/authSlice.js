import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem('isLoggedIn' ,'true');
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
    setUserFromStorage: (state) => {
      const storedUser = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      if(storedUser && isLoggedIn === 'true'){
        state.user = JSON.parse(storedUser);
        state.isLoggedIn = true;
      }
    }
  },
});


export const {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  setUserFromStorage
} = authSlice.actions;


export default authSlice.reducer;

