import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import notification from "../../assets/images/notification.png";
import notification1 from "../../assets/images/notification1.png";
import user from "../../assets/images/user.png";
import user1 from "../../assets/images/user1.png";
import dummyuser from '../../assets/images/dummy-user.jpg';
import bottomarrow from "../../assets/images/bottom-arrow.png";
import search from "../../assets/images/search.png";
import "./Header.css";
import { useState } from 'react';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const Header = ({ mobileToggle, setMobileToggle, handleLogout }) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [headerTitle, setHeaderTitle] = useState('');
    const [profileData, setProfileData] = useState({});
    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        let name = "";

        if (pathname === "/dashboard") {
            name = "Hello John";
        }
        else if (pathname === "/home" || pathname === "/home2") {
            name = "Home";
        }
        else if (pathname === "/new/home") {
            name = "Home";
        }
        else if (pathname === "/vpc" || pathname === "/add-vpc" || pathname === "/edit-vpc") {
            name = "Cloud Resource";
        }
        else if (pathname === "/resourcesIAM" || pathname === "/add-resourcesIAM" || pathname === "/edit-resourcesIAM") {
            name = "Cloud Resource";
        }
        else if (pathname === "/credential-configure" || pathname === "/add-credential-configure" || pathname === "/edit-credential-configure") {
            name = "Cloud Resource";
        }
        else if (pathname === "/cluster" || pathname === "/add-cluster" || pathname === "/edit-cluster" || pathname === "/cluster-details") {
            name = "Cluster";
        }
        else if (pathname === "/data-catalog" || pathname === "/create-data-source") {
            name = "Data Source";
        }
        else if (pathname === "/database") {
            name = "Data Source";
        }
        else if (pathname === "/table-list") {
            name = "Data Source";
        }
        else if (pathname === "/table-details") {
            name = "Data Source";
        }
        else if (pathname === "/contact-us") {
            name = "Contact Us";
        }
        else if (pathname === "/user-management" || pathname === "/add-member") {
            name = "User Management";
        }
        else if (pathname === "/family" || pathname === "/add-family" || pathname === "/edit-family") {
            name = "Family";
        }
        else if (pathname === "/organization" || pathname === "/add-organization" || pathname === "/edit-organization" || pathname === "/organization-dash" ||  pathname.startsWith("/organization-dash")) {
            name = "Organization";
        }
        else if (pathname === "/subscription-list" || pathname === "/subscription-upgrade") {
            name = "Subscription";
        }
        else if (pathname === "/setting") {
            name = "Setting ";
        }

        setHeaderTitle(name)
    }, [pathname]);

    // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");
    //

    // const handleLogout = () => {
    //     // try {
    //     //     const res = await Axios.get(`/auth/logout`, {
    //     //         headers: {
    //     //             Authorization: `Bearer ${token}`,
    //     //             "Content-Type": "application/json"
    //     //         }
    //     //     });

    //     //     if (res.data?.status) {
    //     //         toast.success(res.data?.message);

    //     //         localStorage.removeItem("user-signup-token");
    //     //         localStorage.removeItem("user-signin-token");
    //     //         navigate("/signin");
    //     //     }
    //     //     else {
    //     //         toast.error(res.data.message);
    //     //     }
    //     // } catch (err) {
    //     //     // console.error(err);

    //     //     if (err?.response?.data?.status === false) {
    //     //         toast.error(err?.response?.data?.message);

    //     //         localStorage.removeItem("adminToken");
    //     //         navigate("/signin");
    //     //     }

    //     // }

    //     // localStorage.removeItem("user-signup-token");
    //     // localStorage.removeItem("user-signin-token");


    //     navigate('/signin');
    // }

    const resizeBase64Image = (base64String, width, height) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64String;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL());
            };
        });
    };

    const GetProfileData = async () => {
        try {
            const res = await Axios.get(`/profile`, authorizationHeaders());
            // console.log('====================================');
            // console.log("res", res);
            // console.log('====================================');
            if (res?.data?.statusCode === 200) {
                setProfileData(res?.data?.data);
                // console.log("res?.data?.data?.image_base64_value", res?.data?.data?.image_base64_value);

                const resizedImage = await resizeBase64Image(
                    res?.data?.data?.image_base64_value?.replace("dataimage", "data:image").replace("base64/", "base64,"),
                    150, // Desired width
                    150  // Desired height
                );
                // profile.resizedImage = resizedImage; // Save resized image
                console.log("resizedImage", resizedImage);
                setProfileImage(resizedImage);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error Profile++", err);
            if (err?.message === "Network Error") {
                setError(err.message);
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        }
    }

    useEffect(() => {
        GetProfileData();
    }, []);

    return (
        <header className="admin-header nav navbar navbar-expand-xl navbar-light iq-navbar">
            <div className="container-fluid navbar-inner p-0">
                <h5 className="site-menu-title mb-0">
                    {headerTitle}
                </h5>

                <div className="d-flex align-items-center ">
                    <form className="form d-none d-md-block row" role="search" >
                        <div className="pseudo-search col-md- col-lg-10 col-xl-12">
                            {/* <div className='me-1'>
                                <img src={search} alt="" />
                            </div> */}
                            <button className="fa fa-search" type="submit" />

                            <input type="text" placeholder="Search..." autoFocus required />
                        </div>
                    </form>

                    <ul className="mb-2 navbar-nav navbar-list mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link d-flex align-items-center position-relative ps-2 ps-md-3 p-0 profile"
                                href="#"
                                id="profile-dropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {/* {profileData?.image_base64_value ? (
                                    <img
                                        src={profileImage}
                                        alt="User Profile"
                                        style={{ width: "150px", height: "150px", borderRadius: "50%" }} />) : */}
                                <img
                                    src={dummyuser}
                                    className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded rounded-circle logo"
                                    loading="lazy"
                                />
                                {/* } */}
                                {profileData?.name}
                                <img
                                    src={bottomarrow}
                                    className='profile-arrow'
                                />
                            </Link>

                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profile-dropdown">
                                {/* <li>
                                    <Link className="dropdown-item" style={{ fontWeight: "500" }} to="/admin/profile">
                                        Profile
                                    </Link>
                                </li> */}
                                <li>
                                    <button className="dropdown-item" onClick={() => handleLogout()}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="mb-2 navbar-nav navbar-list mb-lg-0">
                        <li className="nav-item dropdown ps-2 ps-md-3 ">
                            <div
                                className="nav-link d-flex align-items-center position-relative notification"
                                href="#"
                                // id="language-dropdown"
                                role="button"
                                // data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    // src="/Images/english.png"
                                    // alt="Country"
                                    src={notification1}
                                    // alt={selectedLanguage?.name}
                                    // style={{
                                    //     width: "43px",
                                    //     height: "43px"
                                    // }}
                                    className="theme-color-default-img img-fluid avatar avatar-40 avatar-rounded"
                                    loading="lazy"
                                />
                            </div>

                            {/* <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="language-dropdown" style={{ minWidth: 'max-content' }}>
                                <li>
                                    <div className="dropdown-item" style={{ fontWeight: "500" }} >
                                        <div className="d-flex d-flex align-items-center">
                                            <img
                                                src="/Images/english.png"
                                                alt=""
                                                className='me-2'
                                                style={{ width: '25px', height: '25px' }} />
                                            English
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown-item" style={{ fontWeight: "500" }} >
                                        <div className="d-flex d-flex align-items-center">
                                            <img
                                                src="/Images/arabic.png"
                                                alt=""
                                                className='me-2'
                                                style={{ width: '25px', height: '25px' }} />
                                            Arabic
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="dropdown-item" style={{ fontWeight: "500" }} >

                                        <div className="d-flex d-flex align-items-center">
                                            <img
                                                src="/Images/kurdish.png"
                                                alt=""
                                                className='me-2'
                                                style={{ width: '25px', height: '25px' }} />
                                            Kurdish
                                        </div>
                                    </div>
                                </li>
                            </ul> */}
                        </li>
                    </ul>
                </div>

                <button id="btn-toggle" className="border-0 sidebar-toggler break-point-md btn-line ms-3" onClick={() => setMobileToggle(!mobileToggle)}>
                    <i className="ri-menu-line ri-xl" />
                </button>
            </div>
        </header>
    )
}

export default Header;

