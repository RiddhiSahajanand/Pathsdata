import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const EditOrganization = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const familyId = localStorage.getItem("family_id");

    const organization = location?.state?.organization || {};


    const [logo, setLogo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        org_name: '',
        description: ''
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogo(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Basic validation
        if (!formData.org_name.trim()) {
            toast.error('Organization name is required');
            setLoading(false);
            return;
        }

        const data = {
            ...formData,
            org_id: organization?.org_id,
        }
        try {
            const res = await Axios.patch('organization', data, authorizationHeaders());
            console.log("Organization-response", res);

            if (res?.data?.statusCode === 200) {
                toast.success('Organization edited successfully!');
                setFormData({
                    org_name: '',
                    description: ''
                });
                navigate("/organization");
            }
        } catch (error) {
            console.error('Error creating organization:', error);

            if (error?.response?.data?.statusCode === "440") {
                toast.error(error?.response?.message);
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else if (error?.response?.data?.statusCode === 403) {
                toast.error(error?.response?.data?.message);
                navigate("/subscription-list");
            }
            else {
                toast.error(error?.response?.data?.message || "An error occurred");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (organization) {
            setFormData({
                org_name: organization?.org_name,
                description: organization?.org_description
            });
        }
    }, [organization]);

    return (
        <>

            <div className='pd mt-5'>
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Edit Organization</p>
                    </div>
                </div>
                <section className='add-content-section add-family '>
                    <div className="second mt-3 mt-lg-4">
                        <div className="row mt-4">
                            <div className="col-lg-5 mb-3 ">
                                <div className=''>
                                    <div className="data-source-view">
                                        <p className="data-source-title">Welcome to PATHSDATA!</p>
                                        <span>Get Started With Family</span>

                                        <button
                                            type="button"
                                            className={`create-btn w-100`}
                                        >
                                            Organization Details
                                        </button>

                                        <button
                                            type="button"
                                            className={`create-btn attach w-100`}
                                        >
                                            Attach Family
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 mb-3">
                                <div className="col-lg-12 mb-4">
                                    <label htmlFor="org_name" className="form-label">Name</label>
                                    <div className=''>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                id="org_name"
                                                name="org_name"
                                                value={formData.org_name}
                                                onChange={handleChange}
                                                autoFocus
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <div className=''>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                placeholder="Enter Description"
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Uncomment if you want to use logo upload
                            <div className="col-lg-12 mb-4">
                                <label htmlFor="Name" className="form-label">Logo (Optional)</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        id="logoUpload"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                    <label htmlFor="logoUpload" className="upload-label">
                                        {logo ? (
                                            <img src={logo} alt="Uploaded Logo" className="preview-img" />
                                        ) : (
                                            <>
                                                <img src={fileinput} alt="Upload" className="upload-icon" />
                                                <span>Click To Upload Profile Image</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>

                </section>
                <div className="d-flex justify-content-center py-5">
                    <button
                        type="button"
                        className="cancel-button me-2 me-md-4"
                        onClick={() => navigate("/organization")}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`save-button ${loading ? 'loading' : ''} `}
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {
                            loading ? (
                                <span
                                    className="spinner-border spinner-border-sm me-3 ms-3"
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

export default EditOrganization