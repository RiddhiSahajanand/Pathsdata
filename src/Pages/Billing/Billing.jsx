// // import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { authorizationHeaders, Axios } from "../../helper/Axios";
// import billingicon from "../../assets/images/billing-icon.png";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Billing = () => {
//     const subscriptionType = localStorage.getItem("Plan");
//     const token = localStorage.getItem("jwt_token");
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         subscription_type: subscriptionType,
//         membership_type: "",
//         address_line_1: "",
//         address_line_2: "",
//         city: "",
//         country: "",
//         zip_code: "",
//         payment_method: "online",
//     });

//     const [formErrors, setFormErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setFormErrors({ ...formErrors, [name]: "" }); // Clear error when user types
//     };

//     const validateForm = () => {
//         const errors = {};
//         if (!formData.address_line_1.trim()) errors.address_line_1 = "Address Line 1 is required.";
//         if (!formData.address_line_2.trim()) errors.address_line_2 = "Address Line 2 is required.";
//         if (!formData.city.trim()) errors.city = "City is required.";
//         if (!formData.country.trim()) errors.country = "Country is required.";
//         if (!formData.zip_code.trim()) errors.zip_code = "Zipcode is required.";
//         if (!formData.membership_type.trim()) errors.membership_type = "Membership type is required.";
//         return errors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errors = validateForm();
//         if (Object.keys(errors).length > 0) {
//             setFormErrors(errors);
//             return;
//         }

//         const payload = {
//             subscription_type: formData.subscription_type,
//             membership_type: formData.membership_type,
//             billed_to: `${formData.address_line_1}, ${formData.address_line_2}, ${formData.city}, ${formData.country}`,
//             zip_code: formData.zip_code,
//             payment_method: formData.payment_method,
//         };

//         try {
//             const res = await Axios.post(`/subscription`, payload, authorizationHeaders());

//             console.log("handleSubmitAPI Response:", res);

//             if (res?.data?.statusCode === 200) {
//                 toast.success("Subscription processed successfully");
//                 console.log("Profile created successfully:", res);
//                 navigate("/home");
//             } else {
//                 toast.error(res?.data?.message);
//                 console.error("Error submitting:");
//             }
//         } catch (error) {
//             console.log('====================================');
//             console.log("error", error?.response?.data?.message);
//             console.log('====================================');
//             toast.error(error?.response?.data?.message);
//         }
//     };

//     return (
//         <section className="row justify-content-center align-items-center newsignin-section new-auth">
//             <div className="col-lg-8">
//                 <div className="header">
//                     <h4>Billing</h4>
//                     <p>
//                         Reclaim control of your data with confidence. Secure, seamless <br className="d-none d-xl-block" />
//                         and built to empower you every step of the way.
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="billing-view">
//                         <div>
//                             <img src={billingicon} alt="" />
//                             <span className="billing-title">Billing to a Membership</span>
//                             <span className="billing-desc">
//                                 Get all access and an extra 20% off when you subscribe annually
//                             </span>
//                         </div>
//                         <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
//                             <div>
//                                 <div className="mb-4">
//                                     <label htmlFor="address_line_1" className="form-label">
//                                         Billed To
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="address_line_1"
//                                         name="address_line_1"
//                                         value={formData.address_line_1}
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         placeholder="Address Line 1"

//                                     />
//                                     {formErrors.address_line_1 && <span className="text-danger">{formErrors.address_line_1}</span>}
//                                 </div>
//                                 <div className="mb-4">
//                                     <input
//                                         type="text"
//                                         id="address_line_2"
//                                         name="address_line_2"
//                                         value={formData.address_line_2}
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         placeholder="Address Line 2"

//                                     />
//                                     {formErrors.address_line_2 && <span className="text-danger">{formErrors.address_line_2}</span>}
//                                 </div>
//                                 <div className="mb-4">
//                                     <input
//                                         type="text"
//                                         id="city"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         placeholder="City"

//                                     />
//                                     {formErrors.city && <span className="text-danger">{formErrors.city}</span>}
//                                 </div>
//                                 <div className="mb-4">
//                                     <select
//                                         name="country"
//                                         id="country"
//                                         value={formData.country}
//                                         onChange={handleChange}
//                                         className="form-control form-select"

//                                     >
//                                         <option value="">Select country</option>
//                                         {["India", "USA", "UK", "Australia"].map((country, index) => (
//                                             <option key={index} value={country}>
//                                                 {country}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {formErrors.country && <span className="text-danger">{formErrors.country}</span>}
//                                 </div>
//                                 <div className="mb-4">
//                                     <input
//                                         type="text"
//                                         id="zip_code"
//                                         name="zip_code"
//                                         value={formData.zip_code}
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         placeholder="Zipcode"

//                                     />
//                                     {formErrors.zip_code && <span className="text-danger">{formErrors.zip_code}</span>}
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="mb-4">
//                                     <label htmlFor="membershipType" className="form-label">
//                                         Membership Type
//                                     </label>
//                                     <div className="membership-options">
//                                         <div className="membership-option">
//                                             <input
//                                                 type="radio"
//                                                 id="payMonthly"
//                                                 name="membership_type"
//                                                 value="monthly"
//                                                 checked={formData.membership_type === "monthly"}
//                                                 onChange={handleChange}
//                                                 className="membership-radio"

