
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'https://nipun-freelance.onrender.com/api/stores';

// Helper function for auth headers
const getAuthHeaders = (getState) => {
  const { auth } = getState();
  return {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
};

// Fetch all stores
export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(API_BASE_URL, getAuthHeaders(getState));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchMyStores = createAsyncThunk(
  'stores/fetchMyStores',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-stores`, getAuthHeaders(getState));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



// Add new store
export const addStore = createAsyncThunk(
  'stores/addStore',
  async (storeData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_BASE_URL,
        storeData,
        getAuthHeaders(getState)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update store
export const updateStore = createAsyncThunk(
  'stores/updateStore',
  async ({ id, updatedData }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${id}`,
        updatedData,
        getAuthHeaders(getState)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete store
export const deleteStore = createAsyncThunk(
  'stores/deleteStore',
  async (id, { getState, rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/${id}`,
        getAuthHeaders(getState)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Update store delivery status
export const updateStoreDelivery = createAsyncThunk(
  'stores/updateDelivery',
  async ({ storeId, deliveryAvailable }, { getState }) => {
    const { auth } = getState();
    await axios.patch(
      `${API_BASE_URL}/${storeId}/delivery`,
      { deliveryAvailable },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    return { storeId, deliveryAvailable };
  }
);

// Add to extraReducers


// Update store status
export const updateStoreStatus = createAsyncThunk(
  'stores/updateStatus',
  async ({ storeId, status }, { getState, rejectWithValue }) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/${storeId}/status`,
        { status },
        getAuthHeaders(getState)
      );
      return { storeId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    items: [],
    Myitems:[],
    loading: false,
    error: null,
    success: false,
    operation: null, // Tracks current operation: 'fetching', 'adding', 'updating', 'deleting'
  },
  reducers: {
    resetStoreState: (state) => {
      state.error = null;
      state.success = false;
      state.operation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Common pending state
            
      // Fetch stores fulfilled
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.operation = null;
      })
      .addCase(fetchMyStores.fulfilled, (state, action) => {
        state.Myitems=action.payload,
        state.loading = false;
        state.operation = null;
      })
      // Add store fulfilled
      .addCase(addStore.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.Myitems.push(action.payload)
        state.loading = false;
        state.success = true;
        state.operation = null;
      })
      .addCase(updateStoreDelivery.fulfilled, (state, action) => {
        const store = state.Myitems.find((item) => item._id === action.payload.storeId);
        if (store) {
          store.deliveryAvailable = action.payload.deliveryAvailable;
        }
        state.loading = false;
        state.success = true;
        state.operation = null;
      })
      
      // Update store fulfilled
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.Myitems.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.Myitems[index] = action.payload;
        }
        state.loading = false;
        state.success = true;
        state.operation = null;
      })
      
      // Delete store fulfilled
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.Myitems = state.Myitems.filter((item) => item._id !== action.payload);
        state.loading = false;
        state.success = true;
        state.operation = null;
      })
      
      // Update status fulfilled
      .addCase(updateStoreStatus.fulfilled, (state, action) => {
        const store = state.Myitems.find((item) => item._id === action.payload.storeId);
        if (store) {
          store.status = action.payload.status;
        }
        state.loading = false;
        state.success = true;
        state.operation = null;
      })
      .addMatcher(
        (action) => action.type.startsWith('stores/') && action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.success = false;
          state.operation = action.type.split('/')[1]; // Extract operation name
        }
      )
      
      // Common rejected state
      .addMatcher(
        (action) => action.type.startsWith('stores/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || 'An error occurred';
          state.operation = null;
        }
      )

  },
});

export const { resetStoreState } = storesSlice.actions;
export default storesSlice.reducer;