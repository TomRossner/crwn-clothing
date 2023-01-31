import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesStart } from '../store/categories/categoryAction';
import { selectCategories, selectCategoriesIsLoading } from '../store/categories/categorySelector';
import Product from './Product';
import Spinner from "./common/Spinner";

const CategoriesPreview = ({setCategory}) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const handleClick = (category) => setCategory(category);
    const isLoading = useSelector(selectCategoriesIsLoading)

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, []);

  return (
    <>
    {isLoading ? <Spinner/> : <div className='categories-preview-container'>
        {Object.entries(categories).map(category => {
            return (
                <div key={category} className='category-preview'>
                <h3>{category[0].toUpperCase()}</h3>
                <div className='products-container'>
                        {category[1]
                        .filter((_, index) => index < 4)
                        .map(item => <Product key={item.id} product={item}/>)}
                </div>
                <Link to={`${category[0]}`} onClick={() => handleClick(category[0])} className='btn link white small'>Show more</Link>
            </div>
            )
        })}
    </div>}
    </>
  )
}

export default CategoriesPreview;