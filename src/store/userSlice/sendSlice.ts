import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../api/axiosApi";

const initialState = {
  send: "send",
  loading: false,
  error: null,
};
//Search
export const send = createAsyncThunk<string, string, { rejectValue: string }>(
  `send/send`,
  async function (email, { rejectWithValue }) {
    const response = await axios.post(`${API_URL}/user/send`, {email} );

    if (!response) {
      return rejectWithValue("error server!");
    }

    const data = await response.data;

    return data;
  }
);

//USERSLICE Redusers
const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(send.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(send.fulfilled, (state, action) => {
      state.send = "send";
      state.loading = false;
    });
  },
});

export default sendSlice.reducer;



