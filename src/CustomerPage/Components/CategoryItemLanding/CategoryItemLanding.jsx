import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { clothData } from "../../../Assests/data";
import "./CategoryItemLanding.css";

export const getUniqueTypesFromList = (data) => {
  const types = data.map((item) => item.wearType);
  return [...new Set(types)];
};

const CategoryItemLanding = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const getDataForUrlType = clothData.filter((item) => item.type === category);
  const uniqueData = getUniqueTypesFromList(getDataForUrlType);

  const navigateHandler = (data) => {
    navigate(`/ecommerce/${category}/${data}`);
  };

  return (
    <div className="item-landingPage-container">
      <div className="category-title">
        <p>{category}</p>
      </div>
      <div className="category-list-container">
        {uniqueData.map((data) => {
          return (
            <div
              key={data}
              className="category-list-card"
              onClick={() => navigateHandler(data)}
            >
              <div style={{ marginBottom: "0.5rem", fontSize: "18px" }}>
                {data}
              </div>
              <div>
                <img
                  className="categoryItem-image"
                  src={require(`../../../Assests/${category}Wear/${data}.jpg`)}
                  alt={data}
                />
              </div>
              <div className="shop-popUp">Shop</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryItemLanding;
