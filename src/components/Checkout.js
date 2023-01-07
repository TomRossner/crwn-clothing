import React from 'react';
import {VscTrash} from "react-icons/vsc";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cart/cartSelector';
import { addItemToCart, decrementItemQuantity, removeItemFromCart } from '../store/cart/cartAction';

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const currency = "USD";

  return (
    <>
        {!cartItems.length ?
        (<div className='container'>
            <h2>Your cart is empty</h2>
            <button className='btn blue'><Link className='link' to="/CRWN-Clothing/">Back to the Homepage</Link></button>
        </div>
        ):(
        <div className='items-container'>
            <div className='headers'>
                <h4>Image</h4>
                <h4>Product</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4>Remove</h4>
            </div>
            <div className='items'>
                {cartItems.map((item) => {
                    const {id, name, quantity, price, imageUrl} = item;
                    return (
                        <div key={id} className="list-item">
                            <div><img src={imageUrl} alt={name}></img></div>
                            <div>{name}</div>
                            <div>{price} {currency}</div>
                            <div className='quantity'>
                                <BiChevronLeft onClick={() => dispatch(decrementItemQuantity(cartItems, item))} className='icon'/>
                                    {quantity}
                                <BiChevronRight onClick={() => dispatch(addItemToCart(cartItems, item))} className='icon'/>
                            </div>
                            <div className='remove'>
                                <VscTrash className='trash-icon' onClick={() => dispatch(removeItemFromCart(cartItems, item))}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <p className='total'>Total: {cartTotal} {currency}</p>
            <button className='btn long'>Proceed to Checkout</button>
            <button className='btn long shop'><Link to="/shop" className='link'>Continue Shopping</Link></button>
        </div>
        )}
    </>
  )
}

export default Checkout;