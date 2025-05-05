import React, { useState } from 'react';
import Pathdatamanage from "../../../assets/images/pathdatamanage.png";
import Pathdatamanage1 from "../../../assets/images/pathdatamanage1.png";
import Bringowncloud from "../../../assets/images/bringowncloud.png";
import Bringowncloud1 from "../../../assets/images/bringowncloud1.png";
import { Form, useNavigate } from 'react-router-dom';
import { Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';

const initialState = {
    workspace_type: "organization",
    name: "",
    language: "",
    country: "",
    data_source: "path_data_manage",
    email_id: ""
}

const WorkSpace = ({ step, setStep }) => {

    // const tenant_id = localStorage.getItem("signup-tenantid")

    const navigate = useNavigate();
    const Email = localStorage.getItem("email");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleWorkspace = async (e) => {
        e.preventDefault();

        const data = { ...formData, email_id: Email };

        try {
            const res = await Axios.post(`/auth/signup/workspace`, data);

            if (res.status === 200) {
                toast.success(res?.data?.message);

                setFormData(initialState);

                if (formData?.data_source === 'path_data_manage') {
                    // navigate("/home");
                    navigate("/sign-in");
                }
                // if (formData?.data_source === 'bring_own_cloud') {
                //     setStep(4); // Bring-own cloud (Aws) pass
                // }
            }
            else {
                // toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error Workspace++", err);

            if (err?.message === "Network Error") {
                toast.error(err?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div className="header">
                <h4>Workspace</h4>

                <p>
                    Reclaim control of your data with confidence. <br />
                    Secure, seamless, and built to empower you every <br />
                    step of the way.
                </p>
            </div>

            <form
                // onSubmit={(e) => handleContinue(e, 4)}
                onSubmit={handleWorkspace}
            >

                <div className="mb-4">
                    <label htmlFor="workspace_type" className="form-label">
                        Select Type
                    </label>
                    <div className="mt-2 d-flex">
                        <div className="form-check me-3">
                            <input
                                type="radio"
                                name="workspace_type"
                                id="organization"
                                className="form-check-input"
                                value={"organization"}
                                // checked={"organization"}
                                checked={formData.workspace_type === "organization"}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-label radio-label" htmlFor="organization">
                                Organization
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="workspace_type"
                                id="person"
                                className="form-check-input"
                                value={"person"}
                                // checked={"person"}
                                checked={formData.workspace_type === "person"}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-label radio-label" htmlFor="person">
                                Person
                            </label>
                        </div>
                    </div>
                </div>

                {
                    formData.workspace_type === "organization" ? (
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Please enter company name"
                                value={formData?.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    ) : (
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Person  Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Please enter person name"
                                value={formData?.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )
                }

                <div className="mb-4">
                    <label htmlFor="language" className="form-label">
                        Language
                    </label>
                    {/* <input  
                        type="text"
                        name="language"
                        id="language"
                        className="form-control"
                        placeholder="Please enter language"
                    /> */}

                    <select
                        name="language"
                        id="language"
                        className="form-control form-select"
                        value={formData?.language}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Language</option>
                        {languages?.map((i, index) => (
                            <option key={index} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="country" className="form-label">
                        Country
                    </label>
                    {/* <input
                        type="text"
                        name="country"
                        id="country"
                        className="form-control"
                        placeholder="Please enter country"
                    /> */}
                    <select
                        name="country"
                        id="country"
                        className="form-control form-select"
                        value={formData?.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries?.map((i, index) => (
                            <option key={index} value={i}>
                                {i}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="mb-4">
                    <label htmlFor="data_source" className="form-label">
                        Data Source
                    </label>

                    <div className="mt-2 d-flex data-source-options">
                        <div
                            className={`option-card me-3 ${formData.data_source === "path_data_manage" ? "active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="data_source"
                                id="path_data_manage"
                                value="path_data_manage"
                                checked={formData.data_source === "path_data_manage"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="path_data_manage">
                                <img src={formData.data_source === "path_data_manage" ? Pathdatamanage1 : Pathdatamanage} alt="Path Data Manage" />
                                <div>
                                    Path
                                    Data Manage
                                </div>
                            </label>
                        </div>

                        {/* Option 2: Bring Own Cloud 
                        <div
                            className={`option-card ${formData.data_source === "bring_own_cloud" ? "active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="data_source"
                                id="bring_own_cloud"
                                value="bring_own_cloud"
                                checked={formData.data_source === "bring_own_cloud"}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="bring_own_cloud">
                                <img src={formData.data_source === "bring_own_cloud" ? Bringowncloud1 : Bringowncloud} alt="Bring Own Cloud" />
                                <div>
                                    Bring
                                    Own Cloud
                                </div>
                            </label>
                        </div>
                    </div>
                </div> */}

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

export default WorkSpace;


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