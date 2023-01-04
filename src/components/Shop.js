import React, { useEffect } from 'react';
import Product from './Product';
import { getCategoriesAndDocuments } from '../utils/firebase';
import { setCategoriesMap } from '../store/categories/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoriesMap } from '../store/categories/categorySelector';

const Shop = () => {
    const dispatch = useDispatch();
    const categoriesMap = useSelector(selectCategoriesMap);

    useEffect(() => {
      const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        dispatch(setCategoriesMap(categoryMap));
      }
      getCategoriesMap();
    }, [])
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