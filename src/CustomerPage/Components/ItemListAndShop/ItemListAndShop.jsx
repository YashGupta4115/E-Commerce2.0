import React from "react";
import { useParams } from "react-router-dom";
import { clothData } from "../../../Assests/data";
import "./ItemListAndShop.css";

const ItemListAndShop = () => {
  const { category, type } = useParams();
  const items = clothData.filter(
    (item) => item.type === category && item.wearType === type
  );

  return (
    <div className="selected-item-list-shop-container">
      <div className="product-type-banner">
        <h1>{type}</h1>
      </div>
      <div className="product-list">
        {items.map((item, index) => (
          <div key={item.artNo} className="product-card">
            <img
              src={require(`../../../Assests/${category}Wear/${item.wearType}.jpg`)}
              alt={item.wearType}
            />
            <div className="product-description">
              <p>
                {item.wearType}
                {index}
              </p>
              <p>Price: ${item.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListAndShop;
