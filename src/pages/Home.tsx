import Cards from "../components/Cards/Cards";
import Category from "../components/Cards/Category";
import Search from "../components/Cards/Search";
import { useEffect } from "react";

import {
  useCategory,
  usePosts,
  useRecomends,
  useUser,
} from "../hooks/useHooksSlice";
import Recomend from "../components/RecomendBlock/Recomend";

const Home = () => {
  //usePosts
  const props = usePosts();
  const posts = props.posts;
  const searchName = props.searchName;

  //useUser
  const user = useUser();
  //useCategory
  const categories = useCategory();
  //useRecomends Panel
  const recomends = useRecomends();

  return (
    <section className="Home">
      <div className="container">
        <div className="Home_inner">
          {posts.loading ? "" : <Recomend posts={recomends} />}
          <div className="home_category" style={{ display: "flex" }}>
            <Category posts={categories} />
            <div className="cards_search">
              <Search posts={searchName} />
              <div className="cards_inner">
                <div className="cards">
                  {posts.loading ? (
                    <h2 style={{ fontSize: "50px" }}>Загрузка ...</h2>
                  ) : (
                    <Cards posts={posts.books} user={user} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
