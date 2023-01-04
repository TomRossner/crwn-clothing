import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser} from "./utils/firebase";
import { setCurrentUser } from "./store/user/userAction";
import { useDispatch } from "react-redux";

// Styles
import "./styles/index.scss";
import "./styles/home.scss";
import "./styles/auth-form.scss";
import "./styles/categories.scss";
import "./styles/category.scss";
import "./styles/navbar.scss";
import "./styles/footer.scss";
import "./styles/input.scss";
import "./styles/products.scss";
import "./styles/product.scss";
import "./styles/back-to-top.scss";
import "./styles/cart-dropdown.scss";
import "./styles/cart-item.scss";
import "./styles/checkout.scss";

// Components
import Home from "./components/Home";
import NavBar from './components/NavBar';
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Shop from "./components/Shop";
import BackToTop from "./components/BackToTop";
import Checkout from "./components/Checkout";


const App = () => {
  const [scrollButton, setScrollButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) return setScrollButton(true);
      else return setScrollButton(false);
    });
  }, [])


  useEffect(() => {
    const signOut = async () => await signOutUser();
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
    });
    signOut();
    return unsubscribe;
}, []);




  return (
    <div className='main-container'>
      <NavBar/>
      <Routes>
          <Route path="/CRWN-Clothing/" element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
          <Route path="about" element={<Home/>} />
          <Route path="sign-in" element={<SignIn/>}/>
          <Route path="sign-up" element={<Signup/>}/>
          <Route path="logout" element={<Logout/>}/>
          <Route path="cart" element={<Home/>}/>
          <Route path="checkout" element={<Checkout/>}/>
      </Routes>
      {scrollButton ? <BackToTop/> : null}
      <Footer/>
    </div>
  );
}

export default App;