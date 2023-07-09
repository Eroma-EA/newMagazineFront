import { useEffect } from "react";
import Card from "../components/Cards/Card";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { postGet } from "../store/userSlice/postSlice";
import { IReviewState } from "../store/userSlice/Interfaces/IReviewState";
import { reviewGet } from "../store/userSlice/reviewSlice";

const CardId = () => {
  const dispatch = useAppDispatch();
  const id = Object.fromEntries(new URLSearchParams(window.location.search));

  const post = useAppSelector((state) => state.post);
  const user = useAppSelector((state) => state.user.user);

  const review = useAppSelector<IReviewState>((state) => state.reviews);

  useEffect(() => {
    dispatch(postGet(id.id));
  }, []);

  useEffect(() => {
    dispatch(reviewGet(id.id));
  }, []);

  return (
    <>
      <section className="card">
        <div className="container">
          <div className="card_inner">
            <Card post={post} user={user} review={review} id={id.id} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CardId;
