import { FC, useState, useEffect } from "react";
import { IBook } from "../../models/IBook";
import { IPostState } from "../../store/userSlice/Interfaces/IPostState";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  REVIEW,
  reviewCreate,
  reviewGet,
  reviewRating,
} from "../../store/userSlice/reviewSlice";
import { baseCreate, baseGet } from "../../store/userSlice/baseSlice";
import "../../styles/style/Card.css";
import { IconStars, IconStarsFunc } from "../Icons/Icons";
import { IUser } from "../../models/IUser";
import { IBase } from "../../models/IBase";
import { IReview } from "../../models/IReview";
import { HandleBasket, HandleLike } from "../UI/HandleClick";

const Card: FC<any> = (props) => {
  const id = useAppSelector<string>((state) => state.user.user.id);
  const base = useAppSelector<IBase>((state) => state.userbase.user);
  const dispatch = useAppDispatch();
  //Get Post
  const post: IPostState = props.post;
  const book: IBook = props.post.book;
  const user: IUser = props.user;

  const rating: Number[] = [1, 2, 3, 4, 5];
  const [star, setStar] = useState<number>();
  const [comment, setComment] = useState<string>("");

  const review: IReview = props.review.review;

  //Create Review

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const post = {
      _id: book._id,
      user: { _id: user.id, email: user.email, rating: star, comment: comment },
    } as REVIEW;
    const base: IBase = {
      _id: user.id,
      review: book,
      base: "review",
    };

    dispatch(baseCreate(base));
    dispatch(reviewRating(post));
    dispatch(reviewCreate(post));
    dispatch(reviewGet(props.id));
  };

  useEffect(() => {
    dispatch(baseGet({ _id: id }));
  }, [id]);

  return (
    <>
      {post.loading ? (
        <h1 style={{ fontSize: "50px" }}>загрузка...</h1>
      ) : (
        <>
          <div className="card_block">
            <img
              className="card_image"
              src={`http://localhost:5000/api/books/images/${book.picture}`}
              alt=""
            />
            <div className="card_panel">
              <h2>название книги: {book.name}</h2>
              <h3>жанр: {book.category}</h3>
              <h3>в наличии: {book.amount}шт</h3>
              <h3>
                рейтинг: {book.stars}{" "}
                {rating.map((r, index) =>
                  Number(r) <= Number(book.stars) ? (
                    <i key={index} className="yellow">
                      <IconStars />
                    </i>
                  ) : (
                    <i key={index} className="white">
                      <IconStars />
                    </i>
                  )
                )}
              </h3>
              <h3>цена: {book.price}</h3>

              <div>
                <HandleLike
                  user={base}
                  book={book}
                  idUser={id}
                  dispatch={dispatch}
                />
                <HandleBasket
                  user={base}
                  book={book}
                  idUser={id}
                  dispatch={dispatch}
                />
              </div>
              <form
                className="review-block"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h2>Оставить оценку</h2>
                <IconStarsFunc star={setStar} />
                {star && (
                  <>
                    <textarea
                      cols={30}
                      rows={5}
                      style={{ resize: "none" }}
                      value={comment}
                      onChange={(e) => setComment(e.currentTarget.value)}
                    ></textarea>

                    <input
                      type="button"
                      value="Отправить"
                      onClick={(
                        e: React.MouseEvent<HTMLInputElement, MouseEvent>
                      ) => {
                        handleClick(e);
                      }}
                    />
                  </>
                )}
              </form>
            </div>
          </div>
          <div className="card_description">
            <p>{book.description}</p>
          </div>
          <div className="card_comments">
            <h1>Отзывы</h1>
            <ul>
              {review.users.map((user) => (
                <li key={user._id}>
                  <h2>{user.email}</h2>
                  <h3>
                    {rating.map((r, index) =>
                      Number(r) <= Number(user.rating) ? (
                        <i key={index} className="yellow">
                          <IconStars />
                        </i>
                      ) : (
                        <i key={index} className="white">
                          <IconStars />
                        </i>
                      )
                    )}
                  </h3>
                  <p>{user.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
