import React, { useEffect, useState } from "react";
import { IBook } from "../../models/IBook";
import "../../styles/style/PurchasesCard.css";

interface IPaymentDetails {
  email: string;
  cardNum: string;
  cardDate: string;
  cardCVC: string;
  cardName: string;
  address: string;
  homenumber: string;
  total: number;
}

interface IPayment {
  base: IBook[];
  paymentDetails: IPaymentDetails;
}

const PurchasesCards = (props: any) => {
  const posts = props.posts;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    let det: Object;
    let d = posts.map((b: any, i: number) => (det = [false]));
    setDetail(d);
  }, []);

  const handleClick = (index: number) => {
    // const newDate=detail.map((d:any,i:umber)=>)
  };

  return (
    <>
      {posts.map((b: IPayment, index: any) => (
        <div key={index}>
          {b.base.map((book: IBook) => (
            <div className="book" key={book._id}>
              <p>{book.name}</p>
            </div>
          ))}
          <p>Total: {b.paymentDetails.total}</p>
          <button onClick={() => handleClick(index)}>данные покупки</button>
          <div
            className={`paymentdetail ${detail[index] === true && "detail"}`}
          >
            <h3>Email: {b.paymentDetails.email}</h3>
            <div>
              <h3>Address:</h3>
              <p>{b.paymentDetails.address}</p>
              <p>{b.paymentDetails.homenumber}</p>
            </div>
            <div>
              <h3>IIC:</h3> <p>{b.paymentDetails.cardNum}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PurchasesCards;
