import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../api/axiosApi";
import { IBook } from "../../models/IBook";

import { IPostsState } from "./Interfaces/IPosts";

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

const initialState: IPostsState = {
  books,
  loading: false,
  error: null,
};
//get All
export const getAll = createAsyncThunk<
  IBook[],
  undefined,
  { rejectValue: string }
>(`posts/getAll`, async function (_, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/books/posts`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

//Genre
export const getGenre = createAsyncThunk<
  IBook[],
  string,
  { rejectValue: string }
>(`posts/getGenre`, async function (genre, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/books/posts/genre/${genre}`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});
//Search
export const getSearch = createAsyncThunk<
  IBook[],
  string,
  { rejectValue: string }
>(`posts/getSearch`, async function (search, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/books/posts/search/${search}`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

//USERSLICE Redusers
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getall
    builder.addCase(getAll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    //getGenre
    builder.addCase(getGenre.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getGenre.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    //getSearch
    builder.addCase(getSearch.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default postsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
