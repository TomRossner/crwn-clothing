import React from "react";
import { Link } from "react-router-dom";

const Category = ({category}) => {
  const {id, imageUrl: url, title} = category;

  return (
    <div key={id} className="category-container">
      <div className="category-background-img">
        <img src={url} alt="category thumbnail"/>
      </div>
      <h2>{title}</h2>
      <Link to={`/CRWN-Clothing/shop/${title}`} className="category-button">Shop now</Link>
    </div>
  );
};

export default Category;