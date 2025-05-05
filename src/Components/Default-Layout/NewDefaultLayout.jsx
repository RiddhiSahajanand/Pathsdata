import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import NewSidebar from '../Sidebar/NewSidebar';

export const NewDefaultLayout = () => {

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

    return (
        <div className="layout">
            <section className="main-section">
                <div className="layout has-sidebar fixed-sidebar fixed-header">
                    <NewSidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />

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
