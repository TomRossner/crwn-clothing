import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-container'>
        <div className='not-found-headers'>
            <h1>404 Not Found</h1>
            <h3>Oops... something went wrong...</h3>
        </div>
        <Link to="/CRWN-Clothing/" className='btn link white'>Back to the homepage</Link>
    </div>
  )
}

export default NotFound;