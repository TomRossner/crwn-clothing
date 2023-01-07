import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectCategories } from '../store/categories/categorySelector';
import Product from './Product';
import {BsChevronLeft} from "react-icons/bs"

const CategoryExpanded = ({category: currentCategory}) => {
  const categories = useSelector(selectCategories);
  const categoryItems = Object.entries(categories).find(category => category[0] === currentCategory);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryItems) navigate("/shop");
  }, [categoryItems]);

  return (
    <>
    {categoryItems
    ? (
    <div className='container'>
      <div className='back-to-shop-and-title'>
        <Link to="/shop" className='btn link'><BsChevronLeft className='icon'/><span className='back-only'>Back <span>to Shop</span></span></Link>
        <h1>{currentCategory.toUpperCase()}</h1>
      </div>
      <div className='products-container flex-wrap'>
        {categoryItems[1].map(item => <Product key={item.id} product={item}/>)}
      </div>
    </div>
    ) : null
    }
    </>
  )
}

export default CategoryExpanded;