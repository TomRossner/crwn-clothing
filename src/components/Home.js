import React from 'react';
import Categories from './Categories';

const Home = ({setBrowsedCategory}) => {
  return (
    <div className='home-container'>
      <h1>Be the King.</h1>
      <Categories setBrowsedCategory={setBrowsedCategory}/>
    </div>
  )
}

export default Home