import yesicon from "../../assets/images/yes.png";
import noicon from "../../assets/images/no.png";
import subscriptionplan from "../../assets/images/subscription-plan.png";
import { useEffect, useState } from "react";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { toast } from "react-toastify";
import subscription from "../../assets/images/subscription.png";
import { useNavigate } from "react-router-dom";

const SubscriptionList = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState({})

    const GetSubscriptionData = async () => {
        try {
            const res = await Axios.get(`/subscription`, authorizationHeaders());
            console.log("networkres", res);

            if (res.data?.statusCode === 200) {
                setSubscriptionData(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error subscription++", err);

            if (err?.message === "Network Error") {
                setError(err.message);
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        }
    }

    useEffect(() => {
        GetSubscriptionData();
    }, []);

    const handleUpgrade = () => {
        navigate("/subscription-upgrade", { state: { plan : subscriptionData?.subscription_type, account: false } })
    }

    const handleCancel = async () => {
        try {
            const res = await Axios.delete(`/subscription`, authorizationHeaders());
            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                GetSubscriptionData();
            }
            else {
                if (err?.message === "Network Error") {
                    setError(err.message);
                }
                if (err?.response?.data?.statusCode === "440") {
                    toast.error("Session expired. Please log in again.");
                    localStorage.clear();
                    localStorage.setItem("openCloudOption", false);
                    navigate("/sign-in");
                } else {
                    toast.error(err?.response?.data?.message || "An error occurred");
                }
            }

        } catch (err) {
            console.error("Error Delete resourcesIAM++", err);
        }
    }


    return (
        <>
            <section className='pd mt-3'>
                <div className="">
                    <span className="subscription-title">Subscription</span>
                    <p className="subscription-desc">Reclaim control of your data with confidence. Secure, seamless and built to empower<br />
                        you every step of the way</p>
                </div>
            </section>
            <section className="subscription-content-section pd mt-5 ml-5">
                <div className="second mt-3 mt-lg-4">
                    <div className="col-12">
                        <div className="box">
                            <span className="subs-title">
                                {subscriptionData?.subscription_type?.charAt(0).toUpperCase() + subscriptionData?.subscription_type?.slice(1)} Plan
                            </span>

                            {subscriptionData?.subscription_type === "enterprise" &&
                                < div className='subscription-price-enterprise'>$15.50/ <span className="month">per month</span></div>}

                            {subscriptionData?.subscription_type === "premium" &&
                                < div className='subscription-price'>$5.00/ <span className="month">per month</span></div>}

                            {subscriptionData?.subscription_type === "basic" &&
                                < div className='subscription-price-basic'>Free</div>}


                            {subscriptionData?.subscription_type &&
                                <div className="feature">
                                    <div className="name">Features</div>
                                    <p>
                                        {
                                            subscriptionData?.subscription_type === "basic" ?
                                                "Basic features for up to 1 users" :
                                                subscriptionData?.subscription_type === "premium" ?
                                                    "Growing teams up to 10 users" :
                                                    "Advanced features + unlimited users."
                                        }
                                    </p>
                                </div>
                            }


                            <div className="subscription-detail">

                                {subscriptionData?.subscription_type === "basic" &&
                                    <div className="subscription-list row">
                                        <div className="col-lg-6 col-12 d-flex">
                                            <img src={subscriptionplan} height={24} className="me-3" />
                                            <p className='yes'>Access workspace if invited</p>
                                        </div>
                                        <div className="col-lg-6 col-12 d-flex">
                                            <img src={subscriptionplan} height={24} className="me-3" />
                                            <p className='yes'>Be added workspace/ organization</p>
                                        </div>
                                    </div>
                                }

                                {subscriptionData?.subscription_type === "premium" &&
                                    <>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Access workspace if invited</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Create workspace</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Manage workspace</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Onboard users to workspace</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Assign  roles at workspace level</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Be added workspace/organization</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Lower level support</p>
                                            </div>
                                        </div>
                                    </>
                                }

                                {subscriptionData?.subscription_type === "enterprise" &&
                                    <>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Access workspace if invited</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Create workspace</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Manage workspace</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Onboard users to workspace</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Assign  roles at workspace level</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Assign  roles at organization level</p>
                                            </div>
                                        </div>
                                        <div className="subscription-list row">
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Be added workspace/ organization</p>
                                            </div>
                                            <div className="col-lg-6 col-12 d-flex">
                                                <img src={subscriptionplan} height={24} className="me-3" />
                                                <p className='yes'>Enterprise Support</p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section >
            <div className="d-flex justify-content-end pb-4 pe-5">
                <button type="button" className="cancel-btn me-2 me-md-4" onClick={() => handleCancel()} >
                    Cancel Plan
                </button>
                <button
                    type="submit"
                    className={`save-btn`}
                    onClick={() => handleUpgrade()}
                >
                    {
                        loader ? (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            "Upgrade Plan"
                        )
                    }
                </button>
            </div>
        </>
    )
}
export default SubscriptionList;