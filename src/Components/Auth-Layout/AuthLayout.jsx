import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const AuthLayout = () => {

    const navigate = useNavigate();
    // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");

    const token = localStorage.getItem("jwt_token");

    useEffect(() => {
        if (token) {
            // navigate("/home");
        }
    }, [token]);


    return (
        <>

            <div className="auth-layout">
                <Outlet />
            </div>

        </>
    )
}

export default AuthLayout