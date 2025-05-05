import React, { useState } from 'react';
import subscription from "../../assets/images/subscription.png";
import { useLocation, useNavigate } from 'react-router-dom';
import yesicon from "../../assets/images/yes.png";
import noicon from "../../assets/images/no.png";
import { toast } from 'react-toastify';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import popular from "../../assets/images/popular.png";

const EditSubscription = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { plan, account }= location?.state;
    console.log("state++", plan, account, location);

    // const [formData, setFormData] = useState({
    //     billing: "monthly",
    //     plan: "" || state,
    // });
    // console.log(formData);
    // const billing= localStorage.getItem("Billing");


    // const [billingCycle, setBillingCycle] = useState("monthly");

    const [selectedPlan, setSelectedPlan] = useState(plan);
    // console.log(selectedPlan);


    const [loader, setLoader] = useState(false);

    const handleSubscription = async (changePlan) => {
        setLoader(true);

        // console.log(billingCycle,"=" , changePlan);

        const payload = {
            subscription_type: changePlan,
            membership_type: "monthly",
            payment_method: "online"
        }

        try {
            const res = await Axios.patch(`/subscription`, payload, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);

                if (!account) {
                    navigate("/subscription-list");
                } else {
                    navigate("/setting");
                }
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error Patch Credential Configure++", err);

            if (err?.message === "Network Error") {
                toast.error(err?.message);
            }
            if (err?.response?.data?.statusCode === 400) {
                toast.error(err?.response?.data?.message);
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        } finally {
            setLoader(false);
        }
    }

    return (
        <section className='row justify-content-center align-items-center subscription-section'>

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
                                    onClick={() => {
                                        setSelectedPlan("basic")
                                        handleSubscription("basic")
                                    }}
                                >
                                    Current Plan
                                </button>
                            </div>
                            <div className="sub-content">
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
                                    onClick={() => {
                                        setSelectedPlan("premium")
                                        handleSubscription("premium")
                                    }}
                                >
                                    Choose Premium
                                </button>
                            </div>
                            <div className="sub-content">
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
                                    onClick={() => {
                                        setSelectedPlan("enterprise")
                                        handleSubscription("enterprise")
                                    }}
                                >
                                    Choose Enterprise
                                </button>
                            </div>
                            <div className="sub-content">
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

                {/* <div className="col-lg-5 mt-5 m-auto">
                    <button
                        type="button"
                        className={`subscription-btn w-100`}
                        onClick={handleSubscription}
                    >
                        {
                            loader ? (
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
                </div> */}
            </div>

        </section>
    )
}

export default EditSubscription