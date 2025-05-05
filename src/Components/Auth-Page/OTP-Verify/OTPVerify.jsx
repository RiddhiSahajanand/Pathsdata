import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Axios } from '../../../helper/Axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
    email_id: "",
    otp: ""
}

const OTPVerify = ({ step, setStep, role }) => {

    const navigate = useNavigate();
    const Email = localStorage.getItem("email");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();

        setLoading(true);


        // if (role === "signup") {
        //     setStep(3); // WorkSpace pass
        // }

        // if (role === "signin") {
        // navigate("/create-profile")
        // }

        const data = { ...formData, email_id: Email };

        try {
            const res = await Axios.post(`/auth/verify_otp`, data);

            console.log("verify_otpres", res);

            if (res.status === 201) {
                navigate("/create-profile")
                toast.success(res?.data?.message)
            } else if (res.status === 200) {
                localStorage.setItem("jwt_token", res.data.jwt_token)
                localStorage.setItem("openCloudOption", false);
                toast.success(res?.data?.message)
                navigate("/home")
            }

            // toast.success(res?.data?.message);

            // setFormData(initialState);

            // if (role === "signup") {
            //     // localStorage.setItem("signup-tenantid", res.data.tenant_id)
            //     setStep(3); // WorkSpace pass
            // }

            // if (role === "signin") {
            //     // localStorage.setItem("signin-tenantid", res.data.tenant_id)                 

            //     if (res?.data?.jwt_token) {
            //         localStorage.setItem("jwt_token", res.data.jwt_token)
            //         navigate("/new/home")
            //     } else {
            //         navigate("/create-profile")
            //     }
            // }

            else {
                toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error Otp-Verify++", err);

            if (err?.message === "Network Error") {
                toast.error(err?.message);
            } else if (err.status === 400) {
                toast.error(err?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div className="header">
                <h4>Verify OTP</h4>

                <p>
                    Reclaim control of your data with confidence. <br />
                    Secure, seamless, and built to empower you every <br />
                    step of the way.
                    {/* You have received OTP on abc@gmail.com */}
                </p>
            </div>

            <form
                // onSubmit={(e) => handleContinue(e, 3)}
                onSubmit={handleOtpVerify}
            >
                <div className="mb-4">
                    <label htmlFor="otp" className="form-label">
                        Email OTP
                    </label>
                    <input
                        type="text"
                        pattern='\d*'
                        maxLength={16}
                        name="otp"
                        id="otp"
                        className="form-control"
                        placeholder="Please enter email OTP"
                        value={formData?.otp}
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
            </form>

        </>
    )
}

export default OTPVerify




