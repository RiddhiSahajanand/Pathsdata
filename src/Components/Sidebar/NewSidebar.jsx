import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RiArticleFill } from 'react-icons/ri';
// import dashboard from "../../assets/images/dashboard.png";
// import cloudresource from "../../assets/images/cloudresource.png";
// import datacatalog from "../../assets/images/datacatalog.png";
// import usermanagement from "../../assets/images/usermanagement.png";
// import setting from "../../assets/images/setting.png";
// import Usermanagement from "../../assets/images/User-management.png";

import whatsnew from "../../assets/images/whatsnew.png";
import rightarrow from "../../assets/images/right-arrow.png";
import bottomarrow from "../../assets/images/bottom-arrow.png";
import "./Sidebar.css";
 
import logo from "../../assets/images/sidebar/logo.png";
import dashboard from "../../assets/images/sidebar/dashboard.png";
import cloudresource from "../../assets/images/sidebar/cloud-resource.png";
import datacatalog from "../../assets/images/sidebar/data-catalog.png";
import user from "../../assets/images/sidebar/user.png";
import family from "../../assets/images/sidebar/family.png";
import organization from "../../assets/images/sidebar/organization.png";
import billing from "../../assets/images/sidebar/billing.png";
import setting from "../../assets/images/sidebar/setting.png";
import clustoricon from "../../assets/images/sidebar/clustor-icon.png";


import whats from "../../assets/images/sidebar/whats.png";
import logout from "../../assets/images/sidebar/logout.png";
import Logout from '../Modal/Logout/Logout';

const NewSidebar = ({ mobileToggle, setMobileToggle }) => {

    const navigate = useNavigate();
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const [openMenu, setOpenMenu] = useState(null);
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleSidebarDismiss = () => {
        if (window.innerWidth <= 767) {
            setMobileToggle(!mobileToggle);
        }
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const toggleSubMenu = (subMenu) => {
        setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
    };


    const handleLogout = () => {
        localStorage.removeItem("jwt_token")
        navigate("/sign-in");
    }

    return (
        <>
            <aside id="sidebar" className={`sidebar break-point-md has-bg-image ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
                {/* <Link id="btn-collapse" className={`sidebar-collapser`} onClick={() => setSidebarToggle(!sidebarToggle)}>
                    <i className="ri-arrow-left-s-line" />
                </Link> */}
                <div className="sidebar-layout">
                    <div className="sidebar-header">
                        <span className="pro-sidebar-logo">
                            <img src={logo} alt="" />
                        </span>
                        <span className="menu-title">PATHSDATA</span>
                    </div>



                    <nav className="menu open-current-submenu">
                        <ul>

                            <li className="menu-item">
                                <NavLink to="/new/home" className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={dashboard} alt="" />
                                    </span>
                                    <span className="menu-title" onClick={() => toggleMenu("home")}>Home</span>
                                </NavLink>
                            </li>

                            <li className="menu-item">
                                <NavLink to="/new/family" className={`menu-link d-flex align-items-center`}
                                    onClick={handleSidebarDismiss}
                                >
                                    <span className="menu-icon">
                                        <img src={family} alt="" />
                                    </span>
                                    <span className="menu-title" onClick={() => toggleMenu("family")}>Family</span>
                                </NavLink>
                            </li>

                            <li className="menu-item">
                                <NavLink to="/new/organization" className={`menu-link d-flex align-items-center`}
                                    onClick={handleSidebarDismiss}
                                >
                                    <span className="menu-icon">
                                        <img src={organization} alt="" />
                                    </span>
                                    <span className="menu-title" onClick={() => toggleMenu("organization")}>Organization</span>
                                </NavLink>
                            </li>

                            <li className="menu-item">
                                <Link
                                    // to="/billing"
                                    className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={billing} alt="" />
                                    </span>
                                    <span className="menu-title">Billing</span>
                                </Link>
                            </li>

                            <li className="menu-item">
                                <Link
                                    // to="/setting"
                                    className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={setting} alt="" />
                                    </span>
                                    <span className="menu-title">Setting</span>
                                </Link>
                            </li>


                            {/* <li className="menu-item">
                                <Link
                                    // to="/sign-in"
                                    className="d-flex align-items-center"
                                    onClick={() => setShow(true)}
                                >
                                    <span className="menu-icon">
                                        <img src={logout} alt="" />
                                    </span>
                                    <span className="menu-title">Logout</span>
                                </Link>
                            </li> */}
                        </ul>
                    </nav>


                </div>
                {/* <Logout show={show} handleLogout={handleLogout} handleClose={handleClose} /> */}
            </aside>

        </>
    )
}

export default NewSidebar;


