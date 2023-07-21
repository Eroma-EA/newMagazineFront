import React, { useState } from "react";
import "../../styles/style/Purchase.css";
import { IBase } from "../../models/IBase";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { baseCreate } from "../../store/userSlice/baseSlice";
import { send } from "../../store/userSlice/sendSlice";

interface IPayDetail {
  email?: string;
  cardNum?: string;
  cardDate?: string;
  cardCVC?: string;
  cardName?: string;
  address?: string;
  homenumber?: string;
  total?: number;
}

const Purchase = (props: any) => {
  const [value, setValue] = useState<IPayDetail>({
    email: "",
    cardNum: "",
    cardDate: "",
    cardCVC: "",
    cardName: "",
    address: "",
    homenumber: "",
  });

  const id = useAppSelector<string>((state) => state.user.user.id);
  const email = useAppSelector<string>((state) => state.user.user.email);
  const base = useAppSelector<IBase>((state) => state.userbase.user);
  const dispatch = useAppDispatch();

  const handleClick = (total: number) => {
    const post: IBase = {
      _id: id,
      payment: {
        base: base.basket,
        paymentDetails: { ...value, total: total },
      },
      base: "payment",
    };
    dispatch(baseCreate(post));

    setTimeout(() => {
      dispatch(send(email));
    }, 2000);
  };

  return (
    <>
      <div className="payment_details">
        <h1>Payment Details</h1>

        <div className="payment payment_email">
          <h3>Email address</h3>
          <input
            className="input input-email"
            type="text"
            placeholder="Email"
            value={value.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue({ ...value, email: e.currentTarget.value })
            }
          />
        </div>
        <div className="payment payment_card-detail">
          <h3>Card Details</h3>
          <div className="card">
            <input
              className="input input-cardNumber"
              type="text"
              placeholder="Card Number"
              value={value.cardNum}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue({ ...value, cardNum: e.currentTarget.value })
              }
            />
            <input
              className="input input-cardDate"
              type="text"
              placeholder="MM/YY"
              value={value.cardDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue({ ...value, cardDate: e.currentTarget.value })
              }
            />
            <input
              className="input input-cardCVC"
              type="text"
              placeholder="CVC"
              value={value.cardCVC}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue({ ...value, cardCVC: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className="payment payment_card-holder">
          <h3>Card Holder</h3>
          <input
            className="input input-cardName"
            type="text"
            placeholder="Jhon Snow"
            value={value.cardName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue({ ...value, cardName: e.currentTarget.value })
            }
          />
        </div>
        <div className="payment payment_address">
          <h3>Billing Address</h3>
          <div className="adress">
            <input
              className="input input-address"
              type="text"
              placeholder="address"
              value={value?.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue({ ...value, address: e.currentTarget.value })
              }
            />
            <div>
              <input
                className="input input-home"
                type="text"
                value={value.homenumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue({
                    ...value,
                    homenumber: e.currentTarget.value,
                  })
                }
              />
              {/* <input
                className="input input-home"
                type="text"
                value={}
                onChange={}
              /> */}
            </div>
          </div>
          <div className="payment payment_total">
            <div className="total">
              <h3>Total</h3>
              <p>{props.total}</p>
            </div>
          </div>
          <button
            className="pay_button"
            onClick={() => handleClick(props.total)}
          >
            Pay
          </button>
        </div>
      </div>
    </>
  );
};

export default Purchase;
