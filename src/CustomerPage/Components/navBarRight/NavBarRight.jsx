import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaLanguage } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import "./NavBarRight.css";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../Context/cartContext";
import CartDropDown from "../CartDropDown/CartDropDown";

const NavBarRight = () => {
  const navigate = useNavigate();
  const { isCartOpen, setIsCartOpen } = useContext(cartContext);

  return (
    <>
      <div className="right-container">
        <div className="search-container">
          <RiSearchLine className="general-icon-styles" />
        </div>
        <div
          className="cart-container"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <HiOutlineShoppingCart className="general-icon-styles" />
        </div>

        <div className="langaugeToggle-container">
          <FaLanguage className="general-icon-styles" />
        </div>
        <div
          className="userAuth-container"
          onClick={() => navigate("/ecommerce/sign-in")}
        >
          <FaUser className="general-icon-styles" />
        </div>
      </div>
    </>
  );
};

export default NavBarRight;
