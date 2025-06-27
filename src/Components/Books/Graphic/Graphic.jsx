import React from 'react'
import './Graphic.css'
import uiux from '../../../Assets/uiux.png';
import adobe from '../../../Assets/adobe.png';
import tag from '../../../Assets/tag.png';
import duration from '../../../Assets/duration.png';
const Graphic = () => {
  return (
    <div className='Graphic'>
      <h1><span>Graphic</span>design book</h1>
       <div className="books_1">
                      <div className="book_1">
                          <img className='cover' src={uiux} alt="E-business" />
                          <div className="duratiions">
                              <p><img src={tag} alt="Tag" />  Design</p>
                              <p><img src={duration} alt="Duration" /> 300 pages</p>
                          </div>
                          <h4>UI UX DESIDNs</h4>
                            <p>Simply put, user experience design is the process of planning the experience a person has when they interact with a product</p>
                      </div>
      
                      <div className="book_1">
                          <img className='cover' src={adobe} alt="E-commerce" />
                          <div className="duratiions">
                              <p><img src={tag} alt="Tag" /> Design</p>
                              <p><img src={duration} alt="Duration" /> 300 pages</p>
                          </div>
                          <h4>Adobe Photoshop </h4>
                            <p>Be innovative and creative by creating your own identity . </p>
                      </div>
                  </div>
    </div>
  )
}

export default Graphic
