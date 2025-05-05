
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import emailIcon from "../../../assets/images/auth-modal.png";
import { useNavigate } from 'react-router-dom';

export const AuthModalSignIn = ({ show, handleClose }) => {

    const navigate = useNavigate();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="auth-modal text-center">
                <img src={emailIcon} className='email-icon' />

                <div className="content text-center">
                    <span className="title">
                        {/* Register user not Found */}
                        Register User Not Found
                    </span>

                    <p>
                        No worries! Go to Sign up page now and create your account to start your journey with us today."
                    </p>

                    <button
                        type="button"
                        className="sign-btn w-100"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export const AuthModalSignUp = ({ show, handleClose }) => {

    const navigate = useNavigate();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="auth-modal text-center">
                <img src={emailIcon} className='email-icon' />

                <div className="content text-center">
                    <span className="title">
                        Email Already Exist
                    </span>

                    <p>
                        This email is already registered! Sign in now  to continue your journey and access your account instantly.
                    </p>

                    <button
                        type="button"
                        className="sign-btn w-100"
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </Modal>
    );
};
