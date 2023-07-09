import React,{FC} from "react";
import Navigation from "../Navigation/NavigationItems";
import NavigationIcon from "../Navigation/NavigationIcon";
import "../../styles/style/Navigation.css";
const Layout:FC = () => {
  return (
    <>
      <nav className="navigation">
        <div className="container">
          <div className="navigation_inner">
            <NavigationIcon />
            <Navigation />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Layout;
