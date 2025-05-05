// import { useNavigate } from "react-router-dom";
// import { authorizationHeaders, Axios } from "../../../helper/Axios";
// import { toast } from "react-toastify";
// import { useState } from "react";


// const initialState = {
//     role_name: "",
//     role_arn: "",
// }

// const AddResourcesIAM = () => {

//     const navigate = useNavigate();
//     const tenantId = localStorage.getItem("signin-tenantid");

//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState(initialState);


//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setLoading(true);

//         // const data = { ...formData };
//         try {
//             const res = await Axios.post(`/assume_roles`, formData, authorizationHeaders());

//             if (res?.data?.statusCode === 200) {
//                 toast.success(res?.data?.message);

//                 setFormData(initialState);
//                 navigate("/resourcesIAM")
//             }
//             else {
//                 toast.error(res?.data?.message);
//             }

//         } catch (err) {
//             console.error("Error Post resourcesIAM++", err);

//             if (err?.message === "Network Error") {
//                 toast.error(err?.message);
//             }
//             if (err?.response?.data?.statusCode === 400) {
//                 toast.error(err?.response?.data?.message);
//             }
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <>
//             <section className='add-content-section pd mt-5'>
//                 <div className="second mt-3 mt-lg-4">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <p className="add-title">Create Resources IAM</p>
//                         </div>
//                     </div>
//                     <form className="row mt-4" onSubmit={handleSubmit}>
//                         <div className="col-lg-6 mb-3 ">
//                             <label htmlFor="role_name" className="form-label">Name</label>
//                             {/* <div className=''> */}
//                             <div className="add-input">
//                                 <input
//                                     type="text"
//                                     id="role_name"
//                                     name="role_name"
//                                     placeholder="Enter Name"
//                                     value={formData?.role_name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* </div> */}
//                         </div>
//                         <div className="col-lg-6 mb-3 ">
//                             <label htmlFor="role_arn" className="form-label">Cross Account IAM Role</label>
//                             <div className="add-input">
//                                 <select
//                                     name="role_arn"
//                                     id="role_arn"
//                                     value={formData?.role_arn}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="">Select Role</option>
//                                     <option value="admin">Admin</option>
//                                     <option value="editor">Editor</option>
//                                     <option value="viewer">Viewer</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className="d-flex justify-content-end py-4">
//                             <button type="button" className="cancel-btn me-2 me-md-4" onClick={() => navigate(-1)}>
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 // className="save-btn"
//                                 className={`save-btn ${loading ? 'loading' : ''}`}

//                             >
//                                 {
//                                     loading ? (
//                                         <span
//                                             className="spinner-border spinner-border-sm me-2"
//                                             role="status"
//                                             aria-hidden="true"
//                                         ></span>
//                                     ) : (
//                                         "Create"
//                                     )
//                                 }
//                             </button>
//                         </div>
//                     </form>

//                 </div>

//             </section >
//         </>
//     )
// }
// export default AddResourcesIAM;


import { useNavigate } from "react-router-dom";
import { authorizationHeaders, Axios } from "../../../helper/Axios";
import { toast } from "react-toastify";
import { useState } from "react";

const initialState = {
    credential_type: "", // Default selection
    instance_profile_arn: "",
    instance_profile_name: "",
    ds_name: "",
    catalog_type: "",
    credential_role_arn: "",
};

const AddResourcesIAM = () => {
    const navigate = useNavigate();
    // const tenantId = localStorage.getItem("signin-tenantid");
    const familyId = localStorage.getItem("family_id");

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


        const data = {
            credential_type: formData.credential_type,
            family_id: familyId,
        };

        if (formData.credential_type === "instance_profile") {
            data.instance_profile_arn = formData.instance_profile_arn;
            data.instance_profile_name = formData.instance_profile_name;
        } else if (formData.credential_type === "data_source_catalog") {
            data.ds_name = formData.ds_name;
            data.catalog_type = formData.catalog_type;
            data.credential_role_arn = formData.credential_role_arn;
        }

        try {
            const res = await Axios.post(`/resource_iam`, data, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                setFormData(initialState);
                navigate("/resourcesIAM");
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error("Error Post resourcesIAM++", err);
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
    };

    return (
        <>
            <div className="pd mt-4">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Create Cluster Resource IAM</p>
                    </div>
                </div>
                <section className="add-content-section ">
                    <div className="second mt-3 mt-lg-4">

                        <form className="row mt-4" onSubmit={handleSubmit}>
                            <div className="col-lg-12 mb-3">
                                <label htmlFor="credential_type" className="form-label">Credential Type</label>
                                <div className="add-input">
                                    <select
                                        name="credential_type"
                                        id="credential_type"
                                        value={formData.credential_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Credential Type</option>
                                        <option value="instance_profile">Instance Profile</option>
                                        {/* <option value="data_source_catalog">Data Source Catalog</option> */}
                                    </select>
                                </div>
                            </div>

                            {/* Instance Profile Section */}
                            {formData.credential_type === "instance_profile" && (
                                <>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="instance_profile_name" className="form-label">Instance Profile Name</label>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="instance_profile_name"
                                                name="instance_profile_name"
                                                placeholder="Enter Instance Profile Name"
                                                value={formData.instance_profile_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="instance_profile_arn" className="form-label">Instance Profile ARN</label>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="instance_profile_arn"
                                                name="instance_profile_arn"
                                                placeholder="Enter Instance Profile ARN"
                                                value={formData.instance_profile_arn}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/*  data_source_catalog Section */}
                            {formData.credential_type === "data_source_catalog" && (
                                <>
                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="ds_name" className="form-label">DS Name</label>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="ds_name"
                                                name="ds_name"
                                                placeholder="Enter Data Source Name"
                                                value={formData.ds_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="catalog_type" className="form-label">Catalog Type</label>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="catalog_type"
                                                name="catalog_type"
                                                placeholder="Enter Catalog Type"
                                                value={formData.catalog_type}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="credential_role_arn" className="form-label">Credential Role ARN</label>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="credential_role_arn"
                                                name="credential_role_arn"
                                                placeholder="Enter Credential Role ARN"
                                                value={formData.credential_role_arn}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </section>
                <div className="d-flex justify-content-center py-5">
                    <button type="button" className="cancel-button me-2 me-md-4" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className={`save-button ${loading ? "loading" : ""}`} onClick={handleSubmit}>
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : (
                            "Create"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddResourcesIAM;
