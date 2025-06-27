import React from 'react';
import './Marketing.css';
import tag from '../../../Assets/tag.png';
import duration from '../../../Assets/duration.png';
import bus from '../../../Assets/bus.png';
import commerce from '../../../Assets/commerce.png';

const Marketing = () => {
    return (
        <div className='Marketing'>
            <h1><span>Mar</span>keting Books</h1>

            <div className="books_1">
                <div className="book_1">
                    <img className='cover' src={bus} alt="E-business" />
                    <div className="duratiions">
                        <p><img src={tag} alt="Tag" /> Introduction to E-business</p>
                        <p><img src={duration} alt="Duration" /> 300 pages</p>
                    </div>
                    <h4>E-business Book</h4>
                    <p>E-business refers to online business processes on the web, internet, extranet, or a combination of these platforms.</p>
                </div>

                <div className="book_1">
                    <img className='cover' src={commerce} alt="E-commerce" />
                    <div className="duratiions">
                        <p><img src={tag} alt="Tag" /> Introduction to E-commerce</p>
                        <p><img src={duration} alt="Duration" /> 300 pages</p>
                    </div>
                    <h4>E-commerce Book</h4>
                    <p>E-commerce involves buying or selling products and services conducted on online platforms or over the Internet.</p>
                </div>
            </div>
        </div>
    );
};

export default Marketing;
