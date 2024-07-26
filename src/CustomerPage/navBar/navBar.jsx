import React, { useContext } from "react";
import LeftNavBar from "../Components/navBarLeft/NavBarLeft";
import NavBarMiddle from "../Components/navBarMiddle/NavBarMiddle";
import NavBarRight from "../Components/navBarRight/NavBarRight";
import "./navBar.css";
import { Outlet } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import CartDropDown from "../Components/CartDropDown/CartDropDown";

const NavBar = () => {
  const { isCartOpen } = useContext(cartContext);
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
    </>
  );
};

export default NavBar;
