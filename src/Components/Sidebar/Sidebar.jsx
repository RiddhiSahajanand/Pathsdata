// NEw Try

import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import rightarrow from "../../assets/images/right-arrow.png";
import bottomarrow from "../../assets/images/bottom-arrow.png";
import setting from "../../assets/images/sidebar/setting.png";
import logout from "../../assets/images/sidebar/logout.png";
import "./Sidebar.css";
import whatsnew from "../../assets/images/whatsnew.png";
import sidebarlogo from "../../assets/images/sidebar/logo.png";
import logo from '../../assets/images/logo.png';
import logo1 from '../../assets/images/logo1.png';
import dashboard from "../../assets/images/sidebar/dashboard.png";
import cloudresource from "../../assets/images/sidebar/cloud-resource.png";
import datacatalog from "../../assets/images/sidebar/data-catalog.png";
import user from "../../assets/images/sidebar/user.png";
import family from "../../assets/images/sidebar/family.png";
import organization from "../../assets/images/sidebar/organization.png";
import billing from "../../assets/images/sidebar/billing.png";
import clustoricon from "../../assets/images/sidebar/clustor-icon.png";
import contacticon from "../../assets/images/sidebar/contact-us.png";
import subscriptionicon from "../../assets/images/sidebar/subscriptionicon.png";
import pathsdataicon from "../../assets/images/pathsdataicon.png";

import whats from "../../assets/images/sidebar/whats.png";


