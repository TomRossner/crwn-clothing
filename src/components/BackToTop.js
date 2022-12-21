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
    <BiChevronUpCircle onClick={handleClick} className='back-to-top-button'></BiChevronUpCircle>
  )
}

export default BackToTop;