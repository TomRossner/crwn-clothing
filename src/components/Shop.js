import React, { useContext } from 'react';
import { CategoriesContext } from '../contexts/CategoriesContext';
import Product from './Product';

const Shop = () => {
    const {categoriesMap} = useContext(CategoriesContext);
  return (
    <>
    {
      Object.keys(categoriesMap).map((title, index) => (
        <section key={index}>
          <h2>{title[0].toUpperCase() + title.substring(1, title.length).toLowerCase()}</h2>
          <div className='products-container' key={index}>
            {categoriesMap[title].map((product) => (<Product key={product.id} product={product}/>))}
          </div>
        </section>
      ))
    }
    </>
  )
}

export default Shop;