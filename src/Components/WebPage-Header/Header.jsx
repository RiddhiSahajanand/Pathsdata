// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import './Header.css';
// import logo from '../../assets/images/logo.png';

// const Header = ({ scrollToSection }) => {
//     const navigate = useNavigate();

//     const handleNavigation = (sectionId) => {
//         if (location.pathname === '/') {
//             scrollToSection(sectionId);
//         } else {
//             navigate("/");
//         }
//     };

//     return (
//         <>

//             {/* ---- Header Start ---- */}
//             <header className='webpage-header'>
//                 <nav className="navbar navbar-expand-lg">
//                     <div className="container-fluid">

//                         <div className='navbar-brand pt-0'>
//                             <Link to="/">
//                                 <div className='logo'>
//                                     <img src={logo} alt="" />
//                                 </div>
//                             </Link>
//                         </div>

//                         <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" aria-expanded="false" aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon"></span>
//                         </button>

//                         <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
//                             <div className="offcanvas-header">
//                                 <div className='navbar-brand'>
//                                     <Link to="/">
//                                         {/* <div className='logo'>Logo</div> */}
//                                         <img src={logo} alt="" />
//                                     </Link>
//                                 </div>
//                                 <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                             </div>
//                             <div className="offcanvas-body">
//                                 <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
//                                     <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
//                                         {/* <Link className="nav-link" onClick={() => scrollToSection('features')}>Features </Link> */}
//                                         <p className="nav-link text-white mt-2" style={{ fontSize: '16px', marginRight: '20px', cursor: 'pointer' }} onClick={() => handleNavigation("features")}>Features</p>

//                                     </li>
//                                     <li className="nav-item mb-2 mb-lg-0 ml-5" data-bs-dismiss="offcanvas">
//                                         <p className="nav-link text-white mt-2" style={{ fontSize: '16px', marginRight: '10px', cursor: 'pointer' }} onClick={() => handleNavigation("contact")}>Contacts</p>
//                                     </li>
//                                     <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas" >
//                                         <Link to="/blog" className="nav-link">Blogs</Link>
//                                     </li>
//                                 </ul>

//                                 <div className='grop-btn d-lg-flex align-items-lg-center'>
//                                     <Link
//                                         to="https://app.usemotion.com/meet/dhruvil-shah-hqvx/meeting"
//                                         target='_blank'
//                                         className='main-button book-btn'
//                                     >
//                                         Book a Demo
//                                     </Link>

//                                     <Link
//                                         to="/sign-in"
//                                         className='main-button login-btn ms-lg-3'
//                                     >
//                                         Login
//                                     </Link>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//             </header>
//             {/* ---- Header End ---- */}

//         </>
//     )
// }

// export default Header
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = ({ scrollToSection }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');

    const handleNavigation = (sectionId) => {
        setActiveItem(sectionId);
        if (location.pathname === '/') {
            scrollToSection(sectionId);
        } else if (sectionId === "blog") {
            navigate("/blog");
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <header className='webpage-header'>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className='navbar-brand pt-0'>
                            <Link to="/">
                                <div className='logo'>
                                    <img src={logo} alt="Logo" />
                                </div>
                            </Link>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions">
                            <div className="offcanvas-header">
                                <div className='navbar-brand'>
                                    <Link to="/">
                                        <img src={logo} alt="Logo" />
                                    </Link>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                                    <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                        <p
                                            className={`nav-link mt-2 ${activeItem === 'features' ? 'text-active' : 'text-white'}`}
                                            style={{ fontSize: '16px', marginRight: '20px', cursor: 'pointer' }}
                                            onClick={() => handleNavigation("features")}
                                        >
                                            Features
                                        </p>
                                    </li>
                                    <li className="nav-item mb-2 mb-lg-0 ml-5" data-bs-dismiss="offcanvas">
                                        <p
                                            className={`nav-link mt-2 ${activeItem === 'contact' ? 'text-active' : 'text-white'}`}
                                            style={{ fontSize: '16px', marginRight: '10px', cursor: 'pointer' }}
                                            onClick={() => handleNavigation("contact")}
                                        >
                                            Contacts
                                        </p>
                                    </li>
                                    <li className="nav-item mb-2 mb-lg-0 ml-5" data-bs-dismiss="offcanvas">
                                        <p
                                            className={`nav-link mt-2 ${activeItem === 'blog' ? 'text-active' : 'text-white'}`}
                                            style={{ fontSize: '16px', marginRight: '10px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setActiveItem("blog")
                                                navigate("/blog")
                                            }}>
                                            Blogs
                                        </p>
                                    </li>
                                    {/* <li className="nav-item mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                        <Link
                                            to="/blog"
                                            className={`nav-link ${location.pathname === '/blog' ? 'text-active' : 'text-white'}`}
                                            onClick={() => setActiveItem('blog')}>
                                            Blogs
                                        </Link>
                                    </li> */}
                                </ul>

                                <div className='grop-btn d-lg-flex align-items-lg-center'>
                                    <Link
                                        to="https://app.usemotion.com/meet/dhruvil-shah-hqvx/meeting"
                                        target='_blank'
                                        className='main-button book-btn'>
                                        Book a Demo
                                    </Link>

                                    <Link
                                        to="/sign-in"
                                        className='main-button login-btn ms-lg-3'>
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;
