import React, { useContext } from 'react';
import CartItem from './CartItem';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import {RxCross1} from "react-icons/rx";

const CartDropdown = ({toggleIsCartOpen}) => {
  const {cartItems, cartCount, isCartOpen} = useContext(CartContext);
  return (
    <div className={isCartOpen ? "cart-dropdown open" : "cart-dropdown"}>
      <div className='content'>
        <div className='icons-container'>
            <button className='btn round' onClick={toggleIsCartOpen}>
                <RxCross1 className='icon'/>
            </button>
        </div>
        {!cartItems.length
          ? (<div className='cart-empty-container'><p className='cart-is-empty'>Your cart is empty</p></div>)
          : (<div className='cart-items-container'>
              {cartItems.map((item) => <CartItem product={item} key={item.id}/>)}
            </div>)
        }
        
        <div className='clear'></div>
        {cartItems.length
          ? (<p className='items-count'>Total items in cart: {`${cartCount} ${cartCount > 1 ? "items" : "item"}`}</p>)
          : null
        }
        <div className='buttons-container'>
          <button className={cartItems.length ? "btn" : "btn disabled"}>View Cart</button>
          {cartItems.length
          ? (<Link to="/checkout" className='link'><button className={cartItems.length ? "btn" : "btn disabled"}>Checkout</button></Link>)
          : (<button className={cartItems.length ? "btn" : "btn disabled"}>Checkout</button>)
          }
        </div>
      </div>
    </div>
  )
}

export default CartDropdown;