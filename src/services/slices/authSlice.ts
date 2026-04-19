import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
  updateUserError: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  updateUserError: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: TRegisterData) => {
    const apiResult = await registerUserApi(payload);
    saveTokens(apiResult.accessToken, apiResult.refreshToken);
    return apiResult.user;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: TLoginData) => {
    const apiResult = await loginUserApi(payload);
    saveTokens(apiResult.accessToken, apiResult.refreshToken);
    return apiResult.user;
  }
);

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const apiResult = await getUserApi();
  return apiResult.user;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: Partial<TRegisterData>) => {
    const apiResult = await updateUserApi(payload);
    return apiResult.user;
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  clearTokens();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: { payload: boolean }) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError = action.error.message || 'Ошибка обновления';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked } = authSlice.actions;
export const authReducer = authSlice.reducer;
