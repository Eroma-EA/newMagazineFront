
import { IBase } from "../../models/IBase";
import { IBook } from "../../models/IBook";
import { baseCreate, baseDelete } from "../../store/userSlice/baseSlice";
import { IconBasket, IconHeart } from "../Icons/Icons";

//Liked Button
export const HandleLike = (props: any) => {
  const id: string = props.idUser;
  const book: IBook = props.book;
  const dispatch = props.dispatch;

  const handleClick: Function = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    book: IBook
  ) => {
    e.currentTarget.classList.toggle("liked");
    const likedBtn = e.currentTarget.classList;
    if (likedBtn.contains("liked")) {
      const post: IBase = {
        _id: id,
        liked: book,
        base: "liked",
      };
      dispatch(baseCreate(post));
    } else {
      dispatch(
        baseDelete({ _id: id, delete: { id: book._id, base: "liked" } })
      );
    }
  };

  return (
    <>
      {props.user.liked.find((l: IBook) => l._id === book._id) ? (
        <i
          className={`liked`}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            handleClick(e, book)
          }
        >
          <IconHeart />
        </i>
      ) : (
        <i
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            handleClick(e, book)
          }
        >
          <IconHeart />
        </i>
      )}
    </>
  );
};

//Basket Button
export const HandleBasket = (props: any) => {
  const id: string = props.idUser;
  const book: IBook = props.book;
  const dispatch = props.dispatch;

  const handleClick: Function = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    book: IBook
  ) => {
    e.currentTarget.classList.toggle("basket");
    const basketBtn = e.currentTarget.classList;
    if (basketBtn.contains("basket")) {
      const post: IBase = {
        _id: id,
        basket: book,
        base: "basket",
      };
      dispatch(baseCreate(post));
    } else {
      dispatch(
        baseDelete({ _id: id, delete: { id: book._id, base: "basket" } })
      );
    }
  };
  return (
    <>
      {props.user.basket.find((l: IBook) => l._id === book._id) ? (
        <i
          className={`basket`}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            handleClick(e, book)
          }
        >
          <IconBasket />
        </i>
      ) : (
        <i
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
            handleClick(e, book)
          }
        >
          <IconBasket />
        </i>
      )}
    </>
  );
};
