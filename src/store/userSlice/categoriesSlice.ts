import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../api/axiosApi";

interface Categories {
  categories: string[];
  loading: boolean;
  error: null | String;
}

const initialState: Categories = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk<
  [],
  undefined,
  { rejectValue: string }
>(`posts/getCategories`, async function (_, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/books/posts/categories`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

//USERSLICE Redusers
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default categoriesSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
