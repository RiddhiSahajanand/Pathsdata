import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Axios } from '../../../helper/Axios';
import { useNavigate } from 'react-router-dom';
import { AuthModalSignUp } from '../../Modal/AuthModal/AuthModal';

const initialState = {
    email_id: "",
    user_details: {
        name: "",
        mobile_number: "",
    },
}

const SignUp = ({ step, setStep }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);

        setFormData(initialState);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email_id") {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                user_details: {
                    ...prev.user_details,
                    [name]: value,
                },
            }));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await Axios.post("/auth/signup", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.status === 200) {
                toast.success(res?.data?.message);

                setFormData(initialState);
                setStep(2); // Otp-Verify pass

                localStorage.setItem("email", formData.email_id);
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error Sign-Up++", err);

            if (err?.message === "Network Error") {
                toast.error(err?.message);
            } else if (err?.response?.data?.statusCode === 409) {
                setShow(true);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div className="header">
                <h4>Sign Up account</h4>

                <p>
                    Reclaim control of your data with confidence. <br className='d-none d-xl-block' />
                    Secure, seamless, and built to empower you every <br className='d-none d-xl-block' />
                    step of the way.
                </p>
            </div>

            <form
                // onSubmit={(e) => handleContinue(e, 2)}
                onSubmit={handleSignUp}
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

                <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Please enter name"
                        value={formData?.user_details?.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobile_number" className="form-label">
                        Mobile
                    </label>
                    <input
                        type="text"
                        pattern='\d*'
                        maxLength={16}
                        id="mobile_number"
                        name="mobile_number"
                        className="form-control"
                        placeholder="Please enter mobile"
                        value={formData?.user_details?.mobile_number}
                        onChange={handleChange}
                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        // className="sign-btn w-100"
                        className={`sign-btn ${loading ? 'loading' : ''} w-100`}
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


                {
                    step === 1 && (
                        <div className="mt-5 text-center last">
                            <p>
                                Already have an account?
                                <span className='ms-1 cursor-pointer'
                                    onClick={() => navigate("/sign-in")}
                                // onClick={() => setStep(0)}
                                >
                                    Sign In
                                </span>
                            </p>
                        </div>
                    )
                }
            </form>


            {/* Sign-Up-Model */}
            <AuthModalSignUp show={show} handleClose={handleClose} />

        </>
    )
}

export default SignUp