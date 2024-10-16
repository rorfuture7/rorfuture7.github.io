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
// Signup Thunk
export const signup = createAsyncThunk('auth/signup', async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/sign_up`, credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
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
  reducers: {
    clearState: (state) => {
      // state.user = null;
      // state.token = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors != null) {
          state.message = action.payload.errors;
        } else {
          state.message = "Registration successfully";
          state.user = action.payload.data;
          state.token = action.payload.data.authentication_token
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.errors && action.payload.errors !== null) {
          if (action.payload.errors.email && (action.payload.errors.email !== null)){
            state.message = "Email " + action.payload.errors.email.join(", ");
          } else if (action.payload.errors.password && (action.payload.errors.password !== null)){
            state.message = "Password " + action.payload.errors.password.join(", ");
          }
        }
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors != null) {
          state.message = action.payload.errors;
        } else {
          state.message = "successfull login";
          state.user = action.payload.data;
          state.token = action.payload.data.authentication_token
          // localStorage.setItem('login_user', JSON.stringify(action.payload.data));
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
        // localStorage.removeItem('login_user');
      });
  },
});
export const { clearState } = authSlice.actions;
export default authSlice.reducer;
