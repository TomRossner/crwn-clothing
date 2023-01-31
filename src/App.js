import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { checkUserSession } from "./store/user/userAction";
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
import "./styles/view-cart.scss";
import "./styles/categories-preview.scss";
import "./styles/spinner.scss";
import "./styles/category-expanded.scss";
import "./styles/not-found.scss";

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
import ViewCart from "./components/ViewCart";
import CategoryExpanded from "./components/CategoryExpanded";
import NotFound from "./components/NotFound";


const App = () => {
  const [scrollButton, setScrollButton] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) return setScrollButton(true);
      else return setScrollButton(false);
    });
  }, []);


  useEffect(() => {
    dispatch(checkUserSession());
  },[]);


  const [browsedCategory, setBrowsedCategory] = useState("");

  useEffect(() => {
    console.log("Browsed category: ", browsedCategory)
  }, [browsedCategory])

  return (
    <div className='main-container'>
      <NavBar/>
      <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route path='/CRWN-Clothing/*' element={<NotFound />}/>
          <Route path="/CRWN-Clothing/" element={<Home setBrowsedCategory={setBrowsedCategory}/>}/>
          <Route path="/CRWN-Clothing/shop" element={<Shop category={browsedCategory} setCategory={setBrowsedCategory}/>}/>
          <Route path="/CRWN-Clothing/shop/:category" element={<CategoryExpanded category={browsedCategory}/>}></Route>
          <Route path="/CRWN-Clothing/about" element={<Home/>} />
          <Route path="/CRWN-Clothing/sign-in" element={<SignIn/>}/>
          <Route path="/CRWN-Clothing/sign-up" element={<Signup/>}/>
          <Route path="/CRWN-Clothing/logout" element={<Logout/>}/>
          <Route path="/CRWN-Clothing/checkout" element={<Checkout/>}/>
          <Route path="/CRWN-Clothing/cart" element={<ViewCart/>}/>
      </Routes>
      {scrollButton ? <BackToTop/> : null}
      <Footer/>
    </div>
  )
}

export default App;