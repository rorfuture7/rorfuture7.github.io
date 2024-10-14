// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../../config";
const initialState = {
  token: '',
  loading: false,
  user: null,
  message: '',
};
// Login Thunk
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Logout Thunk
export const logout = createAsyncThunk('auth/logout', async () => {
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors != null) {
          state.message = action.payload.errors;
        } else {
          state.message = "successfull login";
          state.user = action.payload.data;
          state.token = action.payload.data.authentication_token
          localStorage.setItem('login_user', JSON.stringify(action.payload.data));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.errors;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.token = '';
        state.message = "Signed out successfully.";
        localStorage.removeItem('login_user');
      });
  },
});

export default authSlice.reducer;
