import { CART_ACTION_TYPES } from "./cartTypes";
import { createAction } from "../../utils/reducer";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);


const addCartItem = (cartItems, product) => {
    const existingCartItem = (cartItems.find((item) => item.id === product.id));
    if(existingCartItem){
        return cartItems.map((item) => item.id === product.id
        ? {...item, quantity: item.quantity + 1}   
        : item);
    }
    return [...cartItems, {...product, quantity: 1}];
}

const removeFromCart = (cartItems, product) => [...cartItems.filter((item) => item.id !== product.id)];

const decrementQuantity = (cartItems, product) => {
    const existingCartItem = (cartItems.find((item) => item.id === product.id));
    if (existingCartItem.quantity === 1) return cartItems.filter((item) => item.id !== product.id);
    return cartItems.map((item) => item.id === product.id
        ? {...item, quantity: item.quantity - 1}
        : item
    );
}



export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeFromCart(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
export const decrementItemQuantity = (cartItems, productToDecrement) => {
    const newCartItems = decrementQuantity(cartItems, productToDecrement);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}