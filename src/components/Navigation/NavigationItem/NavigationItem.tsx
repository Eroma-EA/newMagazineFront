import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = (props: any) => {
  return (
    <li>
      <NavLink to={props.to}>{props.children}</NavLink>
    </li>
  );
};
export default NavigationItem;
