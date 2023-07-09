import Cards from "../components/Cards/Cards";
import Category from "../components/Cards/Category";
import Search from "../components/Cards/Search";
import { useHome, useRecomends, useUser } from "../hooks/useHooksSlice";
import Recomend from "../components/RecomendBlock/Recomend";

const Home = () => {
  const props = useHome();
  const user = useUser();
  const posts = props.posts;
  const categories = props.categories;
  const recomends = useRecomends()
  const searchName = props.searchName;

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
