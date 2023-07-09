import { FC, PropsWithChildren } from "react";
import "../styles/style/Login.css";

const Sign: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login_inner">{children}</div>
        </div>
      </section>
    </>
  );
};

export default Sign;
