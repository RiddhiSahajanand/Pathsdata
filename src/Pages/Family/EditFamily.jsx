import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const EditFamily = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const OrgFamily = JSON.parse(localStorage.getItem("openOrgFamily"));
    const OrgId = localStorage.getItem("org_id");

    const family = location?.state?.family || {};
    console.log(location, family);


    const [logo, setLogo] = useState(null);
    const [loader, setLoader] = useState(false);
    const [organizationData, setOrganizationData] = useState([]);

    // const [orgId, setOrgId] = useState("");

    const [formData, setFormData] = useState({
        org_id: '',
        family_name: '',
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

    const GetOrganizationData = async () => {
        try {
            const res = await Axios.get(`/organization`, authorizationHeaders());
            if (res.data?.statusCode === 200) {
                setOrganizationData(res.data.data);
            } else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error organization++", err);
            if (err?.message === "Network Error") {
                toast.error("Network Error");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        // Validate required fields
        if (!formData.family_name.trim()) {
            toast.error('Family name is required');
            setLoader(false);
            return;
        }

        try {
            const payload = {
                family_id: family?.family_id,
                family_name: formData.family_name,
                description: formData.description
            };

            // Add org_id only if it's selected
            if (formData?.org_id) {
                payload.org_id = formData?.org_id;
            }

            const res = await Axios.patch('/family', payload, authorizationHeaders());

            if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
                toast.success('Family edited successfully!');
                {
                    OrgFamily === true ?
                        navigate(`/organization-dash/${OrgId}`) :
                        (
                            localStorage.removeItem("org_id"),
                            localStorage.setItem("openCloudOption", false),
                            navigate("/family")
                        )
                }
            } else {
                toast.error(res.data?.message || 'Failed to create family');
            }
        } catch (err) {
            console.error("Error editing family:", err);

            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "Failed to create family");
            }
        } finally {
            setLoader(false);
        }
    };


    useEffect(() => {
        if (family) {
            setFormData({
                family_name: family?.family_name || family?.name,
                description: family?.description,
                org_id: family?.org_id,
            });
        }
    }, [family]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            org_id: OrgId
        }));
    }, [OrgId]);

    useEffect(() => {
        GetOrganizationData();
    }, []);


    return (
        <>
            <div className='pd mt-5'>
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Edit Family</p>
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
                                            Family Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 mb-3">
                                <div className="col-lg-12 mb-4">
                                    <label htmlFor="org_id" className="form-label">Organization</label>
                                    <div className=''>
                                        <div className="add-input">
                                            <select
                                                name="org_id"
                                                id="org_id"
                                                value={formData.org_id}
                                                onChange={handleChange}
                                                disabled={OrgId}
                                            >
                                                <option value="">Select Organization (Optional)</option>
                                                {organizationData.map((item) => (
                                                    <option key={item.org_id} value={item.org_id}>
                                                        {item.org_name || item.org_id}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-4">
                                    <label htmlFor="family_name" className="form-label">Name</label>
                                    <div className=''>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                placeholder="Enter Name"
                                                id="family_name"
                                                name="family_name"
                                                value={formData.family_name}
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
                        onClick={() => {
                            navigate("/family");
                            localStorage.setItem("openCloudOption", false);
                        }}
                        disabled={loader}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={`save-button ${loader ? 'loading' : ''} `}
                        disabled={loader}
                        onClick={handleSubmit}
                    >
                        {
                            loader ? (
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

export default EditFamily