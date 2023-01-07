import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../store/cart/cartAction';
import { selectCartItems } from '../store/cart/cartSelector';

const Product = ({product}) => {
    const {name, imageUrl, price} = product;
    const currency = "USD";
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  return (
    <div className='product-card'>
        <div className='product-card-content'>
          <div className='product-image-add-to-cart'>
            <img src={imageUrl} alt={name}/>
            <button className='btn' onClick={addProductToCart}>Add to cart</button>
          </div>
          <div className='clear'></div>
          <div className='product-name-price'>
            <p>{name}</p>
            <span>{price} {currency}</span>
          </div>
        </div>
    </div>
  )
}

export default Product;