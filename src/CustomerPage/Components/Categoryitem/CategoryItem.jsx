import React from "react";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ item }) => {
  return (
    <div className="category-item-container">
      <Link to={`/ecommerce/${item.type}`}>
        <div className="item-title">{item.type}</div>
        <div className="image-container">
          <img
            className="category-item-image"
            src={item.image}
            alt="item-image"
          />
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
