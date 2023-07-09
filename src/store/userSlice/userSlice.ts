import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { IState } from "./Interfaces/IState";
import axios from "axios";
import { AuthResponse } from "../../models/response/AuthResponse";
import { API_URL } from "../../api/axiosApi";

const user: IUser = {
  email: "",
  isActivated: false,
  id: "",
};

const initialState: IState = {
  user,
  loading: false,
  error: null,
};

type LOGIN = {
  email: string;
  password: string;
};

//LOGIN
export const login = createAsyncThunk<IUser, LOGIN, { rejectValue: string }>(
  `user/login`,
  async function ({ email, password }, { rejectWithValue }) {
    const response = await AuthService.login(email, password);

    if (!response) {
      return rejectWithValue("Server Error!");
    }

    localStorage.setItem("token", response.data.accessToken);
    const data = response.data.user;
    return data;
  }
);

export const registration = createAsyncThunk<
  IUser,
  LOGIN,
  { rejectValue: string }
>(
  `user/registration`,
  async function ({ email, password }, { rejectWithValue }) {
    const response = await AuthService.registration(email, password);

    if (!response) {
      return rejectWithValue("Server Error!");
    }
    localStorage.setItem("token", response.data.accessToken);
    const data = response.data.user;
    const _id = data.id;
    await axios.post<AuthResponse>(`${API_URL}/userbase/userbase`, { _id });

    return data;
  }
);

export const logout = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>(`user/logout`, async function () {
  const response = await AuthService.logout().catch((e) => e);

  localStorage.removeItem("token");
  const data = await response;
  return data;
});

export const checkAuth = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>(`user/checkAuth`, async function (_, { rejectWithValue }) {
  const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {
    withCredentials: true,
  });
  if (!response) {
    return rejectWithValue("error server!");
  }

  localStorage.setItem("token", response.data.accessToken);
  return response.data.user;
});

//USERSLICE Redusers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //Registration
    builder.addCase(registration.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //Checkout
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
