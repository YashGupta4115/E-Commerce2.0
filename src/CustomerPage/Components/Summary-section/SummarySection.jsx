import React, { useContext } from "react";
import { cartContext } from "../../../Context/cartContext";
import "./SummarySection.css";

const SummarySection = ({ discount, delivery }) => {
  const { cartItems, totalPrice } = useContext(cartContext);
  const paymentHandler = () => {
    // Make API call to process payment
    // Redirect to payment gateway
  };
  return (
    <div className="summary-section">
      <div className="header-titles">Summary</div>
      <div className="individual-price-container">
        Price{`(${Object.keys(cartItems).length})`} : Rs. {totalPrice}
      </div>
      <div className="individual-price-container">
        Discount : Rs. {discount}
      </div>
      <div className="individual-price-container">
        Delivery : Rs. {delivery}
      </div>
      <div className="individual-price-container">
        Total Amount {`(${Object.keys(cartItems).length})`} : Rs.{" "}
        {totalPrice - discount + delivery}
      </div>
      <button className="individual-price-container" onClick={paymentHandler}>
        Process Payment
      </button>
    </div>
  );
};

export default SummarySection;