//                                             />
//                                             <label htmlFor="payMonthly" className="membership-label">
//                                                 <div className="membership-title">Pay Monthly</div>
//                                                 <div className="membership-price">$20 / Month Per Member</div>
//                                             </label>
//                                         </div>
//                                         <div className="membership-option">
//                                             <input
//                                                 type="radio"
//                                                 id="payAnnually"
//                                                 name="membership_type"
//                                                 value="annually"
//                                                 checked={formData.membership_type === "annually"}
//                                                 onChange={handleChange}
//                                                 className="membership-radio"

//                                             />
//                                             <label htmlFor="payAnnually" className="membership-label">
//                                                 <div className="membership-title">Pay Annually</div>
//                                                 <div className="membership-price">
//                                                     $16 / Month Per Member
//                                                     <span className="membership-discount">Save 20%</span>
//                                                 </div>
//                                             </label>
//                                         </div>
//                                     </div>
//                                     {formErrors.membership_type && <span className="text-danger">{formErrors.membership_type}</span>}
//                                     <div>
//                                         <span className="selcted-price">$20.00</span>
//                                         <span className="tearms-text">
//                                             By Continuing{" "}
//                                             <span className="condition-text">you agree to our terms and conditions.</span>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mt-5 last-btn d-flex justify-content-center">
//                         <button type="submit" className={`profile-btn w-50`}>
//                             Continue
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Billing;

// import React, { useState } from "react";
import { toast } from "react-toastify";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import billingicon from "../../assets/images/billing-icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Billing = () => {
    const subscriptionType = localStorage.getItem("Plan");
    const token = localStorage.getItem("jwt_token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        subscription_type: subscriptionType,
        membership_type: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        country: "",
        zip_code: "",
        payment_method: "online",
    });

    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" }); // Clear error when user types
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { subscription_type, membership_type, address_line_1, address_line_2, country, city, zip_code, payment_method } = formData;

        if (
            !subscription_type.trim() ||
            !membership_type.trim() ||
            !address_line_1.trim() ||
            !address_line_2.trim() ||
            !country.trim() ||
            !city.trim() ||
            !zip_code.trim() ||
            !payment_method.trim()
        ) {
            toast.error("Please fill in all required fields."); // Display error toast
            return; // Stop submission
        }
        setLoading(true);

        const payload = {
            subscription_type: formData.subscription_type,
            membership_type: formData.membership_type,
            billed_to: `${formData.address_line_1}, ${formData.address_line_2}, ${formData.city}, ${formData.country}`,
            zip_code: formData.zip_code,
            payment_method: formData.payment_method,
        };

        try {
            const res = await Axios.post(`/subscription`, payload, authorizationHeaders());

            console.log("handleSubmitAPI Response:", res);

            if (res?.data?.statusCode === 200) {
                toast.success("Subscription processed successfully");
                console.log("Profile created successfully:", res);
                navigate("/home");
            } else {
                toast.error(res?.data?.message);
                console.error("Error submitting:");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="row justify-content-center align-items-center newsignin-section new-auth">
            <div className="col-lg-8">
                <div className="header">
                    <h4>Billing</h4>
                    <p>
                        Reclaim control of your data with confidence. Secure, seamless <br className="d-none d-xl-block" />
                        and built to empower you every step of the way.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="billing-view">
                        <div>
                            <img src={billingicon} alt="" />
                            <span className="billing-title">Billing to a Membership</span>
                            <span className="billing-desc">
                                Get all access and an extra 20% off when you subscribe annually
                            </span>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="address_line_1" className="form-label">
                                        Billed To
                                    </label>
                                    <input
                                        type="text"
                                        id="address_line_1"
                                        name="address_line_1"
                                        value={formData.address_line_1}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Address Line 1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="address_line_2"
                                        name="address_line_2"
                                        value={formData.address_line_2}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Address Line 2"

                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="City"

                                    />
                                </div>
                                <div className="mb-4">
                                    <select
                                        name="country"
                                        id="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="form-control form-select"

                                    >
                                        <option value="">Select country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="zip_code"
                                        name="zip_code"
                                        value={formData.zip_code}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Zipcode"

                                    />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="membershipType" className="form-label">
                                        Membership Type
                                    </label>
                                    <div className="membership-options">
                                        <div className="membership-option">
                                            <input
                                                type="radio"
                                                id="payMonthly"
                                                name="membership_type"
                                                value="monthly"
                                                checked={formData.membership_type === "monthly"}
                                                onChange={handleChange}
                                                className="membership-radio"

                                            />
                                            <label htmlFor="payMonthly" className="membership-label">
                                                <div className="membership-title">Pay Monthly</div>
                                                <div className="membership-price">$20 / Month Per Member</div>
                                            </label>
                                        </div>
                                        <div className="membership-option">
                                            <input
                                                type="radio"
                                                id="payAnnually"
                                                name="membership_type"
                                                value="annually"
                                                checked={formData.membership_type === "annually"}
                                                onChange={handleChange}
                                                className="membership-radio"

                                            />
                                            <label htmlFor="payAnnually" className="membership-label">
                                                <div className="membership-title">Pay Annually</div>
                                                <div className="membership-price">
                                                    <span className="mt-1">
                                                        $16 / Month Per Member
                                                    </span>
                                                    <span className="membership-discount">Save 20%</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="selcted-price">$20.00</span>
                                        <span className="tearms-text">
                                            By Continuing{" "}
                                            <span className="condition-text">you agree to our terms and conditions.</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 last-btn d-flex justify-content-center">
                        <button
                            type="submit"
                            className={`profile-btn ${loading ? 'loading' : ''} w-50`}
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
                </form>
            </div>
        </section>
    );
};

export default Billing;


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