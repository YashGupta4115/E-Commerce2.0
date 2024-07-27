import React, { useContext, useEffect, useState } from "react";
import "./CheckOutPage.css";
import { cartContext } from "../../../Context/cartContext";
import SummarySection from "../Summary-section/SummarySection";
import { useNavigate } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const CheckOutPage = () => {
  const { cartItems, reduceItemQuantity, addItemToCart, removeItemFromCart } =
    useContext(cartContext);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0) {
      setDiscount(100);
      setDelivery(50);
    } else {
      setDiscount(0);
      setDelivery(0);
    }
  }, [cartItems]);

  const navigate = useNavigate();

  return (
    <div className="check-out-page-container">
      <div className="check-out-page-item-list">
        <div className="header-titles">
          <div className="header-title">Sl No</div>
          <div className="header-title">Item</div>
          <div className="header-title">Quantity</div>
          <div className="header-title">Price</div>
          <div className="header-title">Amount</div>
          <div> </div>
        </div>
        {cartItems.length === 0 ? (
          <div style={{ margin: "1rem" }}>
            <p>No Items in Cart</p>
            <div onClick={() => navigate("/ecommerce")}>Go To Shop</div>
          </div>
        ) : (
          Object.values(cartItems).map((item, index) => {
            return (
              <div key={index} className="check-out-page-row">
                <div>{index + 1}</div>
                <div>
                  {item.type} {item.wearType}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <GoChevronLeft onClick={() => reduceItemQuantity(item)} />
                  {item.quantity}
                  <GoChevronRight
                    onClick={() => {
                      addItemToCart(item);
                    }}
                  />
                </div>
                <div>Rs. {item.price}</div>
                <div>Rs. {item.price * item.quantity}</div>
                <div>
                  <button onClick={() => removeItemFromCart(item)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <SummarySection discount={discount} delivery={delivery} />
    </div>
  );
};

export default CheckOutPage;
