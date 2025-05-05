import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { toast } from "react-toastify";
import uploadicon from "../../assets/images/upload-img.png";

const initialState = {
    // name: "", // Default selection
    email_id: "",
    role: "",
    // image: ""
};


const AddMember = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const familyId = localStorage.getItem("family_id");

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);

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
        e.preventDefault();
        setLoading(true);
        const payload = { family_id: familyId, ...formData }

        try {
            const res = await Axios.post(`/users/invite_user`, payload, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                setFormData(initialState);
                navigate("/user-management");
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

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="pd mt-4">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Add Member</p>
                    </div>
                </div>
                <section className='add-content-section '>
                    <div className="second mt-3 mt-lg-4">
                        <div className="row mt-4">
                            {/* <div className=" col-lg-6 mb-3  ">
                            <label htmlFor="Name" className="form-label">Profile</label>
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ cursor: "pointer", width: "100%", height: "50px", backgroundColor: '#060920', borderRadius: 10 }}
                                onClick={handleClick}
                            >
                                <img src={uploadicon} style={{ height: 28 }} />
                                <span className="text-white ms-3" style={{ fontWeight: 600, fontSize: 16 }}>
                                    {fileName ? fileName : "Click To Upload Profile Image"}
                                </span>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="d-none"
                            />
                        </div> */}
                            {/* <div className="col-lg-4 mb-3 ">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <div className=''>
                                    <div className="add-input">
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            autoFocus
                                            height="20px"
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="Name" className="form-label">Email ID</label>
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
                            <div className="col-lg-6 mb-3   ">
                                <label htmlFor="role" className="form-label">Role</label>
                                <div className="add-input">
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData?.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <div className="d-flex justify-content-center py-5">
                    <button type="button" className="cancel-button me-2 me-md-4" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={`save-button ${loading ? 'loading' : ''} `}
                        disabled={loading}
                        onClick={handleSubmit}>
                        {
                            loading ? (
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
export default AddMember;