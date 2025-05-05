import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import signinimg from "../../assets/images/signin-img.png";
import Aws from "../../assets/images/AWS.png";
import NewSignUp from '../../Components/Auth-Page/SignUp/SignUp';
import OTPVerify from '../../Components/Auth-Page/OTP-Verify/OTPVerify';
import WorkSpace from '../../Components/Auth-Page/WorkSpace/WorkSpace';
import Cloud from '../../Components/Auth-Page/Cloud/Cloud';

const SignUp = () => {

    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // const [formData, setFormData] = useState({
    //     accountType: "Organization",
    //     language: "",
    //     country: "",
    //     dataCatelog: "",
    // });


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value
    //     });
    // };

    // const handleContinue = (e, nextStep) => {
    //     e.preventDefault();

    //     if (formData.dataCatelog === 'Pathsdatamanage') {
    //         navigate("/home");
    //     }
    //     else if (formData.dataCatelog === 'Bringowncloud') {
    //         setStep(4);
    //     }
    //     else {
    //         setStep(nextStep);
    //     }
    // };

    return (

        // full-height

        <section className={`row newsignin-section  ${step === 3 ? "full-height" : ""}`}>
            {/* <div className=""> */}
            {/* Left Side - Progress */}
            <div className="col-lg-6">
                <div className={`left d-flex flex-column ${step === 0 ? 'justify-content-center' : 'justify-content-end'}`}>
                    <h1>
                        {/* Get Start with Us */}
                        Start Your Journey with Us
                    </h1>
                    <p>
                        Welcome to PATHSDATA - Let’s set up your account
                        <br className=' d-lg-block' />
                        and get you started!
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
                                    <span>Sign up your account</span>
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

                            {step == 2 && <div className="line"></div>}

                            <div
                                className={`progres-data mb-3 ${step === 3 ? "current" : ""}`}
                            >
                                <div className="d-flex align-items-center">
                                    <div
                                        className={`num ${step === 3 ? "current" : ""}`}
                                    >
                                        3
                                    </div>
                                    <span>Set up your workspace</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Right Side - Form */}
            <div className="col-lg-6 d-flex flex-column justify-content-center">
                <div className={`right`} >



                    {/* Sign-Up */}
                    {
                        step === 1 && (
                            <NewSignUp step={step} setStep={setStep} />
                        )
                    }

                    {/* OTP-Verify */}
                    {
                        step === 2 && (
                            <OTPVerify step={step} setStep={setStep} role="signup" />
                        )
                    }

                    {/* Workshop */}
                    {
                        step === 3 && (
                            <WorkSpace step={step} setStep={setStep} />
                        )
                    }

                    {/* Bring-own0cloud (Aws) */}
                    {
                        step === 4 && (
                            <Cloud />
                        )
                    }
                </div>

            </div>
            {/* </div> */}
        </section>
    )
}

export default SignUp;
