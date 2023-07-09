import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";

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

//Recomends
export const getRecomends = createAsyncThunk<
  IBook[],
  undefined,
  { rejectValue: string }
>(`recomend/getRecomends`, async function (_, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/books/posts/recomends`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

//USERSLICE Redusers
const recomendsSlice = createSlice({
  name: "recomend",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecomends.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getRecomends.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default recomendsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}