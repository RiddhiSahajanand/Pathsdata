import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import fileinput from "../../assets/images/fileinput.png";
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const AddFamily = () => {
    const navigate = useNavigate();
    const OrgFamily = JSON.parse(localStorage.getItem("openOrgFamily"));

    const OrgId = localStorage.getItem("org_id");

    const [logo, setLogo] = useState(null);
    const [loader, setLoader] = useState(false);
    const [organizationData, setOrganizationData] = useState([]);

    // const [orgId, setOrgId] = useState("");

    const [formData, setFormData] = useState({
        org_id: "",
        family_name: '',
        description: ''
    });

    console.log("openOrgFamily", OrgFamily);


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


    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            org_id: OrgId
        }));
    }, [OrgId]);


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
                family_name: formData.family_name,
                description: formData.description
            };

            // Add org_id only if it's selected
            if (formData.org_id) {
                payload.org_id = formData.org_id;
            }

            const res = await Axios.post('/family', payload, authorizationHeaders());

            if (res.data?.statusCode === 200 || res.data?.statusCode === 201) {
                toast.success('Family created successfully!');
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
            console.error("Error creating family:", err);
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
        GetOrganizationData();
    }, []);

    return (
        <>
            {loader && <div className="loader-overlay"><div className="loader"></div></div>}
            <div className=' pd mt-5'>
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Create Family</p>
                    </div>
                </div>
                <section className='add-content-section add-family'>
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
                        onClick={() => navigate("/family")}
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
                                "Create"
                            )
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddFamily;
















// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import fileinput from "../../assets/images/fileinput.png";
// import { authorizationHeaders, Axios } from '../../helper/Axios';

// const AddFamily = () => {

//     const navigate = useNavigate();

//     const [logo, setLogo] = useState(null);
//     const [loader, setLoader] = useState(false);
//     const [organizationData, setOrganizationData] = useState([]);


//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setLogo(URL.createObjectURL(file));
//         }
//     };

//     const GetOrganizationData = async () => {
//         setLoader(true);
//         try {
//             const res = await Axios.get(`/organization`, authorizationHeaders());
//             if (res.data?.statusCode === 200) {
//                 setOrganizationData(res.data.data);
//             }
//             else {
//                 toast.error(res.data?.message);
//             }
//         } catch (err) {
//             console.error("Error organization++", err);
//             if (err?.message === "Network Error") {
//                 setError(err.message);
//             }
//             if (err?.response?.data?.statusCode === "440") {
//                 toast.error("Session expired. Please log in again.");
//                 localStorage.clear();
//                 navigate("/sign-in");
//             } else {
//                 toast.error(err?.response?.data?.message || "An error occurred");
//             }
//         } finally {
//             setLoader(false);
//         }
//     }

//     useEffect(() => {
//         GetOrganizationData();
//     }, []);

//     return (
//         <>
//             <section className='add-content-section add-family pd mt-5'>
//                 <div className="second mt-3 mt-lg-4">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <p className="add-title">Create Family</p>
//                         </div>
//                     </div>

//                     <div className="row mt-4">
//                         <div className="col-lg-5 mb-3 ">
//                             <div className=''>
//                                 <div className="data-source-view">
//                                     {/* <img src={dataSourceicon} alt="" height={65} className="mb-4" /> */}
//                                     <p className="data-source-title">Welcome to Pathsdata!</p>

//                                     <span>Get Started With Family</span>

//                                     <button
//                                         type="button"
//                                         className={`create-btn w-100`}
//                                     >

//                                         Family Details
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-7 mb-3">
//                             <div className="col-lg-12 mb-4">
//                                 <label htmlFor="Name" className="form-label">Organization</label>
//                                 <div className=''>
//                                     <div className="add-input">
//                                         <select
//                                             name="role"
//                                             id="role"
//                                             // value={formData?.role}
//                                             // onChange={handleChange}
//                                             required
//                                         >
//                                             <option value="">Select Organization</option>
//                                             {organizationData.map((item, index) => {
//                                                 return (
//                                                     <>
//                                                         <option value="admin">{item?.org_id}</option>
//                                                     </>
//                                                 )
//                                             })}

//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-12 mb-4">
//                                 <label htmlFor="Name" className="form-label">Name</label>
//                                 <div className=''>
//                                     <div className="add-input">
//                                         <input type="text"
//                                             placeholder="Enter Name"
//                                             id="email_id"
//                                             name="email_id"
//                                             // value={formData.email_id}
//                                             // onChange={handleChange}
//                                             autoFocus
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-12 mb-4">
//                                 <label htmlFor="Name" className="form-label">Description</label>
//                                 <div className=''>
//                                     <div className="add-input">
//                                         <input type="text"
//                                             placeholder="Enter Description"
//                                             id="email_id"
//                                             name="email_id"
//                                             // value={formData.email_id}
//                                             // onChange={handleChange}
//                                             autoFocus
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* <div className="col-lg-12 mb-4">
//                                 <label htmlFor="Name" className="form-label">Logo (Optional)</label>

//                                 <div className="file-upload">
//                                     <input
//                                         type="file"
//                                         id="logoUpload"
//                                         accept="image/*"
//                                         onChange={handleFileChange}
//                                         hidden
//                                     />
//                                     <label htmlFor="logoUpload" className="upload-label">
//                                         {logo ? (
//                                             <img src={logo} alt="Uploaded Logo" className="preview-img" />
//                                         ) : (
//                                             <>
//                                                 <img src={fileinput} alt="Upload" className="upload-icon" />
//                                                 <span>Click To Upload Profile Image</span>
//                                             </>
//                                         )}
//                                     </label>
//                                 </div>
//                             </div>

//                             <div className="col-lg-12 mb-4">
//                                 <label htmlFor="role" className="form-label">Type of Family</label>
//                                 <div className="add-input">
//                                     <select
//                                         name="role"
//                                         id="role"
//                                         // value={formData?.role}
//                                         // onChange={handleChange}
//                                         required
//                                     >
//                                         <option value="">Select Type</option>
//                                         <option value="admin">Admin</option>
//                                         <option value="editor">Editor</option>
//                                         <option value="viewer">Viewer</option>
//                                     </select>
//                                 </div>
//                             </div> */}


//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-flex justify-content-end py-4">
//                     <button type="button" className="cancel-btn me-2 me-md-4"
//                         onClick={() => navigate("/family")}
//                     >
//                         Cancel
//                     </button>
//                     <button type="submit" className={`save-btn }`}
//                     // onClick={(e) => handleSubmit(e)}
//                     >
//                         Create
//                     </button>
//                 </div>
//             </section >

//         </>
//     )
// }

// export default AddFamily