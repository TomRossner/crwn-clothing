import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import {VscTrash} from "react-icons/vsc";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import { Link } from 'react-router-dom';

const Checkout = () => {
    const {cartItems, addItemToCart, removeItemFromCart, decrementItemQuantity, cartTotal} = useContext(CartContext);
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
                                <BiChevronLeft onClick={() => decrementItemQuantity(item)} className='icon'/>
                                    {quantity}
                                <BiChevronRight onClick={() => addItemToCart(item)} className='icon'/>
                            </div>
                            <div className='remove'>
                                <VscTrash className='trash-icon' onClick={() => removeItemFromCart(item)}/>
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