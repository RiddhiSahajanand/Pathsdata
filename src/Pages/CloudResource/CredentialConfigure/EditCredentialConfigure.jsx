
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { authorizationHeaders, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';

const initialState = {
    role_name: "",
    role_arn: ""
}

const EditCredentialConfigure = () => {

    const location = useLocation();
    const navigate = useNavigate();
    // const tenantId = localStorage.getItem("signin-tenantid");
    const familyId = localStorage.getItem("family_id");

    const Credentialconfigure = location?.state?.credentialconfigure || {};

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
        setLoading(true);

        const payload = { family_id: familyId, ...formData }


        try {
            const res = await Axios.patch(`/credential_configure`, payload, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);

                setFormData(initialState);
                navigate("/credential-configure")
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
            setLoading(false);
        }
    }


    useEffect(() => {
        setFormData({
            role_name: Credentialconfigure?.role_name || "",
            role_arn: Credentialconfigure?.role_arn || ""
        });
    }, [Credentialconfigure]);


    return (
        <>
            <div className='pd mt-4'>
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Edit Credential Configure</p>
                    </div>
                </div>
                <section className='add-content-section '>
                    <div className="second mt-3 mt-lg-4">
                        <form className="row mt-4" onSubmit={handleSubmit}>
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="role_name" className="form-label">Name</label>
                                {/* <div className=''> */}
                                <div className="add-input">
                                    <input
                                        type="text"
                                        id="role_name"
                                        name="role_name"
                                        placeholder="Enter Name"
                                        value={formData?.role_name}
                                        onChange={handleChange}
                                        readOnly />
                                </div>
                                {/* </div> */}
                            </div>
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="role_arn" className="form-label">IAM Role</label>
                                <div className="add-input">
                                    {/* <select
                                    name="role_arn"
                                    id="role_arn"
                                    value={formData?.role_arn}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="editor">Editor</option>
                                    <option value="viewer">Viewer</option>
                                </select> */}
                                    <input
                                        type="text"
                                        id="role_arn"
                                        name="role_arn"
                                        placeholder="Enter Role Name"
                                        value={formData?.role_arn}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <div className="d-flex justify-content-center py-5">
                    <button type="button" className="cancel-button me-2 me-md-4" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        // className="save-btn"
                        onClick={handleSubmit}
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
                                "Edit"
                            )
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditCredentialConfigure