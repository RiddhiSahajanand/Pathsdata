
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { toast } from "react-toastify";
import dataSourceicon from "../../assets/images/data-source.png";
import { Form, Row, Col } from "react-bootstrap";

const initialState = {
    name: "", // Default selection
    email_id: "",
    role: "",
    image: ""
};


const CreateDataSource = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");

    console.log('====================================');
    console.log("selectedFile", selectedFile);
    console.log('====================================');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Show preview if needed
            setFileName(file.name); // Store file name

        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        navigate("/additional");
        // e.preventDefault();
        // // setLoading(true);

        // try {
        //     const res = await Axios.post(`/backend/users/invite_user`, formData, authorizationHeaders());

        //     if (res?.data?.statusCode === 200) {
        //         toast.success(res?.data?.message);
        //         setFormData(initialState);
        //         navigate("/user-management");
        //     } else {
        //         toast.error(res?.data?.message);
        //     }
        // } catch (err) {
        //     console.error("Error Post resourcesIAM++", err);
        //     if (err?.message === "Network Error") {
        //         toast.error(err?.message);
        //     }
        //     if (err?.response?.data?.statusCode === 400) {
        //         toast.error(err?.response?.data?.message);
        //     }
        //     if (err?.response?.data?.statusCode === "440") {
        //         toast.error("Session expired. Please log in again.");
        //         localStorage.clear();    
        //         navigate("/sign-in");
        //     } else {
        //         toast.error(err?.response?.data?.message || "An error occurred");
        //     }
        // }
    };

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <section className='add-content-section pd mt-4'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row mt-4">
                        <div className="col-lg-6 mb-3 ">
                            <div className=''>
                                <div className="data-source-view ">
                                    <img src={dataSourceicon} alt="" height={65} className="mb-4" />
                                    <p className="data-source-title">Create Data Source</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <div className="col-lg-12 mb-3">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <div className=''>
                                    <div className="add-input">
                                        <input type="text"
                                            placeholder="Enter Email ID"
                                            id="email_id"
                                            name="email_id"
                                            value={formData.email_id}
                                            onChange={handleChange}
                                            autoFocus required />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3   ">
                                <label htmlFor="role" className="form-label">Data Source Type</label>
                                <div className="add-input">
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData?.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Data Source Type</option>
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end py-4">
                    <button type="button" className="cancel-btn me-2 me-md-4" onClick={() => navigate("/data-catalog")}>
                        Cancel
                    </button>
                    <button type="submit" className={`save-btn }`} onClick={(e) => handleSubmit(e)}>
                        Next
                    </button>
                </div>
            </section >
        </>
    )
}
export default CreateDataSource;