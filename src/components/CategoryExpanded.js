import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectCategories } from '../store/categories/categorySelector';
import Product from './Product';
import {BsChevronLeft} from "react-icons/bs";
import { fetchCategoriesStart } from '../store/categories/categoryAction';

const CategoryExpanded = ({category: currentCategory}) => {
  const categoryName = useParams();
  const categories = useSelector(selectCategories);
  const categoryItems = Object.entries(categories).find(category => category[0] === categoryName.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [])

  return (
    <>
    {categoryItems
    ? (
    <div className='categories-preview-container'>
      <div className='back-to-shop-and-title'>
        <Link to="/CRWN-Clothing/shop" className='btn link'><BsChevronLeft className='icon'/><span className='back-only'>Back <span>to Shop</span></span></Link>
        <h1>{currentCategory.toUpperCase()}</h1>
      </div>
      <div className='products-container'>
        {categoryItems[1].map(item => <Product key={item.id} product={item}/>)}
      </div>
    </div>
    ) : null}
    </>
  )
}

export default CategoryExpanded;