

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { set } from "lodash";

const initialState = {
    firstname: "",
    lastname: "",
    work_email: "",
    organization: "",
    message: ""
}

const Contactus = () => {

    const navigate = useNavigate();
    // const tenantId = localStorage.getItem("signin-tenantid");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstname, lastname, work_email, organization, message } = formData;

        if (
            !firstname.trim() ||
            !lastname.trim() ||
            !work_email.trim() ||
            !organization.trim() ||
            !message.trim()
        ) {
            toast.error("Please fill in all required fields."); // Display error toast
            return; // Stop submission
        }
        setLoading(true);

        const payload = {
            first_name: formData.firstname,
            last_name: formData.lastname,
            work_email: formData.work_email,
            organization: formData.organization,
            message: formData.message
        }

        try {
            const res = await Axios.post("/auth/contact_us", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                setFormData(initialState);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error("Error Contact-Us++", err);
            toast.error(err?.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="pd mt-4">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Book a Demo Today</p>
                    </div>
                </div>
                <section className='add-content-section '>
                    <div className="second mt-3 mt-lg-4">
                        <form className="row mt-4" onSubmit={handleSubmit}>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="firstname" className="form-label">First Name</label>
                                {/* <div className=''> */}
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        placeholder="Enter First name"
                                        value={formData?.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* </div> */}
                            </div>
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="lastname" className="form-label">Last Name</label>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        value={formData?.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="work_email" className="form-label">Work Email</label>
                                <div className="add-input">
                                    <input
                                        type="email"
                                        id="work_email"
                                        name="work_email"
                                        placeholder="Enter Your Work Email"
                                        value={formData?.work_email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                <label htmlFor="organization" className="form-label">Organization Name</label>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        placeholder="Your Organization Name"
                                        value={formData?.organization}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12 mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <div className="add-textara">
                                    <textarea
                                        type="text"
                                        id="message"
                                        name="message"
                                        placeholder="Enter message"
                                        value={formData?.message}
                                        onChange={handleChange}
                                        className="textara-view"
                                    />
                                </div>
                            </div>


                        </form>
                    </div >
                </section>
                <div className="d-flex justify-content-center py-5">
                    <button type="button" className="cancel-button me-2 me-md-4" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`save-button ${loading ? 'loading' : ''}`}
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
                </div>
            </div>
        </>
    )
}
export default Contactus;