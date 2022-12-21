// import React, { useContext } from 'react';
// import "../styles/index.scss";
// import CartItem from './CartItem';
// import { CartContext } from '../contexts/CartContext';
// import { Link } from 'react-router-dom';
// import {RxCross1} from "react-icons/rx";

// const MobileCartDropDown = ({toggleOpenMobileCart, className}) => {
//   const {cartItems, cartCount} = useContext(CartContext);
//   return (
//     <div className={className}>
//         <div className='content'>
//             <div className='icons-container'>
//                 <button className='btn round' onClick={toggleOpenMobileCart}>
//                     <RxCross1 className='icon'/>
//                 </button>
//             </div>
//             {!cartItems.length
//                 ? (<p className='cart-is-empty'>Your cart is empty</p>)
//                 : (<div className='cart-items-container'>
//                     {cartItems.map((item) => <CartItem product={item} key={item.id}/>)}
//                 </div>)
//             }
            
//             <div className='clear'></div>
//             {cartItems.length
//                 ? (<p className='items-count'>Total items in cart: {`${cartCount} ${cartCount > 1 ? "items" : "item"}`}</p>)
//                 : null
//             }
//             <div className='buttons-container'>
//                 <button className={cartItems.length ? "btn" : "btn disabled"}>View Cart</button>
//                 {cartItems.length
//                 ? (<Link to="/checkout" className='link'><button className={cartItems.length ? "btn" : "btn disabled"}>Checkout</button></Link>)
//                 : (<button className={cartItems.length ? "btn" : "btn disabled"}>Checkout</button>)
//                 }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default MobileCartDropDown;