import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { baseGet } from "../store/userSlice/baseSlice";
import "../styles/style/BasketsCards.css";
import BasketCards from "../components/Cards/BasketCards";
import Purchase from "../components/Cards/Purchase";

const Basket = () => {
  const dispatch = useAppDispatch();
  const base = useAppSelector((state) => state.userbase);
  const _id = useAppSelector((state) => state.user.user.id);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    dispatch(baseGet({ _id }));
  }, [_id]);

  return (
    <section className="basket">
      <div className="container">
        <div className="basket_inner">
          <div className="cards basket_cards">
            {base.loading ? (
              <h2 style={{ fontSize: "50px" }}>Загрузка ...</h2>
            ) : (
              <BasketCards
                posts={base.user.basket}
                del={"basket"}
                setTotal={setTotal}
              />
            )}
          </div>
          <div className="purchase_inner">
            <Purchase total={total} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
