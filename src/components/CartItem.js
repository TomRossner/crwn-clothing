import React from 'react';
import {VscTrash} from "react-icons/vsc";
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCart } from '../store/cart/cartAction';
import { selectCartItems } from '../store/cart/cartSelector';

const CartItem = ({product}) => {
    const {imageUrl, name, price, quantity} = product;
    const currency = "USD";
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const removeItem = () => dispatch(removeItemFromCart(cartItems, product));
  return (
    <div className='cart-item'>
        <div className='cart-item-content'>
            <img src={imageUrl} alt={name}/>
            <div className='cart-item-details'>
                <p className='cart-item-name'>{name}</p>
                <p className='cart-item-price'>{price} <span>{currency}</span></p>
                <span className='cart-item-qty'>Qty: {quantity}</span>
            </div>
            <div className='icons-container'>
                <VscTrash title='Remove from cart' className='trash-icon' onClick={removeItem}/>
            </div>
        </div>
    </div>
  )
}

export default CartItem;