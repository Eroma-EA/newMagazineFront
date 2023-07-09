import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { baseGet } from "../store/userSlice/baseSlice";
import Cards from "../components/Cards/Cards";

const Liked = () => {
  const dispatch = useAppDispatch();
  const base = useAppSelector((state) => state.userbase);
  const _id = useAppSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(baseGet({ _id }));
  }, [_id]);

  return (
    <section className="Liked">
      <div className="container">
        <div className="Liked_inner">
          <div className="cards">
            {base.loading ? (
              <h2 style={{ fontSize: "50px" }}>Загрузка ...</h2>
            ) : (
              <Cards posts={base.user.liked} del={"liked"} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Liked;
