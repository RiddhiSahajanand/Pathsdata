import bronzeicon from "../../assets/images/bronze.png";
import settingbilling from "../../assets/images/setting-billing.png";
import visa from "../../assets/images/visa.png";
import email from "../../assets/images/email.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { useEffect, useState } from "react";

const Setting = () => {

    const navigate = useNavigate();

    const [subscriptionData, setSubscriptionData] = useState({});
    const [profileData, setProfileData] = useState({});

    const GetProfileData = async () => {
        try {
            const res = await Axios.get(`/profile`, authorizationHeaders());
            // console.log("profile++", res);

            if (res?.data?.statusCode === 200) {
                setProfileData(res?.data?.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error Profile++", err);

            if (err?.message === "Network Error") {
                setError(err.message);
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        }
    }


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

    const handleUpgrade = () => {
        navigate("/subscription-upgrade", { state: { plan: subscriptionData?.subscription_type, account: true } });
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

    useEffect(() => {
        GetSubscriptionData();

        GetProfileData();
    }, []);

    return (
        <>
            <section className='setting-sec pd'>
                <div className="mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className="card">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <div className="info">
                                        <div className="title">
                                            {/* Basic Plan (Bronze) */}
                                            {subscriptionData?.subscription_type?.charAt(0).toUpperCase() + subscriptionData?.subscription_type?.slice(1)} Plan
                                        </div>
                                        <div className="plan">
                                            {
                                                subscriptionData?.subscription_type === "basic" ?
                                                    "Free" :
                                                    subscriptionData?.subscription_type === "premium" ?
                                                        "$5.00/" :
                                                        "$15.50/"
                                            }

                                            {subscriptionData?.subscription_type != "basic" &&
                                                <span>
                                                    per month
                                                </span>
                                            }
                                        </div>
                                        <p className="mb-0">
                                            {/* Our Most Popular Plan */}

                                            {
                                                subscriptionData?.subscription_type === "basic" ?
                                                    "Basic features for up to 1 users" :
                                                    subscriptionData?.subscription_type === "premium" ?
                                                        "Growing teams up to 10 users" :
                                                        "Advanced features + unlimited users."
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <img src={bronzeicon} alt="" height={90} className="" />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <button type="button" className="cancel-btn me-2 me-md-4" onClick={() => handleCancel()}>
                                        Cancel Plan
                                    </button>
                                    <button type="submit" className={`save-btn }`} onClick={() => handleUpgrade()}>
                                        Upgrade Plan
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="card billing">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <div className="title">Billing Details</div>

                                    <div>
                                        <img src={settingbilling} alt="" className="img-fluid" style={{ width: '48px', height: '48px' }} />
                                    </div>
                                </div>

                                <div className="details d-flex justify-content-between align-items-center mt-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <img src={visa} alt="" className="img-fluid me-3" />
                                        </div>
                                        <div>
                                            <div className="name mb-1">Visa Ending in 5685</div>
                                            <div className="date mb-1">Expired 02/28</div>
                                            <div className="email">
                                                <img src={email} alt="" className="me-2" />
                                                abc12@gmail.com
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className={`save-btn }`}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='setting-form'>
                    <div className="">
                        <div className="add-title">Account Setting</div>
                        <form className="row mt-4">
                            <div className="col-lg-12 mb-3 mb-lg-4">
                                <label htmlFor="name" className="form-label">Name</label>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={profileData?.name || ""}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3 mb-lg-4">
                                <label htmlFor="email_id" className="form-label">Email</label>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="email_id"
                                        name="email_id"
                                        placeholder="Enter Email"
                                        value={profileData?.email_id || ""}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3 mb-lg-4">
                                <label htmlFor="phone_number" className="form-label">Mobile Number</label>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        placeholder="Enter Mobile Number"
                                        value={profileData?.phone_number || ""}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3 mb-lg-4">
                                <label htmlFor="language" className="form-label">Language</label>
                                <div className="add-input">
                                    <select
                                        name="language"
                                        id="language"
                                        value={profileData?.language || ""}
                                        disabled
                                    >
                                        <option value="">Select Language</option>
                                        {languages.map((lang, index) => (
                                            <option key={index} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3 mb-lg-4">
                                <label htmlFor="country" className="form-label">Country</label>
                                <div className="add-input">
                                    <select
                                        name="country"
                                        id="country"
                                        value={profileData?.country || ""}
                                        readOnly
                                        disabled
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            {/* <div className="d-flex justify-content-end py-4">
                                <button type="button" className="cancel-btn me-2 me-md-4" onClick={() => navigate(-1)}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`save-btn ${loading ? 'loading' : ''}`}
                                >
                                    {
                                        loading ? (
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        ) : (
                                            "Submit"
                                        )
                                    }
                                </button>
                            </div> */}
                        </form>
                    </div >
                </div >
            </section >
        </>
    )
}
export default Setting;






export const languages = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali",
    "Bosnian", "Bulgarian", "Burmese", "Catalan", "Cebuano", "Chichewa", "Chinese (Simplified)", "Chinese (Traditional)",
    "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish",
    "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian",
    "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese",
    "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian",
    "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Nepali",
    "Norwegian", "Odia", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic",
    "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili",
    "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Turkish", "Turkmen", "Ukrainian", "Urdu", "Uyghur", "Uzbek",
    "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];


export const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
    "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius",
    "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Samoa", "San Marino", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan",
    "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];