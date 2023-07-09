import React, { useState } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import AccountImg from "../UI/Account";
import { useAppSelector } from "../../hooks/reduxHooks";
import { IUser } from "../../models/IUser";

const NavigationItems = () => {
  const user = useAppSelector<IUser>((state) => state.user.user);

  return (
    <ul className="Navigation_main">
      <NavigationItem to={"/"}>Home</NavigationItem>
      <NavigationItem to={"/Basket"}>Basket</NavigationItem>
      <NavigationItem to={"/About"}>About us</NavigationItem>
      {user.email ? (
        <li>
          <AccountImg user={user} />
        </li>
      ) : (
        <NavigationItem to={"/Login"}>Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