const Sidebar = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const { pathname } = useLocation();
    const openClodeOption = JSON.parse(localStorage.getItem("openCloudOption"));

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const [selectedMenu, setSelectedMenu] = useState("");

    const [sidebarToggle, setSidebarToggle] = useState(false);

    const [openMenu, setOpenMenu] = useState(null);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    useEffect(() => {
        // setOpenMenu("cloud-resource")
    }, [openClodeOption])

    console.log("openClodeOption", openClodeOption);


    const handleSidebarDismiss = () => {
        if (window.innerWidth <= 767) {
            setMobileToggle(!mobileToggle);
        }

        localStorage.setItem("openOrgFamily", false);
        setIsSidebarExpanded(false);
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);

        setIsSidebarExpanded(false);

        localStorage.removeItem("org_id");
        // localStorage.setItem("openCloudOption", false)

    };

    const toggleSubMenu = (menu) => {
        console.log("menu", menu);
        setIsSidebarExpanded(openSubMenu !== menu);

        setOpenSubMenu(openSubMenu === menu ? null : menu);

        // setIsSidebarExpanded(openSubMenu !== menu);
        setSelectedMenu(menu);
    };

    useEffect(() => {
        pathname === "/vpc" || pathname === "/resourcesIAM" ||
            pathname === "/credential-configure" || pathname === "/add-vpc" ||
            pathname === "/edit-vpc" || pathname === "/add-resourcesIAM" ||
            pathname === "/edit-resourcesIAM" || pathname === "/add-credential-configure" ||
            pathname === "/edit-credential-configure" ?
            (
                setSelectedMenu('cloud-resource'),
                setIsSidebarExpanded(true)) :
            pathname === "/data-catalog" || pathname === "/create-data-source" || pathname === "/additional" || pathname === "/credential" || pathname === "/table-details" ?
                (setSelectedMenu('data-catalog'),
                    setIsSidebarExpanded(true)) :
                setIsSidebarExpanded(false)
    })

    return (
        <div className="sidebar-container">
            <div id="sidebar" className={`sidebar break-point-md has-bg-image ${isSidebarExpanded ? "collapsed" : ""}`}>
                <div className="sidebar-layout">
                    <div className="sidebar-header">
                        <div>
                            <img src={sidebarlogo} alt="" className='img-fluid' />
                        </div>
                    </div>

                    <nav className="menu open-current-submenu">
                        <ul>
                            <li className="menu-item">
                                <NavLink
                                    // to="/home"
                                    to={openClodeOption === true ? "/home2" : "/home"}
                                    className={`menu-link d-flex align-items-center`}
                                    onClick={handleSidebarDismiss}
                                >
                                    <span className="menu-icon">
                                        <img src={dashboard} alt="" />
                                    </span>
                                </NavLink>
                            </li>

                            {openClodeOption === false &&
                                <>
                                    <li className="menu-item">
                                        <NavLink
                                            to="/organization"
                                            className={`menu-link d-flex align-items-center ${pathname === "/add-organization" || pathname === "/edit-organization" || pathname.match(/^\/organization-dash\/org-\d+/) ? "active" : ""}`}
                                            onClick={handleSidebarDismiss}
                                        >
                                            <span className="menu-icon" onClick={() => {
                                                toggleMenu("organization")
                                            }}>
                                                <img src={organization} alt="" />
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li className="menu-item">
                                        <NavLink
                                            to="/family"
                                            className={`menu-link d-flex align-items-center ${pathname === "/add-family" || pathname === "/edit-family" ? "active" : ""}`}
                                            onClick={handleSidebarDismiss}
                                        >
                                            <span className="menu-icon" onClick={() => {
                                                toggleMenu("family")
                                            }}>
                                                <img src={family} alt="" />
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            }


                            {openClodeOption === true &&
                                <>
                                    <li className={`menu-item ${openMenu === "cloud-resource" ? "open" : ""}`}>
                                        <NavLink
                                            to="/vpc"
                                            className={`menu-link d-flex align-items-center 
                                                    ${openMenu === "cloud-resource" ||
                                                    pathname === "/vpc" ||
                                                    pathname === "/add-vpc" ||
                                                    pathname === "/edit-vpc" ||
                                                    pathname === "/resourcesIAM" ||
                                                    pathname === "/add-resourcesIAM" ||
                                                    pathname === "/edit-resourcesIAM" ||
                                                    pathname === "/credential-configure" ||
                                                    pathname === "/add-credential-configure" ||
                                                    pathname === "/edit-credential-configure"
                                                    ? "active" : ""
                                                }
                                                `}
                                            onClick={() => toggleSubMenu("cloud-resource")}
                                        >
                                            <span className="menu-icon">
                                                <img src={cloudresource} alt="" />
                                            </span>
                                        </NavLink>
                                    </li>

                                    {/* Data Catalog Dropdown */}
                                    <li className={`menu-item ${openMenu === "data-catalog" ? "open" : ""}`}>
                                        <NavLink
                                            to="/data-catalog"
                                            className={`menu-link d-flex align-items-center 
                                                    ${openMenu === "data-catalog" ||
                                                    pathname === "/data-catalog" ||
                                                    pathname === "/create-data-source" ||
                                                    pathname === "/database" ||
                                                    pathname === "/table-details"
                                                    ? "active" : ""
                                                }
                                                `}
                                            onClick={() => toggleSubMenu("data-catalog")}
                                        >
                                            <span className="menu-icon">
                                                <img src={datacatalog} alt="" />
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li className="menu-item">
                                        <NavLink
                                            to="/cluster"
                                            className={`menu-link d-flex align-items-center 
                                                ${pathname === "/add-cluster" ? "active" : ""}
                                            `}
                                            onClick={handleSidebarDismiss}
                                        >
                                            <span className="menu-icon">
                                                <img src={clustoricon} alt="" />
                                            </span>
                                            <span className="menu-title" onClick={() => toggleMenu("cluster")}>Cluster</span>
                                        </NavLink>
                                    </li>

                                    <li className="menu-item">
                                        <NavLink
                                            to="/user-management"
                                            className={`menu-link d-flex align-items-center ${pathname === "/add-member" ? "active" : ""}`}
                                            onClick={handleSidebarDismiss}
                                        >
                                            <span className="menu-icon">
                                                <img src={user} alt="" />
                                            </span>
                                            <span className="menu-title" onClick={() => toggleMenu("user-management")}>User Management</span>
                                        </NavLink>
                                    </li>
                                </>
                            }


                            <li className="menu-item">
                                <NavLink
                                    to="/subscription-list"
                                    className={`menu-link d-flex align-items-center ${pathname === "/subscription-upgrade" ? "active" : ""}`}
                                    onClick={handleSidebarDismiss}
                                >
                                    <span className="menu-icon">
                                        <img src={subscriptionicon} alt="" height={22} />
                                    </span>

                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <Link
                                    // to="/billing"
                                    className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={billing} alt="" />
                                    </span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <NavLink
                                    to="/setting"
                                    className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={setting} alt="" />
                                    </span>
                                    {/* <span className="menu-title" onClick={() => {
                                                    // localStorage.setItem("openCloudOption", false)
                                                }}>Setting</span> */}
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink to="/contact-us" className={`menu-link d-flex align-items-center`}
                                    onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={contacticon} alt="" height={22} />
                                    </span>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <Link className="d-flex align-items-center" onClick={handleSidebarDismiss}>
                                    <span className="menu-icon">
                                        <img src={whats} alt="" />
                                    </span>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link
                                    // to="/sign-in"
                                    className="d-flex align-items-center"
                                    onClick={() => handleLogout()}>
                                    <span className="menu-icon">
                                        <img src={logout} alt="" />
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


            {/* Second Sidebar (Appears when Cloud Resource is clicked) */}
            {
                isSidebarExpanded && (
                    <>
                        <div className="new-sidebar d-flex flex-column">
                            {/* <div className="sidebar-header">
                                <div className="menu-title">
                                    {
                                        pathname === "/vpc" ||
                                            pathname === "/add-vpc" ||
                                            pathname === "/resourcesIAM" ||
                                            pathname === "/add-resourcesIAM" ||
                                            pathname === "/credential-configure" ||
                                            pathname === "/add-credential-configure"
                                            ? "Cloud Resource" : "Data Catelogue"
                                    }
                                </div>
                            </div> */}

                            <div className="sidebar-menu">
                                <ul>
                                    {selectedMenu === "cloud-resource" ?
                                        <>
                                            <li className="menu-item">
                                                <NavLink
                                                    to="/vpc"
                                                    // to={openClodeOption === true ? "/home2" : "/home"}
                                                    className={`menu-link d-flex align-items-center ${pathname === "/add-vpc" || pathname === "/edit-vpc" ? "active" : ""}`}
                                                // onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-title">Network</span>
                                                </NavLink>
                                            </li>

                                            <li className="menu-item">
                                                <NavLink
                                                    to="/resourcesIAM"
                                                    // to={openClodeOption === true ? "/home2" : "/home"}
                                                    className={`menu-link d-flex align-items-center ${pathname === "/add-resourcesIAM" || pathname === "/edit-resourcesIAM" ? "active" : ""}`}
                                                // onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-title">Cluster Resource IAM</span>
                                                </NavLink>
                                            </li>

                                            <li className="menu-item">
                                                <NavLink
                                                    to="/credential-configure"
                                                    // to={openClodeOption === true ? "/home2" : "/home"}
                                                    className={`menu-link d-flex align-items-center ${pathname === "/add-credential-configure" || pathname === "/edit-credential-configure" ? "active" : ""}`}
                                                // onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-title">Credential Configure</span>
                                                </NavLink>
                                            </li>

                                        </>
                                        :
                                        <>
                                            <li className="menu-item">
                                                <NavLink
                                                    // to="/home"
                                                    to={"/data-catalog"}
                                                    // className={`menu-link d-flex align-items-center`}
                                                    className={`menu-link d-flex align-items-center 
                                                        ${pathname === "/create-data-source" ||
                                                            pathname === "/database" ||
                                                            pathname === "/table-details"
                                                            ? "active" : ""
                                                        }
                                                    `}
                                                // onClick={handleSidebarDismiss}
                                                >
                                                    <span className="menu-title">Data Management</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    }

                                </ul>
                            </div>
                        </div>
                    </>
                )
            }
        </div >
    );
};

export default Sidebar;














