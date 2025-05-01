
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://nipun-freelance.onrender.com/api/auth';

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'Authentication failed';
  }
  return error.message || 'Network error';
};

// Save token to localStorage
const saveAuthData = (token, user) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
};

// Clear auth data from localStorage
const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      saveAuthData(response.data.token, response.data.user);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      saveAuthData(response.data.token, response.data.user);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Check existing auth token
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return rejectWithValue('No token found');
      
      const response = await axios.get(`${API_BASE_URL}/check`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { user: response.data.user, token };
    } catch (error) {
      clearAuthData();
      return rejectWithValue(handleApiError(error));
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('userData')) || null,
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      clearAuthData();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      
      // Check auth cases
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;