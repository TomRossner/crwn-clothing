import React, { useState, createContext, useEffect } from 'react';

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

export const CartContext = createContext({
    isCartOpen: null,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    cartCount: null,
    decrementItemQuantity: () => {},
    cartTotal: null
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));
    const removeItemFromCart = (product) => setCartItems(removeFromCart(cartItems, product));
    const decrementItemQuantity = (product) => setCartItems(decrementQuantity(cartItems, product));

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
    }, [cartItems]);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, cartCount, decrementItemQuantity, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}