import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import popular from "../../assets/images/popular.png";
import { toast } from 'react-toastify';

const Subscription = () => {

    const navigate = useNavigate();

    // const [billingCycle, setBillingCycle] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState(null);

    console.log("selectedPlan++", selectedPlan);

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);

        localStorage.setItem("Plan", plan);
        // localStorage.setItem("Billing", billingCycle);

        navigate("/billing");
    };



    const handleSubscription = (e) => {
        e.preventDefault();

        localStorage.setItem("Plan", selectedPlan);
        navigate("/billing");
    }


    return (
        <section className='row justify-content-center align-items-center newsignin-section new-auth'>
            <div className="header">
                <h4>Subscription</h4>

                <p>
                    Reclaim control of your data with confidence. Secure, seamless <br className='d-none d-xl-block' />
                    and built to empower you every step of the way.
                </p>
            </div>

            <div className="subscription">
                {/* <div className="plan d-flex justify-content-center">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                            type="button"
                            className={`plan-btn ${billingCycle === "monthly" ? "active" : ""}`}
                            onClick={() => setBillingCycle("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            className={`plan-btn ${billingCycle === "yearly" ? "active" : ""}`}
                            onClick={() => setBillingCycle("yearly")}
                        >
                            Yearly (Save 20%)
                        </button>
                    </div>
                </div> */}


                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-5 mb-lg-0">
                        <div
                            className={`box ${selectedPlan === "basic" ? "selected clicked" : ""}`}
                        >
                            <div className="top">
                                <div className='title'>Starter Plan</div>
                                <div className='price d-flex align-items-center'>$0 <span>per month</span></div>
                                <p>Basic features for up to 1 users</p>

                                <button
                                    type='button'
                                    className='plan-btn'
                                    onClick={() => handleSelectPlan("basic")}
                                >
                                    Current Plan
                                </button>
                            </div>
                            <div className="content">
                                <div className='title'>Features</div>
                                <p>Everything in our <span>free plan</span> plus</p>

                                <p>Access workspace if invited</p>
                                <p>Be added workspace/ organization</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 mb-5 mb-lg-0">
                        <div
                            className={`box ${selectedPlan === "premium" ? "selected clicked" : ""}`}
                        >
                            <div className="top">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='title'>Premium Plan</div>

                                    <div className="popular d-flex align-items-center">
                                        <img src={popular} alt="" className='me-2' />
                                        Popular
                                    </div>
                                </div>

                                <div className='price d-flex align-items-center'>$5.00 <span>per month</span></div>

                                <p>Growing teams up to 10 users</p>

                                <button
                                    type='button'
                                    className='plan-btn'
                                    onClick={() => handleSelectPlan("premium")}
                                >
                                    Choose Premium
                                </button>
                            </div>
                            <div className="content">
                                <div className='title'>Features</div>
                                <p>Everything in our <span>premium plan</span> plus</p>

                                <p>Access workspace if invited</p>
                                <p>Create workspace</p>
                                <p>Manage workspace</p>
                                <p>Onboard users to workspace</p>
                                <p>Assign  roles at workspace level</p>
                                <p>Be added workspace/ organization</p>
                                <p>Lower level support</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div
                            className={`box ${selectedPlan === "enterprise" ? "selected clicked" : ""}`}
                        >
                            <div className="top">
                                <div className='title'>Starter Plan</div>
                                <div className='price d-flex align-items-center'>$15.50 <span>per month</span></div>
                                <p>Advanced features + unlimited users. </p>

                                <button
                                    type='button'
                                    className='plan-btn'
                                    onClick={() => handleSelectPlan("enterprise")}
                                >
                                    Choose Enterprise
                                </button>
                            </div>
                            <div className="content">
                                <div className='title'>Features</div>
                                <p>Everything in our <span>free plan</span> plus</p>

                                <p>Access workspace if invited</p>
                                <p>Create workspace</p>
                                <p>Manage workspace</p>
                                <p>Onboard users to workspace</p>
                                <p>Assign  roles at workspace level</p>
                                <p>Assign  roles at organization level</p>
                                <p>Be added workspace/ organization</p>
                                <p>Enterprise support</p>
                            </div>
                        </div>
                    </div>




                </div>

                <div className="col-lg-5 mt-4 mt-lg-5 m-auto">
                    {/* <button
                        type="button"
                        className={`subscription-btn w-100`}
                        onClick={handleSubscription}
                    >
                        Continue
                    </button> */}

                    <button
                        type="button"
                        className={`skip w-100`}
                        onClick={handleSubscription}
                    >
                        Skip now
                    </button>
                </div>
            </div>


        </section>
    )
}

export default Subscription