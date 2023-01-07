import React from 'react';
import CategoriesPreview from "./CategoriesPreview";

const Shop = ({category, setCategory}) => {
  return (
   <>
   <CategoriesPreview category={category} setCategory={setCategory}/>
   </>
  )
}

export default Shop;