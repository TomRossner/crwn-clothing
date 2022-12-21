import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Product = ({product}) => {
    const {name, imageUrl, price} = product;
    const currency = "USD";
    const {addItemToCart} = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
  return (
    <div className='product-card'>
        <div className='product-card-content'>
          <div className='product-image-add-to-cart'>
            <img src={imageUrl} alt={name}/>
            <button className='btn' onClick={addProductToCart}>Add to cart</button>
          </div>
          <div className='product-name-price'>
            <p>{name}</p>
            <span>{price} {currency}</span>
          </div>
        </div>
    </div>
  )
}

export default Product;