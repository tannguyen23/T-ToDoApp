import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AuthUser, LoginUser, RegisterUser } from "../../types/Authentication";
import { AxiosError, AxiosResponse } from "axios";
import authApi from "../../apis/AuthApi";

interface AuthState {
  isLoading: boolean;
  userInfor: AuthUser | null;
  userToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  userInfor: null,
  userToken: null,
  error: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Create thunk

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (user: RegisterUser, { rejectWithValue }) => {
    const response = await authApi
      .register(user)
      .then((value: AxiosResponse) => {
        return value.data;
      })
      .catch((error: AxiosError) => {
        return rejectWithValue(error);
      });
    return response;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, { rejectWithValue }) => {
    const response = await authApi
      .login(user)
      .then((value: AxiosResponse<AuthUser>) => {
        return value.data;
      })
      .catch((error: AxiosError) => {
        return rejectWithValue(error);
      });
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerAsync.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.isLoading = false;
        }
      )
      .addCase(registerAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.isLoading = false;
          state.userInfor = action.payload;
        }
      )
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;
