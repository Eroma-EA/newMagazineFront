import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { login, logout } from "../../store/userSlice/userSlice";
import { Form } from "../UI/FormStyle";
import { IState } from "../../store/userSlice/Interfaces/IState";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [auth, setAuth] = useState<any>(localStorage.getItem("token"));
  const dispatch = useAppDispatch();

  const user = useAppSelector<IState>((state) => state.user);

  useEffect(() => {
    setAuth(localStorage.getItem("token"));
  }, [user]);
  return (
    <>
      <Form onClick={(e) => e.preventDefault()}>
        <h2>{user.loading && "Загрузка ..."}</h2>

        {user.user.email ? (
          <>
            <h2>{user.user.isActivated && user.user.email}</h2>
            <button onClick={() => dispatch(logout())}>выход</button>
          </>
        ) : (
          <>
            <h2>{user.error && "ошибка авторизации"}</h2>

            <h2>{!auth && "пожалуйста авторизуйтесь"}</h2>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="пороль"
            />

            <button onClick={() => dispatch(login({ email, password }))}>
              login
            </button>

            <div className="add_block">
              <p>
                <Link to={"/Registration"}>create new account</Link>
              </p>
              <p>
                <Link to={"/Registration"}>forget password?</Link>
              </p>
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default LoginForm;
