import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { baseGet } from "../store/userSlice/baseSlice";
import "../styles/style/BasketsCards.css";
import BasketCards from "../components/Cards/BasketCards";

const Basket = () => {
  const dispatch = useAppDispatch();
  const base = useAppSelector((state) => state.userbase);
  const _id = useAppSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(baseGet({ _id }));
  }, [_id]);

  return (
    <section className="Basket">
      <div className="container">
        <div className="Basket_inner">
          <div className="cards basket_cards">
            {base.loading ? (
              <h2 style={{ fontSize: "50px" }}>Загрузка ...</h2>
            ) : (
              <BasketCards posts={base.user.basket} del={"basket"} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
