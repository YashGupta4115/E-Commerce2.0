import { searchContext } from "../../../Context/searchContext";
import "./AllItem.css";

import React, { useContext } from "react";
import { cartContext } from "../../../Context/cartContext";
import { docContext } from "../../../Context/docsContext";

const AllItems = () => {
  const { searchText } = useContext(searchContext);
  const { addItemToCart } = useContext(cartContext);
  const { clothData } = useContext(docContext);
  let filteredItems = clothData.filter((item) => {
    return item.wearType.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="allItems-container">
      {filteredItems.map((item, index) => {
        return (
          <div key={item.artNo} className="product-card">
            <img
              src={require(`../../../Assests/${item.type}Wear/${item.wearType}.jpg`)}
              alt={item.wearType}
            />
            <div className="product-description">
              <p>
                {item.wearType}
                {index}
              </p>
              <p>Price: ${item.price}</p>
              <button onClick={() => addItemToCart(item)}>Add to Cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllItems;
