import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";

import { IBook } from "../../models/IBook";
import PostService from "../../services/PostService";
import { IPostState } from "./Interfaces/IPostState";
import axios from "axios";
import { API_URL } from "../../api/axiosApi";

const book: IBook = {
  _id: "",
  name: "",
  author: "",
  picture: "",
  price: "",
  stars: 0,
  description: "",
  amount: 0,
  category: "",
};

const initialState: IPostState = {
  book,
  loading: false,
  error: null,
};

//Post Create
export const postCreate = createAsyncThunk<
  IBook,
  IBook,
  { rejectValue: string }
>(`post/postCreate`, async function (post: IBook, { rejectWithValue }) {
  const response = await PostService.create(post);

  if (!response) {
    return rejectWithValue("Server Error!");
  }

  const data = response.data.book;
  return data;
});
//Post Get by id
export const postGet = createAsyncThunk<IBook, string, { rejectValue: string }>(
  `posts/postGet`,
  async function (id, { rejectWithValue }) {
    const response = await axios.get(`${API_URL}/books/posts/id/${id}`, {
      withCredentials: true,
    });

    if (!response) {
      return rejectWithValue("error server!");
    }

    const data = await response.data;

    return data;
  }
);

//USERSLICE Redusers
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCreate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postCreate.fulfilled, (state, action) => {
      state.book = action.payload;
      state.loading = false;
    });
    builder.addCase(postGet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postGet.fulfilled, (state, action) => {
      state.book = action.payload;

      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default postSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
