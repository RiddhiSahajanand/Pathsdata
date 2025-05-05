import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import close from "../../../assets/images/Close.png";
import "./OTPVerify.css";
import { Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';


const OTPVerify = ({ show, handleClose, email, otpType, setIsEmailVerified, handleSubmit }) => {

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const [errorMessage, setErrorMessage] = useState({
        otp: ""
    })

    const handleModalClose = () => {
        handleClose();
        setOtp(["", "", "", "", "", ""]);
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleChange = (e, index) => {
        const { value } = e.target;

        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== "" && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    }

    const handleOtpVerify = async (e) => {
        e.preventDefault();

        const fullOtp = otp.join("");

        if (valiudation()) {
            // try {
            //     const res = await Axios.post("/auth/otp-verification", {
            //         email: email,
            //         otp: fullOtp,
            //         otpType: otpType
            //     });

            //     if (res.data.status) {
            //         toast.success(res.data.message);
            //         setIsEmailVerified(true);

            //         handleSubmit();

            //         setOtp(["", "", "", "", "", ""]);
            //         handleClose();
            //     }
            //     else {
            //         toast.error(res.data.message);
            //     }
            // } catch (err) {
            //     console.error("Error-OtpVerify-Api++", err);
            // }

            handleSubmit();
        }

    };

    const valiudation = () => {
        let errors = {};
        let formIsValid = true;

        const fullOtp = otp.join("");

        if (!fullOtp) {
            formIsValid = false;
            errors.otp = "Otp is required"
        }
        else if (fullOtp.length != 6) {
            formIsValid = false;
            errors.otp = "OTP must be 6 digits"
        }

        setErrorMessage(errors);
        return formIsValid;
    }


    return (
        <Modal show={show} onHide={handleModalClose} centered>
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
                <div className='content text-center'>
                    <h4 className='mb-1'>
                        Verify OTP
                    </h4>
                    <p>
                        You have received OTP on {email || ""}
                        {/* abc@gmail.com */}
                    </p>
                </div>

                <div className='mt-3'>
                    <form onSubmit={handleOtpVerify}>
                        <div className="mb-3 mb-sm-4">
                            <label htmlFor="otp" className="form-label">
                                Enter Email OTP
                            </label>

                            <div className='d-flex justify-content-between'>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        name="otp"
                                        className="otp-input me-2 me-sm-3"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleBackspace(e, index)}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                            {
                                errorMessage.otp && (
                                    <div style={{ color: "red", fontWeight: '400', fontSize: "14px" }} className='mt-2'>* {errorMessage.otp}</div>
                                )
                            }
                        </div>

                        <div className="mt-3 mt-sm-4">
                            <button
                                type="submit"
                                className='otp-btn w-100 mt-2'
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </Modal>
    )
}

export default OTPVerify