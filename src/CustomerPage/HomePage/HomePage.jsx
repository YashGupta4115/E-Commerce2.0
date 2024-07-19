import React from "react";
import CategoryItem from "../Components/Categoryitem/CategoryItem";
import mens from "../../Assests/mens.jpg";
import womens from "../../Assests/womens.jpg";
import kids from "../../Assests/kids.jpg";
import winter from "../../Assests/winter.jpg";
import wedding from "../../Assests/wedding.jpg";
import formals from "../../Assests/formals.jpg";

import "./HomePage.css";

const HomePage = () => {
  const categories = [
    {
      type: "Mens",
      image: mens,
    },
    {
      type: "Womens",
      image: womens,
    },
    {
      type: "Kids",
      image: kids,
    },
    {
      type: "Festive",
      image: wedding,
    },
    {
      type: "Winter",
      image: winter,
    },
    {
      type: "Formals",
      image: formals,
    },
  ];

  return (
    <div className="home-page-container">
      {categories.map((item) => {
        return (
          <div className="category-item">
            <CategoryItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
