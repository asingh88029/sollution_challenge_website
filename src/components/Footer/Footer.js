import React from "react";
import "./Footer.css";
import { FaFacebook } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { FaTwitter } from 'react-icons/fa'
import { ImWhatsapp } from 'react-icons/im'
import { BsLinkedin } from 'react-icons/bs'
// import astore from './../../image/a_store.png'
// import gplay from './../../image/g_play.png'


function Footer() {
    return (
        <div className="main-footer">
            <div className="footer_container">
                <div className="footer_col1">
                    <div className="footer_row1">
                        <div>
                            <strong>Follow Us: </strong>
                        </div>
                        <div className="footer_icon">
                            <div><FaFacebook /></div>
                            <div><GrInstagram /></div>
                            <div><FaTwitter /> </div>
                            <div><ImWhatsapp /></div>
                            <div><BsLinkedin /></div>
                        </div>
                    </div>
                    <div className="footer_row2">
                        <strong>Info</strong>
                        <strong>Contact us</strong>
                        <strong>Support</strong>
                        <strong>Services</strong>
                        <strong>FAQs</strong>
                    </div>
                    <div className="footer_row3">
                        <div className="footer_play-store">
                            {/* <img width='100px' src={gplay} /> */}
                        </div>
                        <div className="footer_app-store">
                            {/* <img width='100px' src={astore} /> */}
                        </div>
                    </div>
                    <div className="footer_row4">
                        <strong>Terms  and  Condition</strong>
                    </div>
                </div>
                <div className="footer_col2">
                    <hr style={{width: "90vw"}} />
                    <div className="footer_row5">
                        <p className="footer_col-sm">
                            &copy;{new Date().getFullYear()} COPYRIGHT All right reserved | Privacy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;