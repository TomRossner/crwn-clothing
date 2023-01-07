import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, /*Route, Routes*/ } from 'react-router-dom';
import { setCategoriesMap } from '../store/categories/categoryAction';
import { selectCategories } from '../store/categories/categorySelector';
import { getCategoriesAndDocuments } from '../utils/firebase';
// import CategoryExpanded from './CategoryExpanded';
import Product from './Product';

const CategoriesPreview = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [browsedCategory, setBowsingCategory] = useState("");
    const handleClick = (category) => setBowsingCategory(category);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            dispatch(setCategoriesMap(categoryMap));
        }
        getCategoriesMap();
    }, []);

  return (
    <>
    {/* <Routes>
        <Route path={`:${browsedCategory}`} element={<CategoryExpanded/>}></Route>
    </Routes> */}
    <div className='categories-preview-container'>
        {categories
        ? Object.entries(categories).map(category => {
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
        })
        : null}
    </div>
    </>
  )
}

export default CategoriesPreview;