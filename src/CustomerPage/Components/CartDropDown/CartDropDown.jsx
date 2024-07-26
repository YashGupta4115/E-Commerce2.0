import React, { useContext } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./CartDropDown.css";
import { cartContext } from "../../../Context/cartContext";
import { IoMdClose } from "react-icons/io";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const navigate = useNavigate();
  const {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    removeItemFromCart,
    reduceItemQuantity,
  } = useContext(cartContext);

  const checkOutHandler = () => {
    setIsCartOpen(false);
    navigate("/ecommerce/checkout");
  };
  return (
    <div className="cart-dropDown-container">
      <div className="navPopUp-title">
        <div>
          Cart
          {Object.keys(cartItems).length > 0 ? (
            <span>{`(${Object.keys(cartItems).length})`}</span>
          ) : (
            ""
          )}
        </div>
        <IoIosCloseCircleOutline
          className="navPopUp-toggleIcon"
          onClick={() => setIsCartOpen(!isCartOpen)}
        />
      </div>
      <hr />
      {Object.keys(cartItems).length > 0 ? (
        Object.values(cartItems).map((item) => (
          <div key={item.artNo} className="item-box">
            <div className="item-nameAndQuantity">
              <span className="item-name">{item.type}</span>
              <span className="item-quantity">{item.wearType}</span>
            </div>
            <div className="increase-decrease-quantity-container">
              <GoChevronLeft
                style={{ cursor: "pointer" }}
                onClick={() => reduceItemQuantity(item)}
              />
              {item.quantity}
              <GoChevronRight
                style={{ cursor: "pointer" }}
                onClick={() => addItemToCart(item)}
              />
            </div>
            <div className="item-price">{item.price * item.quantity}</div>
            <div className="remove-item-icon">
              <IoMdClose
                style={{ cursor: "pointer" }}
                onClick={() => removeItemFromCart(item)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="empty-cart">Your cart is empty</div>
      )}
      {Object.keys(cartItems).length > 0 && (
        <button onClick={checkOutHandler}>Checkout</button>
      )}
    </div>
  );
};

export default CartDropDown;
