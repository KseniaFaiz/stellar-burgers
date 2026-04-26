import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  data: TOrdersData;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

export const fetchFeed = createAsyncThunk('feed/fetch', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        const feedPayload = action.payload;
        state.data = feedPayload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  }
});

export const feedReducer = feedSlice.reducer;
