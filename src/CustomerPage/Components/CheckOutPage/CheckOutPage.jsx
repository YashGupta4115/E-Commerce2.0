import React, { useContext, useState } from "react";
import "./CheckOutPage.css";
import { cartContext } from "../../../Context/cartContext";
import SummarySection from "../Summary-section/SummarySection";

const CheckOutPage = () => {
  const { cartItems, totalPrice } = useContext(cartContext);
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState(0);

  return (
    <div className="check-out-page-container">
      <div className="header-titles">
        <div>Sl No</div>
        <div>Item</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Amount</div>
      </div>
      {
        Object.values(cartItems).map((item)=>{
            return(
                
            )
        })
      }
      <SummarySection/>
    </div>
  );
};

export default CheckOutPage;
