import React, { useState } from 'react';
import profileUser from "../../assets/images/profile.png";
import profileselect from "../../assets/images/profile-select.png";
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

// const initialState = {
//     email_id: "",
//     name: "",
//     phone_number: "",
//     language: "",
//     country: "",
//     image_base64_value: "" // it is optional.
// }
// const CreateProfile = () => {

//     const navigate = useNavigate();

//     const [profile, setProfile] = useState(null);

//     const Email = localStorage.getItem("email");

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageUrl = URL.createObjectURL(file);
//             setProfile(imageUrl);
//         }
//     };


//     const handleCreateProfile = (e) => {
//         e.preventDefault();

//         navigate("/subscription");
//     }

//     return (
//         <section className='row justify-content-center align-items-center newsignin-section new-auth'>
//             <div className="col-lg-5">
//                 <div className="header">
//                     <h4>Create Profile</h4>

//                     <p>
//                         Reclaim control of your data with confidence. Secure, seamless <br className='d-none d-xl-block' />
//                         and built to empower you every step of the way.
//                     </p>
//                 </div>

//                 <form
//                     // onSubmit={(e) => handleContinue(e, 2)}
//                     onSubmit={handleCreateProfile}
//                 >
//                     <div className='form-inputs'>
//                         <div className="mb-4">
//                             <div className="profile-image-container text-center">
//                                 <img
//                                     src={profile || profileUser}
//                                     alt="Profile"
//                                     className="profile-image"
//                                 />
//                                 <label htmlFor="profile" className="camera-icon">
//                                     <img src={profileselect} alt="" />
//                                 </label>
//                             </div>
//                             <input
//                                 type="file"
//                                 id="profile"
//                                 name="profile"
//                                 className="form-control d-none"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                             // required
//                             />
//                         </div>


//                         <div className="mb-4">
//                             <label htmlFor="company_name" className="form-label">
//                                 Name
//                             </label>
//                             <input
//                                 type="email"
//                                 id="company_name"
//                                 name="company_name"
//                                 className="form-control"
//                                 placeholder="Please enter name"
//                             // required
//                             />
//                         </div>


//                         <div className="mb-4">
//                             <label htmlFor="mobile_number" className="form-label">
//                                 Mobile Number
//                             </label>

//                             <PhoneInput
//                                 placeholder="Enter Mobile Number"
//                                 country={'in'}
//                                 inputClass="form-control contry"
//                                 specialLabel=""
//                                 enableSearch
//                                 maxLength="10"
//                                 // inputProps={{
//                                 //     required: true,
//                                 // }}
//                                 separateDialCode={true}
//                             // disableDropdown={true}
//                             // buttonClass="d-none"
//                             />
//                         </div>


//                         <div className="mb-4">
//                             <label htmlFor="language" className="form-label">
//                                 Language
//                             </label>

//                             <select
//                                 name="language"
//                                 id="language"
//                                 className="form-control form-select"
//                             // required
//                             >
//                                 <option value="">Please select language</option>
//                                 {languages?.map((i, index) => (
//                                     <option key={index} value={i}>
//                                         {i}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="">
//                             <label htmlFor="country" className="form-label">
//                                 Country
//                             </label>

//                             <select
//                                 name="country"
//                                 id="country"
//                                 className="form-control form-select"
//                             // required
//                             >
//                                 <option value="">Please select country</option>
//                                 {countries?.map((i, index) => (
//                                     <option key={index} value={i}>
//                                         {i}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="mt-5 last-btn">
//                         <button
//                             type="submit"
//                             className={`profile-btn w-100`}
//                         // className={`sign-btn ${loading ? 'loading' : ''} w-100`}
//                         // disabled={loading}
//                         >
//                             {/* {
//                             loading ? (
//                                 <span
//                                     className="spinner-border spinner-border-sm me-2"
//                                     role="status"
//                                     aria-hidden="true"
//                                 ></span>
//                             ) : ( */}
//                             Continue
//                             {/* )
//                         } */}
//                         </button>
//                     </div>


//                 </form>

//             </div>
//         </section>
//     )
// }

// export default CreateProfile;

const CreateProfile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        email_id: localStorage.getItem("email") || "",
        name: "",
        phone_number: "",
        language: "",
        country: "",
        image_base64_value: "",
    });
    const [loading, setLoading] = useState(false);


    const [profileImage, setProfileImage] = useState(null); // For displaying the image preview
    console.log("profileImage", profileImage);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhoneChange = (phone) => {
        setProfile((prev) => ({
            ...prev,
            phone_number: phone,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Display image preview
                setProfile((prev) => ({
                    ...prev,
                    image_base64_value: reader.result, // Save Base64 value
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateProfile = async (e) => {
        // navigate("/subscription");
        e.preventDefault();
        setLoading(true);
        const { email_id, name, language, country } = profile;

        if (
            !email_id.trim() ||
            !name.trim() ||
            !country.trim() ||
            !language.trim()
        ) {
            toast.error("Please fill in all required fields."); // Display error toast
            return; // Stop submission
        }


        try {
            const res = await Axios.post(`/profile`, profile);
            console.log('====================================');
            console.log("handleCreateProfileres", res);
            console.log('====================================');

            if (res?.data?.statusCode === 200) {
                toast.success("Profile created successfully");
                
                localStorage.setItem("jwt_token", res?.data?.jwt_token);
                navigate("/subscription");
            } else {
                console.error("Error creating profile:");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section className="row justify-content-center align-items-center newsignin-section new-auth">
            <div className="col-lg-5">
                <div className="header">
                    <h4>Create Profile</h4>
                    <p>
                        Reclaim control of your data with confidence. Secure, seamless <br className="d-none d-xl-block" />
                        and built to empower you every step of the way.
                    </p>
                </div>

                <form onSubmit={handleCreateProfile}>
                    <div className="form-inputs">
                        <div className="mb-4">
                            <div className="profile-image-container text-center">
                                <img src={profileImage || profileUser} alt="Profile" className="profile-image" />
                                <label htmlFor="profile" className="camera-icon">
                                    <img src={profileselect} alt="Upload" />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="profile"
                                name="profile"
                                className="form-control d-none"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Please enter name"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone_number" className="form-label">
                                Mobile Number
                            </label>
                            <PhoneInput
                                placeholder="Enter Mobile Number"
                                country={"in"}
                                inputClass="form-control contry"
                                specialLabel=""
                                value={profile.phone_number}
                                onChange={handlePhoneChange}
                                enableSearch
                                maxLength="10"
                                separateDialCode={true}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="language" className="form-label">
                                Language
                            </label>
                            <select
                                name="language"
                                id="language"
                                value={profile.language}
                                onChange={handleInputChange}
                                className="form-control form-select"
                            >
                                <option value="">Please select language</option>
                                {languages.map((lang, index) => (
                                    <option key={index} value={lang}>
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <select
                                name="country"
                                id="country"
                                value={profile.country}
                                onChange={handleInputChange}
                                className="form-control form-select"
                            >
                                <option value="">Please select country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-5 last-btn">
                        <button
                            type="submit"
                            className={`profile-btn ${loading ? 'loading' : ''} w-100`}
                            disabled={loading}>
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

export default CreateProfile;




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