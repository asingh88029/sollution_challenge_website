import React from 'react'
import Doctor from '../../assets/image/doctor.jpg'
import './DoctorCard.css'

const DoctorCard = () => {
  return (

    <div className="container">
        <div className='doctor-card'>
            <div className="image">
                <img className='doctor-image' src={Doctor} alt="" />
            </div>
            <div className='doctor-info'>
                <h3>Dr. Ankit Kumar</h3>
                <span>Dentist</span>
            </div>
        </div>

        <div className='doctor-card'>
        <div className="image">
            <img className='doctor-image' src={Doctor} alt="" />
        </div>
        <div className='doctor-info'>
            <h3>Dr. Ankit Kumar</h3>
            <span>Dentist</span>
        </div>
        </div>

        <div className='doctor-card'>
        <div className="image">
            <img className='doctor-image' src={Doctor} alt="" />
        </div>
        <div className='doctor-info'>
            <h3>Dr. Ankit Kumar</h3>
            <span>Dentist</span>
        </div>
        </div>

        <div className='doctor-card'>
        <div className="image">
            <img className='doctor-image' src={Doctor} alt="" />
        </div>
        <div className='doctor-info'>
            <h3>Dr. Ankit Kumar</h3>
            <span>Dentist</span>
        </div>
        </div>

        <div className='doctor-card'>
        <div className="image">
            <img className='doctor-image' src={Doctor} alt="" />
        </div>
        <div className='doctor-info'>
            <h3>Dr. Ankit Kumar</h3>
            <span>Dentist</span>
        </div>
        </div>

        <div className='doctor-card'>
        <div className="image">
            <img className='doctor-image' src={Doctor} alt="" />
        </div>
        <div className='doctor-info'>
            <h3>Dr. Ankit Kumar</h3>
            <span>Dentist</span>
        </div>
        </div>
    </div>
    
  )
}

export default DoctorCard
