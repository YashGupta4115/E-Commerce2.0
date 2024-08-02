import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./ItemListAndShop.css";
import { cartContext } from "../../../Context/cartContext";
import { docContext } from "../../../Context/docsContext";

const ItemListAndShop = () => {
  const { category, type } = useParams();
  const { addItemToCart } = useContext(cartContext);
  const { clothData } = useContext(docContext);
  if (!clothData[category.toLowerCase()]) {
    return <div>Category not found</div>;
  }
  const items = clothData[category.toLowerCase()].filter(
    (item) => item.wearType === type
  );

  const addItemToCartHandler = (item) => {
    addItemToCart(item);
  };

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
              <button onClick={() => addItemToCartHandler(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListAndShop;
