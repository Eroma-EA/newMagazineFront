import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import postSlice from "./userSlice/postSlice";
import postsSlice from "./userSlice/postsSlice";
import baseSlice from "./userSlice/baseSlice";
import reviewSlice from "./userSlice/reviewSlice";
import categoriesSlice from "./userSlice/categoriesSlice";
import recomendsSlice from "./userSlice/recomendsSlice";
import searchSlice from "./userSlice/searchSlice";
import sendSlice from "./userSlice/sendSlice";

const combineReducer = combineReducers({
  user: userSlice,
  post: postSlice,
  posts: postsSlice,
  userbase: baseSlice,
  reviews: reviewSlice,
  categories: categoriesSlice,
  recomends: recomendsSlice,
  search: searchSlice,
  sendEmail: sendSlice,
});

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
