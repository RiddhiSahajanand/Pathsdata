import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/logo.png';

const Footer = ({ scrollToSection }) => {
    return (
        <>
            {/* ---- Footer Start ---- */}
            <footer>
                <div className='first d-flex justify-content-between align-items-center'>
                    <div className="logo">
                        {/* <div className='logo'>Logo</div> */}
                        <img src={logo} alt="" />
                    </div>

                    <div className="menu d-flex me-md-auto flex-wrap">
                        <ul className="d-flex flex-wrap">
                            <li className="mb-2 mb-lg-0" style={{ marginTop: '10px' }}>
                                <Link className="" onClick={() => scrollToSection('features')}>Features</Link>
                            </li>
                            <li className="mb-2 mb-lg-0 " style={{ marginTop: '10px' }}>
                                <Link className="" onClick={() => scrollToSection('contact')}>Contacts</Link>
                            </li>
                            <li className="mb-2 mb-lg-0 " style={{ marginTop: '10px' }}>
                                <Link to={'/blog'} className="">Blogs</Link>
                            </li>
                        </ul>
                    </div>

                    <Link
                        to="https://app.usemotion.com/meet/dhruvil-shah-hqmeetingvx/"
                        target='_blank'
                        className='main-button book-btn'>
                        Book a Demo
                    </Link>
                </div>

                <p className='text-center mt-4'>
                    © Copyright 2025 - PATHSDATA | <Link to={"/privacy-policy"} className='text-white'>  Privacy Policy </Link>
                </p>
            </footer>
            {/* ---- Footer End ---- */}
        </>
    )
}

export default Footer