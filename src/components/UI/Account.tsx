import styled from "@emotion/styled";
import { useState, useLayoutEffect } from "react";
import AccountPNG from "../../images/navigation/account.png";
import { IUser } from "../../models/IUser";
import { IconOut } from "../Icons/Icons";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../store/userSlice/userSlice";
import { Link } from "react-router-dom";

const AccountImg = (props: any) => {
  const user: IUser = props.user;

  const dispatch = useAppDispatch();

  const [sideShow, setSideShow] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (active === true) {
      setTimeout(() => {
        setSideShow(true);
      }, 100);
    } else {
      setTimeout(() => {
        setSideShow(false);
      }, 100);
    }
  }, [active]);

  return (
    <>
      <AccountSpan>
        <span
          className="main-span"
          onMouseOver={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <img className="user-img" src={`${AccountPNG}`} alt="" />
          <MainDiv
            className={
              active
                ? `main-active ${sideShow && "show"}`
                : `${sideShow && "main-active"}`
            }
          >
            <h2>{user.email.split("@")[0]}</h2>
            <li>
              <Link to={"/Liked"}>
                <p className="main-li">liked</p>
              </Link>
            </li>
            <li>
              <p className="main-li">settings</p>
            </li>
            <li onClick={() => dispatch(logout())}>
              <p className="main-li">
                <i className="main-icon">
                  <IconOut />
                </i>
                Quit
              </p>
            </li>
          </MainDiv>
        </span>
      </AccountSpan>
    </>
  );
};

export default AccountImg;

const AccountSpan = styled.span`
  position: relative;
  display: block;
  width: 50px;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  .user-img {
    position: absolute;
    border-radius: 25px;
    height: 50px;
    top: -15px;
    cursor: pointer;
    z-index: 2;
    transition: transform 0.5s cubic-bezier(0.76, 0.07, 0.25, 0.94);
  }
  .main-span:hover .user-img {
    transform: rotate(-360deg);
  }
  .main-active {
    display: block;
    height: 0px;
    width: 0px;
    opacity: 0;
  }

  .main-active h2 {
    transition: all 0.3s;
    display: none;
  }
  .show {
    height: 230px;
    width: 200px;
    opacity: 1;
  }
  .show h2 {
    display: block;
  }
`;

export const MainDiv = styled.ul`
  transition: all 0.3s;
  height: 0px;
  width: 0px;
  opacity: 0;
  position: absolute;
  right: -10px;
  z-index: 1;
  top: -25px;
  border-radius: 35px;
  background-color: white;
  box-shadow: 0px 0px 5px 0px black;
  padding: 20px;
  display: none;
  overflow: hidden;

  li:first-child {
    margin: 0;
  }

  h2 {
    padding: 5px 0px;
    font-size: 15px;
  }

  li {
    transition: all 0.2s ease-in-out;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-li {
    display: flex;

    padding: 5px 10px;
    text-align: center;
  }

  li:hover {
    background-color: rgb(207, 221, 255);
  }
  .main-icon {
    display: block;
    margin-right: 10px;
    transform: rotate(180deg);
  }
`;
