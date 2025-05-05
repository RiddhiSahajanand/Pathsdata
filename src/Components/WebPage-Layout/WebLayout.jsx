import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../WebPage-Header/Header';
import Footer from '../WebPage-Footer/Footer';

const WebLayout = () => {

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>

            <div className="web-page">
                <Header scrollToSection={scrollToSection} />
                <Outlet />
                <Footer scrollToSection={scrollToSection} />
            </div>

        </>
    )
}

export default WebLayout;