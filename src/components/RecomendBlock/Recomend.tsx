import React, { useState } from "react";
import { IBook } from "../../models/IBook";
import { Link } from "react-router-dom";

const Recomend = (props: any) => {
  const books: IBook[] = props.posts;
  // const [newBooks, setNewBooks] = useState<any[]>();

  return (
    <>
      <div className="home_recomend-block">
        <div className="home_recomend-block-maqala"></div>
        <div className="home_recomend-block-images">
          {books.map((book) => (
            <div className="home_recomend-img" key={book._id}>
              <Link to={`/Card/?id=${book._id}`}>
                <img
                  src={`http://localhost:5000/api/books/images/${book.picture}`}
                  alt=""
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recomend;
