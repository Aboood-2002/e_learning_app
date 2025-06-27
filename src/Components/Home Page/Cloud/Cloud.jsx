import React from 'react'
import './Cloud.css'
import fiftyK from '../../../Assets/15k.png'
import sixtyK from '../../../Assets/16k.png'
import twitysixK from '../../../Assets/26k.png'
import thertyfiveK from '../../../Assets/35k.png'
import sevintfiveK from '../../../Assets/75k.png'
import file from '../../../Assets/file.png'
import calender from '../../../Assets/calender.png'
import people from '../../../Assets/people.png'
import buble from '../../../Assets/buble.png'
import bubleo from '../../../Assets/bubleo.png'
import video from '../../../Assets/video.png'
import squarblue from '../../../Assets/squarblue.png'
import squargreen from '../../../Assets/squargreen.png'
const Cloud = () => {
  return (
    <div className='cloud'>
        <div className="achivement">
            <img src={fiftyK} alt="" />
            <img src={sixtyK} alt="" />
            <img src={twitysixK} alt="" />
            <img src={thertyfiveK} alt="" />
            <img src={sevintfiveK} alt="" />
        </div>

        <h4><span>All-In-One </span>Cloud Software.</h4>
      <div className="cardat">
        <div className="card1">
            <img src={file} alt="" />
            <h6>Online Billing, Invoicing, & Contracts</h6>
            <p>Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts</p>
        </div>
        <div className="card2">
            <img src={calender} alt="" />
            <h6>Easy Scheduling & Attendance Tracking</h6>
            <p>Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance</p>
        </div>
        <div className="card3">
            <img src={people} alt="" />
            <h6>Customer Tracking</h6>
            <p>Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization </p>
        </div>
      </div>

      <h1> <span>What is </span>FCI ONLINE</h1>
      <p>It is a distance learning platform that aims to enable the student to receive accredited courses from the Faculty of Computers and Information, Suez Canal University.</p>
      <div className="fci"> <div className="para">
      <img className='buble' src={buble} alt="" />
        <h5>Everything you can do in a physical classroom, <span>you can do with FCI ONLINE</span> </h5>
        <p>The platform offers you lecturers and assistants at the highest professional level, while you are in the classroom directly</p>
        <img className='bubleo' src={bubleo} alt="" />
      </div>
        <div className="imgy">
            <img className='squarblue' src={squarblue} alt="" />
            <img className='video' src={video} alt="" />
            <img className='squargreen' src={squargreen} alt="" /> 
        </div>
      </div>
    </div>
  )
}

export default Cloud
