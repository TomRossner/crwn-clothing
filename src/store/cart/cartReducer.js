import { combineReducers } from "redux";

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

export const cartReducer = (state = INITIAL_VALUES, action) => {
    const {type, payload} = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
    default: 
        return state;
    }
}

const INITIAL_VALUES = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false
}