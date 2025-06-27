import React from 'react'
import './Soft.css'
import soft from '../../../Assets/soft.png';

import tag from '../../../Assets/tag.png';

import duration from '../../../Assets/duration.png';
const Soft = () => {
  return (
    <div className='Soft'>
      <h1>Soft skills book</h1>
      <div className="books_2">
        <div className="book_2">
          <img className='cover' src={soft} alt="E-business" />
          <div className="duratiions">
            <p><img src={tag} alt="Tag" />  Design</p>
            <p><img src={duration} alt="Duration" /> 300 pages</p>
          </div>
          <h4>soft skills book</h4>
          <p>
            2015, E-Business Bookstore, New York City.
            Available in paperback, hardcover, and e-book formats.
          </p>

        </div>
      </div>
    </div>
  )
}

export default Soft
