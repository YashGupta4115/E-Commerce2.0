import React, { useContext } from "react";
import LeftNavBar from "../Components/navBarLeft/NavBarLeft";
import NavBarMiddle from "../Components/navBarMiddle/NavBarMiddle";
import NavBarRight from "../Components/navBarRight/NavBarRight";
import "./navBar.css";
import { Outlet } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import CartDropDown from "../Components/CartDropDown/CartDropDown";
import NotificationDropDown from "../Components/NotificationDropDown/NotificationDropDown";

const NavBar = () => {
  const { isCartOpen, isNoficationOpen } = useContext(cartContext);
  return (
    <>
      <div className="navBar-container">
        <div className="left-section">
          <LeftNavBar />
        </div>
        <div className="middle">
          <NavBarMiddle />
        </div>
        <div className="right-section">
          <NavBarRight />
        </div>
      </div>
      <Outlet />

      {isCartOpen && <CartDropDown />}
      {isNoficationOpen && <NotificationDropDown />}
    </>
  );
};

export default NavBar;
