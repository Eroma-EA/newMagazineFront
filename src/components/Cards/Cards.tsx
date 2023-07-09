import { IBook } from "../../models/IBook";
import { CardDiv } from "../UI/CardStyle";
import "../../styles/style/CardsBlock.css";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { baseDelete } from "../../store/userSlice/baseSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconDelete, IconStars } from "../Icons/Icons";
import { HandleBasket, HandleLike } from "../UI/HandleClick";

const Cards = (props: any) => {
  const id = useAppSelector<string>((state) => state.user.user.id);

  const dispatch = useAppDispatch();
  const rating: Number[] = [1, 2, 3, 4, 5];

  const [base, setBase] = useState<IBook[]>(props.posts);

  const handleDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    b: IBook
  ) => {
    dispatch(
      baseDelete({
        _id: id,
        delete: { id: b._id, base: props.del },
      })
    );

    const newBase = base.filter((book: IBook) => book._id !== b._id);
    setBase(newBase);
  };

  useEffect(() => {
    setBase(props.posts);
  }, [props.posts]);

  return (
    <>
      {base.map((b: IBook) => {
        return (
          <CardDiv key={b._id} className="card">
            <Link to={`/Card/?id=${b._id}`}>
              <div className="card_div-img">
                <img
                  className="cards_image"
                  src={`http://localhost:5000/api/books/images/${b.picture}`}
                  alt=""
                />
              </div>
            </Link>

            {props.del ? (
              <i
                className="del-icon"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
                  handleDelete(e, b)
                }
              >
                <IconDelete />
              </i>
            ) : (
              <div className="card_panel-like">
                <div className="cards_stars">
                  {rating.map((r, index) =>
                    Number(r) <= Number(b.stars) ? (
                      <i key={index} className="yellow">
                        <IconStars />
                      </i>
                    ) : (
                      <i key={index} className="white">
                        <IconStars />
                      </i>
                    )
                  )}
                </div>
                <div>
                  <HandleLike
                    user={props.user}
                    book={b}
                    idUser={id}
                    dispatch={dispatch}
                  />
                  <HandleBasket
                    user={props.user}
                    book={b}
                    idUser={id}
                    dispatch={dispatch}
                  />
                </div>
              </div>
            )}
            <p>{b.name}</p>
            <p>{b.author}</p>
            <p>{b.price}</p>
          </CardDiv>
        );
      })}
    </>
  );
};

export default Cards;
