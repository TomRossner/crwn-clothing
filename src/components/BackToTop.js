import React from 'react';
import {BiChevronUpCircle} from "react-icons/bi";

const BackToTop = () => {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
  return (
    <span className='back-to-top-container' onClick={handleClick}><BiChevronUpCircle className='back-to-top-button'></BiChevronUpCircle></span>
  )
}

export default BackToTop;