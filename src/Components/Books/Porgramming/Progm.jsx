import React from 'react'
import './Progm.css'
import tag from '../../../Assets/tag.png';
import duration from '../../../Assets/duration.png';
import C from '../../../Assets/C.png'
import Cpluse from '../../../Assets/c++.png';
import Dart from '../../../Assets/dart.png';
import Python from '../../../Assets/python.png';
const Progm = () => {
    return (
        <div className='progm'>
            <h1><span>pro</span>gramming book</h1>
            <div className="books">
                <div className="book">
                    <img className='cover' src={C} alt="" />
                    <div className="duratiions">
                        <p> <img src={tag} alt="" />Introduction in C </p>
                        <p><img src={duration} alt="" />300 bage</p>
                    </div>
                    <h4>Programming book</h4>
                    <p>C is a general purpose programming language created by Dennis Ritchie at the Bell Laboratories in 1972 .</p>
                </div>
                <div className="book">
                    <img className='cover' src={Cpluse} alt="" />
                    <div className="duratiions">
                        <p> <img src={tag} alt="" />Introduction in C++ </p>
                        <p><img src={duration} alt="" />300 bage</p>
                    </div>
                    <h4>Programming book</h4>
                    <p>C++ is a leading programming language used in game development, virtual reality, real-time simulation and high-frequency trading, where efficiency and speed matter.</p>
                </div>
                <div className="book">
                    <img className='cover' src={Dart} alt="" />
                    <div className="duratiions">
                        <p> <img src={tag} alt="" />Introduction in Dart </p>
                        <p><img src={duration} alt="" />300 bage</p>
                    </div>
                    <h4>Programming book</h4>
                    <p>Dart is an approachable, portable, and productive language for high-quality apps on any platform.</p>
                </div>
                <div className="book">
                    <img className='cover' src={Python} alt="" />
                    <div className="duratiions">
                        <p> <img src={tag} alt="" />Introduction in python </p>
                        <p><img src={duration} alt="" />300 bage</p>
                    </div>
                    <h4>Programming book</h4>
                    <p>Python is a popular programming language. Python can be used on a server to create web applications.</p>
                </div>
            </div>
        </div>
    )
}

export default Progm
