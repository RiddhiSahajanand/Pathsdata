import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Logout from '../Modal/Logout/Logout';

export const DefaultLayout = () => {

    const navigate = useNavigate();
    // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");

    // useEffect(() => {
    //     if (!token) {
    //         navigate("/signin");
    //     }
    // }, [token]);

    const token = localStorage.getItem("jwt_token");

    // useEffect(() => {
    //     if (!token) {
    //         navigate("/sign-in");
    //     }
    // }, [token]);

    const [mobileToggle, setMobileToggle] = useState(false);


    const [show, setShow] = useState(false);

    const handleLogout = async () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const confirmLogout = () => {
        localStorage.removeItem("jwt_token");
        localStorage.setItem("openCloudOption", false);
        navigate("/sign-in");
    }

    return (
        <div className="layout">
            <section className="main-section">
                <div className="layout has-sidebar fixed-sidebar fixed-header">
                    <Sidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                    <div className="layout">
                        <main className="content">
                            <div>
                                <Header mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} handleLogout={handleLogout} />

                                <div className='outlet'>
                                    <Outlet />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <Logout show={show} handleClose={handleClose} handleLogout={confirmLogout} />

        </div>
    )
}

export const HomeLayout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("jwt_token");

    // useEffect(() => {
    //     if (!token) {
    //         navigate("/sign-in");
    //     }
    // }, [token]);

    const [mobileToggle, setMobileToggle] = useState(false);

    return (
        <div className="layout">
            <section className="main-section">
                <div className="layout has-sidebar fixed-sidebar fixed-header">
                    <Sidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />

                    <div className="layout">
                        <main className="content">
                            <div>
                                <Header mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
                                <div className='outlet'>
                                    <Outlet />
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}

