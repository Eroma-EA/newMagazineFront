import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "./reduxHooks";

//Slices & Reducers
import { getAll, getGenre, getSearch } from "../store/userSlice/postsSlice";
import { getCategories } from "../store/userSlice/categoriesSlice";
// import { postGet } from "../store/userSlice/postSlice";
// import { reviewGet } from "../store/userSlice/reviewSlice";
import { baseGet } from "../store/userSlice/baseSlice";

//Interfaces
// import { IReviewState } from "../store/userSlice/Interfaces/IReviewState";

//Pages
// import Cards from "../components/Cards/Cards";
// import Category from "../components/Cards/Category";
// import Search from "../components/Cards/Search";
// import Card from "../components/Cards/Card";
import { getRecomends } from "../store/userSlice/recomendsSlice";
import { IBook } from "../models/IBook";
// import { checkAuth } from "../store/userSlice/userSlice";

//

//Home
export const usePosts = () => {
  const dispatch = useAppDispatch();
  // get post
  const posts = useAppSelector((state) => state.posts);
  const [newPosts, setNewPosts] = useState<any>(posts);

  //searchName
  const searchName = useAppSelector((state) => state.search.books);
  const [searching, setSearching] = useState<IBook[]>(searchName);

  const genre = Object.fromEntries(
    new URLSearchParams(window.location.search)
  ).genre;

  const search = Object.fromEntries(
    new URLSearchParams(window.location.search)
  ).search;

  //get Category & Posts on Refresh
  useEffect(() => {
    dispatch(getCategories());
    if (search) {
      dispatch(getSearch(search));
    } else if (genre === undefined || genre === "all") {
      dispatch(getAll());
    } else {
      let newGenre = genre.split("");
      newGenre[0] = newGenre[0].toLocaleUpperCase();
      dispatch(getGenre(newGenre.join("")));
    }
  }, []);

  //get Category & Posts on Change states
  useEffect(() => {
    setNewPosts(posts);
  }, [posts]);

  //get Category & Posts on Change states
  useEffect(() => {
    setSearching(searchName);
  }, [searchName]);

  //return data to HomePage
  const props = {
    posts: newPosts,
    searchName: { searchName: searching, setSearching: setSearching },
  };

  return props;
};

//UserBase
export const useUser = () => {
  const dispatch = useAppDispatch();
  const _id = useAppSelector((state) => state.user.user.id);

  const user = useAppSelector((state) => state.userbase.user);

  //Get userBase
  useEffect(() => {
    dispatch(baseGet({ _id }));
  }, []);
  useEffect(() => {
    dispatch(baseGet({ _id }));
  }, [_id]);

  return user;
};

//Recomends Panel
export const useRecomends = () => {
  const dispatch = useAppDispatch();
  const recomends = useAppSelector((state) => state.recomends.books);
  // Refresh
  useEffect(() => {
    dispatch(getRecomends());
  }, []);

  return recomends;
};

//useCategories
export const useCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const [genres, setGenres] = useState<string[]>(categories.categories);

  useEffect(() => {
    setGenres(categories.categories);
  }, [categories]);

  return genres as string[];
};
