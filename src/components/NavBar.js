import React, { useState, useContext, useEffect } from 'react';
import {GiCrenelCrown} from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import {RxHamburgerMenu} from "react-icons/rx";
import {RxCross1} from "react-icons/rx";
import { UserContext } from '../contexts/userContext';
import {BsDot} from "react-icons/bs";
import CartDropdown from './CartDropdown';
import { CartContext } from '../contexts/CartContext';

const NavBar = () => {
    const [menuIcon, setMenuIcon] = useState(false);
    const menuShowOpen = <RxHamburgerMenu className='icon'/>;
    const menuShowClose = <RxCross1 className='icon'/>;
    const handleChangeMenuIcon = () => setMenuIcon(!menuIcon);
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
        setMenuIcon(false);
    }
    const {cartItems} = useContext(CartContext);

    useEffect(() => {
        if (currentUser === null) return;
        navigate("/CRWN-Clothing/");
    }, [currentUser, navigate]);

  return (
    <>
    <CartDropdown toggleIsCartOpen={toggleIsCartOpen}/>
    <header>
        <div className='logo'>
            <Link to="/CRWN-Clothing/" className='nav-link'>
                <span>CRWN<GiCrenelCrown className='icon'/>Clothing</span>
            </Link>
        </div>
        <nav className='nav-full-width'>
            <ul>
                <Link to="/CRWN-Clothing/" className='nav-link'><span>Home</span></Link>
                <Link to="shop" className='nav-link'><span>Shop</span></Link>
                <Link to="about" className='nav-link'><span>About</span></Link>
            </ul>
            <ul>
                <p className='nav-link' onClick={toggleIsCartOpen}>
                    <span className='cart-with-count'>
                        Cart
                        {cartItems.length ? <BsDot className='cart-notification'/> : null}
                    </span>
                </p> 
                {currentUser
                    ? (<Link to="logout" className='nav-link'><span>Logout</span></Link>)
                    : (<Link to="sign-in" className='nav-link'><span>Sign in</span></Link>)
                }   
            </ul>
        </nav>
        <nav className='nav-mobile'>
            <button className='wrapper-btn' onClick={handleChangeMenuIcon}>
                {!menuIcon && menuShowOpen}
                {menuIcon && menuShowClose}
            </button>
        </nav>
    </header>
    <div className={!menuIcon ? "menu" : "menu open"}>
        <div className='menu-mobile-logo'>
            <GiCrenelCrown className='icon'/>
            <p>CRWN CLOTHING</p>
        </div>
        <ul>
            <Link to="/CRWN-Clothing/" className='nav-link' onClick={handleChangeMenuIcon}>Home</Link>
            <Link to="shop" className='nav-link' onClick={handleChangeMenuIcon}>Shop</Link>
            <Link to="about" className='nav-link' onClick={handleChangeMenuIcon}>About</Link>
        </ul>
        <ul>
            <p className='nav-link' onClick={toggleIsCartOpen}>
                <span className='cart-with-count'>Cart</span>
            </p>
            {currentUser
                ? (<Link to="logout" className='nav-link' onClick={handleChangeMenuIcon}><div>Logout</div></Link>) 
                : (<Link to="sign-in" className='nav-link' onClick={handleChangeMenuIcon}><div>Sign in</div></Link>)
            }
        </ul>
    </div>
    </>
  )
}

export default NavBar;