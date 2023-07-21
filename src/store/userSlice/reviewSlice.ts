import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";

import axios from "axios";
import { API_URL } from "../../api/axiosApi";
import { IReview, IUserReview } from "../../models/IReview";
import { IReviewState } from "./Interfaces/IReviewState";

const review: IReview = {
  _id: "",
  users: [],
};

export type REVIEW = {
  _id: "";
  user: IUserReview;
};

const initialState: IReviewState = {
  review,
  loading: false,
  error: null,
};

export const reviewCreate = createAsyncThunk<
  IReview,
  REVIEW,
  { rejectValue: string }
>(`review/reviewCreate`, async function (post, { rejectWithValue }) {
  const response = await axios.put(`${API_URL}/review/create`, post);

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

export const reviewRating = createAsyncThunk<
  IReview,
  REVIEW,
  { rejectValue: string }
>(`review/reviewRating`, async function (post, { rejectWithValue }) {
  const response = await axios.put(`${API_URL}/review/rating`, post);

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;
  return data;
});

//Review Get
export const reviewGet = createAsyncThunk<
  IReview,
  string,
  { rejectValue: string }
>(`review/reviewGet`, async function (id, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}/review/${id}`, {
    withCredentials: true,
  });

  if (!response) {
    return rejectWithValue("error server!");
  }

  const data = await response.data;

  return data;
});

//ReviewSLICE Redusers
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create
    builder.addCase(reviewCreate.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reviewCreate.fulfilled, (state, action) => {
      state.review = action.payload;
      state.loading = false;
    });
    //Get Review
    builder.addCase(reviewGet.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reviewGet.fulfilled, (state, action) => {
      state.review = action.payload;
      state.loading = false;
    });
    builder.addCase(reviewRating.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reviewRating.fulfilled, (state, action) => {
      state.review = state.review;
      state.loading = false;
    });
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default reviewSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
