import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/productsContext';
import Product from './Product';

const Shop = () => {
    const {products} = useContext(ProductsContext);
  return (
    <div className='products-container'>
        {products.map((product) => <Product key={product.id} product={product}/>)}
    </div>
  )
}

export default Shop;