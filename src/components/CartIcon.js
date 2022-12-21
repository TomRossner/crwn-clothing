import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg";
import React from 'react';

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="icon shopping"/>
      <span className="item-count">4</span>
    </div>
  )
}

export default CartIcon;