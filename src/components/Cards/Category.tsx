import { useAppDispatch } from "../../hooks/reduxHooks";
import { getAll, getGenre } from "../../store/userSlice/postsSlice";
import "../../styles/style/Categories.css";
import { Link } from "react-router-dom";

const Category = ({ posts }: any) => {
  const dispatch = useAppDispatch();

  const genreClick = (genre: string) => {
    genre === "All" ? dispatch(getAll()) : dispatch(getGenre(genre));
  };

  return (
    <>
      <div className="cards_category">
        <ul>
          <h2 style={{ fontSize: "25px", marginBottom: "10px" }}>Categories</h2>
          {posts.map((genre: any) => (
            <li
              onClick={() => {
                genreClick(genre);
              }}
              key={Math.random()}
              className="cards_category-link"
            >
              <Link to={`?genre=${genre.toLocaleLowerCase()}`}>
                <span className="cards_category-hover"></span>
                <p className="cards_category-text">{genre}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
