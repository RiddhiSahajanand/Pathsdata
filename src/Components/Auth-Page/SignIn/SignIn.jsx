import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';
import { AuthModalSignIn } from '../../Modal/AuthModal/AuthModal';

const initialState = {
    email_id: "",
}

const SignIn = ({ step, setStep }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

        setFormData(initialState);
    }

    useEffect(() => {
        // setShow(true)
    },)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        // setStep(2);

        try {
            const res = await Axios.post("/auth/signin", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log('====================================');
            console.log(res);
            console.log('====================================');

            if (res.status === 200) {
                toast.success(res?.data?.message);

                setFormData(initialState);
                // localStorage.setItem("token-pathdata", res.data.token);
                // navigate("/home");
                setStep(2); // Otp-Verify pass

                localStorage.setItem("email", formData.email_id);
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error Sign-In++", err);

            if (err?.message === "Network Error") {
                toast.error(err?.message);
            } else if (err?.response?.data?.statusCode === 404) {
                setShow(true);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div className="header">
                <h4>Sign In account</h4>
                <p>
                    Reclaim control of your data with confidence. <br className='d-none d-xl-block' />
                    Secure, seamless, and built to empower you every <br className='d-none d-xl-block' />
                    step of the way.
                </p>
            </div>

            <form
                // onSubmit={(e) => handleContinue(e, 2)}
                onSubmit={handleSignIn}
            >
                <div className="mb-4">
                    <label htmlFor="email_id" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email_id"
                        name="email_id"
                        className="form-control"
                        placeholder="Please enter email"
                        value={formData?.email_id}
                        onChange={handleChange}
                        required
                    />

                    {/* <div
                        style={{
                            position: 'relative'
                        }}
                    >
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Please enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        className={`sign-btn ${loading ? 'loading' : ''} w-100`}
                        disabled={loading}
                    >
                        {
                            loading ? (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                "Continue"
                            )
                        }
                    </button>
                </div>


                {/* {
                    step === 1 && (
                        <div className="mt-5 text-center last">
                            <p>
                                Don’t have an account?
                                <span
                                    className='ms-1 cursor-pointer'
                                    onClick={() => navigate("/sign-up")}
                                // onClick={() => setStep(1)}
                                >
                                    Sign Up
                                </span>
                            </p>
                        </div>
                    )
                } */}

            </form>



            {/* Sign-In-Model */}
            <AuthModalSignIn show={show} handleClose={handleClose} />


        </>
    )
}

export default SignIn