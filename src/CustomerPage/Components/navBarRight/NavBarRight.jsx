import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaLanguage } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";

import "./NavBarRight.css";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../Context/cartContext";
import { searchContext } from "../../../Context/searchContext";

const NavBarRight = () => {
  const navigate = useNavigate();
  const { setIsCartOpen } = useContext(cartContext);
  const { setSearchText } = useContext(searchContext);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const onSearchHandler = () => {
    setIsSearchBarOpen((prev) => !prev);
    navigate(isSearchBarOpen ? "/ecommerce" : "/ecommerce/search");
  };

  return (
    <div className="right-container">
      <div className="search-container">
        {isSearchBarOpen && (
          <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        )}
        <RiSearchLine
          className="general-icon-styles"
          onClick={onSearchHandler}
        />
      </div>
      <div
        className="cart-container"
        onClick={() => setIsCartOpen((prev) => !prev)}
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
  );
};

export default NavBarRight;
