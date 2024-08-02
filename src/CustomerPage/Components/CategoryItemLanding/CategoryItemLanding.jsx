import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CategoryItemLanding.css";
import { docContext } from "../../../Context/docsContext";

export const getUniqueTypesFromList = (data) => {
  const types = data.map((item) => item.wearType);
  return [...new Set(types)];
};

const CategoryItemLanding = () => {
  const { clothData } = useContext(docContext);
  const { category } = useParams();
  const navigate = useNavigate();
  // Ensure the category is valid and exists in clothData
  if (!clothData[category.toLowerCase()]) {
    return <div>Category not found</div>;
  }

  const getDataForUrlType = clothData[category.toLowerCase()];

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
              <div className="categoryItem-image-container">
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
