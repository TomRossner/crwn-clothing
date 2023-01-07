// import React, { createContext, useReducer } from 'react';
// import { createAction } from '../utils/reducer';

// const addCartItem = (cartItems, product) => {
//     const existingCartItem = (cartItems.find((item) => item.id === product.id));
//     if(existingCartItem){
//         return cartItems.map((item) => item.id === product.id
//         ? {...item, quantity: item.quantity + 1}   
//         : item);
//     }
//     return [...cartItems, {...product, quantity: 1}];
// }

// const removeFromCart = (cartItems, product) => [...cartItems.filter((item) => item.id !== product.id)];

// const decrementQuantity = (cartItems, product) => {
//     const existingCartItem = (cartItems.find((item) => item.id === product.id));
//     if (existingCartItem.quantity === 1) return cartItems.filter((item) => item.id !== product.id);
//     return cartItems.map((item) => item.id === product.id
//         ? {...item, quantity: item.quantity - 1}
//         : item
//     );
// }

// export const CartContext = createContext({
//     isCartOpen: null,
//     setIsCartOpen: () => {},
//     cartItems: [],
//     addItemToCart: () => {},
//     removeItemFromCart: () => {},
//     cartCount: null,
//     decrementItemQuantity: () => {},
//     cartTotal: null
// });

// const CART_ACTION_TYPES = {
//     SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
//     SET_CART_ITEMS: "SET_CART_ITEMS"
// }

// const cartReducer = (state, action) => {
//     const {type, payload} = action;
//     switch(type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 ...payload
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload
//             }
//     default: 
//         throw new Error(`Unhandled type of ${type} in cartReducer`);
//     }
// }

// const INITIAL_VALUES = {
//     cartItems: [],
//     cartCount: 0,
//     cartTotal: 0,
//     isCartOpen: false
// }

// export const CartProvider = ({children}) => {
//     const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_VALUES);

//     const updateCartItemsReducer = (newCartItems) => {
//         const newCartTotal = newCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//         const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);

//         dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//             cartItems: newCartItems,
//             cartCount: newCartCount,
//             cartTotal: newCartTotal
//         }));
//     }

//     const setIsCartOpen = (boolean) => dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

//     const addItemToCart = (productToAdd) => {
//         const newCartItems = addCartItem(cartItems, productToAdd);
//         updateCartItemsReducer(newCartItems);
//     }
//     const removeItemFromCart = (productToRemove) => {
//         const newCartItems = removeFromCart(cartItems, productToRemove);
//         updateCartItemsReducer(newCartItems);
//     }
//     const decrementItemQuantity = (productToDecrement) => {
//         const newCartItems = decrementQuantity(cartItems, productToDecrement);
//         updateCartItemsReducer(newCartItems);
//     }

//     const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, cartCount, decrementItemQuantity, cartTotal};

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }