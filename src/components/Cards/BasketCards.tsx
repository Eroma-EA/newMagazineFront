import { IBook } from "../../models/IBook";
import { CardDiv } from "../UI/CardStyle";
import "../../styles/style/CardsBlock.css";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { baseDelete } from "../../store/userSlice/baseSlice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconDelete, IconStars } from "../Icons/Icons";
import { HandleBasket, HandleLike } from "../UI/HandleClick";

interface Quantity {
  id: any;
  quantity: Number;
}

const BasketCards = (props: any) => {
  const id = useAppSelector<string>((state) => state.user.user.id);

  const dispatch = useAppDispatch();
  const rating: Number[] = [1, 2, 3, 4, 5];

  const [base, setBase] = useState<IBook[]>(props.posts);
  const [quantity, setQuantity] = useState<Quantity[]>([]);

  useEffect(() => {
    const newQuant = base.map((books: IBook) => {
      return { id: books._id, quantity: 1 };
    });
    setQuantity(newQuant);
  }, [base]);

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

  const handleAmountsum = (n: string, b: IBook) => {
    const newQ: Quantity[] = quantity.map((q: Quantity) => {
      if (q.id === b._id) {
        q.quantity = Number(q.quantity) + Number(n);
      }
      return q;
    });
    setQuantity(newQ);
  };

  return (
    <>
      {base.map((b: IBook) => {
        return (
          <CardDiv key={b._id} className="card">
            <Link to={`/Card/?id=${b._id}`}>
              <img
                className="cards_image"
                src={`http://localhost:5000/api/books/images/${b.picture}`}
                alt=""
              />
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
            <div>
              <p>{b.name}</p>
              <p>{b.author}</p>
              <p>{b.price}</p>
            </div>
            <div>
              <div>
                <button onClick={() => handleAmountsum("-1", b)}>-</button>
                <input
                  type="text"
                  value={`${
                    quantity.find((q: Quantity) => q.id === b._id && q)
                      ?.quantity
                  }шт`}
                  name=""
                  id=""
                  max={5}
                  min={1}
                  style={{ width: "80px", outline: "none", fontSize: "15px" }}
                />
                <button onClick={() => handleAmountsum("1", b)}>+</button>
              </div>

              <p>
                sum:{" "}
                {Number(b.price) *
                  Number(
                    quantity.find((q: Quantity) => q.id === b._id && q)
                      ?.quantity
                  )}
                тг
              </p>
            </div>
          </CardDiv>
        );
      })}
    </>
  );
};

export default BasketCards;
