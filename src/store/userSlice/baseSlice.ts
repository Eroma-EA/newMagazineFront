import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../api/axiosApi";
import { IBase } from "../../models/IBase";
import { IBook } from "../../models/IBook";
import { IBaseState } from "./Interfaces/IBaseState";

const books: [IBook] = [
  {
    _id: "",
    name: "",
    author: "",
    picture: "",
    price: "",
    stars: 0,
    description: "",
    amount: 0,
    category: "",
  },
];

const user: IBase = {
  _id: "",
  liked: books,
  basket: [],
  payment: [],
};

const initialState: IBaseState = {
  user,
  loading: false,
  error: null,
};

export const baseCreate = createAsyncThunk<
  IBase,
  IBase,
  { rejectValue: string }
>(`books/baseCreate`, async function (post, { rejectWithValue }) {
  const response = await axios.put(`${API_URL}/userbase/${post.base}`, post);

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;
  return data;
});

type Delete = {
  data: IBase;
  id: string;
};

export const baseDelete = createAsyncThunk<
  Delete,
  IBase,
  { rejectValue: string }
>(`books/baseDelete`, async function (post, { rejectWithValue }) {
  const response = await axios.put(`${API_URL}/userbase/delete`, post);

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data[0];
  const id = await response.data[1];

  // console.log(data.basket);

  const newData = { data, id };

  return newData;
});

//Liked Get
export const baseGet = createAsyncThunk<IBase, IBase, { rejectValue: string }>(
  `books/baseGet`,
  async function (post, { rejectWithValue }) {
    const response = await axios.get(
      `${API_URL}/userbase/userbase/${post._id}`,
      {
        withCredentials: true,
      }
    );
    if (!response) {
      return rejectWithValue("error server!");
    }

    const data = await response.data;

    return data;
  }
);

//USERSLICE Redusers
const baseSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create
    builder.addCase(baseCreate.pending, (state) => {
      // state.loading = true;
      // state.error = null;
    });
    builder.addCase(baseCreate.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.loading = false;
    });
    //Get
    builder.addCase(baseGet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(baseGet.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    //Delete
    builder.addCase(baseDelete.pending, (state) => {
      // state.loading = true;
      // state.error = null;
    });
    builder.addCase(baseDelete.fulfilled, (state, action) => {});
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default baseSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
