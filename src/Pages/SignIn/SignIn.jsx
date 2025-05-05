import React, { useState } from 'react';
import NewSignIn from '../../Components/Auth-Page/SignIn/SignIn';
import Signup from '../../Components/Auth-Page/SignUp/SignUp';
import OTPVerify from '../../Components/Auth-Page/OTP-Verify/OTPVerify';
import WorkSpace from '../../Components/Auth-Page/WorkSpace/WorkSpace';
import Cloud from '../../Components/Auth-Page/Cloud/Cloud';
import newLogo from "../../assets/images/New-Logo.png";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    return (
        // full-height

        <section className={`row newsignin-section  ${step === 3 ? "full-height" : ""}`}>
            {/* <div className=""> */}
            {/* Left Side - Progress */}
            <div className="col-lg-6">
                <div className={`left d-flex flex-column ${step === 0 ? 'justify-content-center' : ''}`}>
                    <div className='d-flex justify-content-center'>
                        <img src={newLogo} alt="" style={{ display: 'flex', marginTop: "100px", marginBottom: '180px', width: '70%' }} />
                    </div>
                    <h1>
                        {/* Get Start with Us */}
                        Welcome to PATHSDATA!

                    </h1>
                    <p>
                        Sign in and take the next step with us.
                        {/*
                        Welcome to PATHSDATA - Let’s create <br className=' d-lg-block' />
                        your account. */}
                    </p>


                    <div className="">
                        <div className='progres'>
                            <div
                                className={`progres-data mb-3 ${step === 1 ? "current" : ""}`}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className={`num ${step === 1 ? "current" : ""}`}
                                    >
                                        1
                                    </div>
                                    <span>Sign in your account</span>
                                </div>
                            </div>

                            {step == 1 && <div className="line"></div>}

                            <div
                                className={`progres-data mb-3 ${step === 2 ? "current" : ""}`}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className={`num ${step === 2 ? "current" : ""}`}
                                    >
                                        2
                                    </div>
                                    <span>Verify your account</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Right Side - Form */}
            <div className="col-lg-6 d-flex flex-column justify-content-center">
                <div className={`right`} >

                    {/* Sign-In */}
                    {
                        step === 1 && (
                            <NewSignIn step={step} setStep={setStep} />
                        )
                    }

                    {/* OTP-Verify */}
                    {
                        step === 2 && (
                            <OTPVerify step={step} setStep={setStep} role="signin" />
                        )
                    }
                </div>

            </div>
            {/* </div> */}
        </section>
    )
}

export default SignIn;