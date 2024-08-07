import React, { useContext, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaLanguage } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { CiBellOn } from "react-icons/ci";

import "./NavBarRight.css";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../Context/cartContext";
import { searchContext } from "../../../Context/searchContext";
import { UserContext } from "../../../Context/userContext";
import AuthDropDown from "../AuthDropDown/AuthDropDown";

const NavBarRight = () => {
  const navigate = useNavigate();
  const { setIsCartOpen, setIsNoficationOpen } = useContext(cartContext);
  const { setSearchText } = useContext(searchContext);
  const { currentUser, isAuthDropDownOpen, setIsAuthDropDownOpen } =
    useContext(UserContext);
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

      <div
        className="cart-container"
        onClick={() => setIsNoficationOpen((prev) => !prev)}
      >
        <CiBellOn className="general-icon-styles" />
      </div>

      <div className="langaugeToggle-container">
        <FaLanguage className="general-icon-styles" />
      </div>
      <div className="userAuth-container">
        <div
          className="userAuth-main"
          onClick={() => setIsAuthDropDownOpen(!isAuthDropDownOpen)}
        >
          {currentUser ? (
            <div>
              {currentUser.displayName
                ? currentUser.displayName
                : "logged User"}
            </div>
          ) : (
            <FaUser className="general-icon-styles" />
          )}
        </div>
        {isAuthDropDownOpen && (
          <div className="userAuth-dropDown">
            <AuthDropDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarRight;
