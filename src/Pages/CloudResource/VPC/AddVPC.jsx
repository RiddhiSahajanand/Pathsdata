import { useNavigate } from "react-router-dom";
import deletebtn from "../../../assets/images/delete-btn.png";
import editbtn from "../../../assets/images/edit-btn.png";
import Subnet from "../../../Components/Modal/Subnet/Subnet";
import { useEffect, useState } from "react";
import SecurityGroup from "../../../Components/Modal/SecurityGroup/SecurityGroup";
import { Axios, authorizationHeaders } from "../../../helper/Axios";
import { toast } from "react-toastify";
import EditSubnet from "../../../Components/Modal/Subnet/EditSubnet";
import EditSecurityGroup from "../../../Components/Modal/SecurityGroup/EditSecurityGroup";


const AddVPC = () => {

    const navigate = useNavigate();
    const tenantId = localStorage.getItem("signin-tenantid");
    const familyId = localStorage.getItem("family_id");

    const [loading, setLoading] = useState(false);
    const [subnetShow, setSubnetShow] = useState(false);
    const [editSubnetShow, setEditSubnetShow] = useState(false);
    const [editSubnetData, setEubnetData] = useState({});

    const [securityShow, setSecurityShow] = useState(false);
    const [editSecurityShow, setEditSecurityShow] = useState(false);
    const [editSecurityData, setEditSecurityData] = useState({});

    const [subnetList, setSubnetList] = useState([]);
    const [securityList, setSecurityList] = useState([]);

    const [formData, setFormData] = useState({
        vpc_name: "",
        vpc_id: "",
        security_group_ids: [],
        subnet_ids: [],
        // vpc_ep_id: "",
    });

    console.log(formData);

    const handleClose = () => {
        setSubnetShow(false);
        setEditSubnetShow(false);
        setSecurityShow(false);
        setEditSecurityShow(false);
    }

    useEffect(() => {
        const storedSubnets = JSON.parse(localStorage.getItem("subnets")) || [];
        const storedSecurityGroup = JSON.parse(localStorage.getItem("Securitygroup")) || [];

        setSubnetList(storedSubnets);
        setSecurityList(storedSecurityGroup);

        setFormData((prev) => ({
            ...prev,
            subnet_ids: storedSubnets,
            security_group_ids: storedSecurityGroup,
        }));
    }, [subnetShow, securityShow, editSubnetShow, editSecurityShow]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle subnet deletion
    const handleEditSubnet = (item) => {
        console.log("item", item);
        setEubnetData(item);
        setEditSubnetShow(true);

    }
    const handleEditSecurity = (item) => {
        console.log("item", item);
        setEditSecurityData(item);
        setEditSecurityShow(true);
    }
    const handleDelete = (index) => {
        const updatedSubnets = subnetList.filter((_, i) => i !== index);
        localStorage.setItem("subnets", JSON.stringify(updatedSubnets));
        setSubnetList(updatedSubnets);
    };

    const handleSecurityDelete = (index) => {
        const updatedSecurity = securityList.filter((_, i) => i !== index);
        localStorage.setItem("Securitygroup", JSON.stringify(updatedSecurity));
        setSecurityList(updatedSecurity);
    }

    const handleCancel = () => {
        navigate(-1);
        localStorage.removeItem("subnets");
        localStorage.removeItem("Securitygroup");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { vpc_name, vpc_id, security_group_ids, subnet_ids } = formData;

        if (
            !vpc_name.trim() ||
            !vpc_id.trim() ||
            security_group_ids.length === 0 ||
            subnet_ids.length === 0
            // ||
            // !vpc_ep_id.trim()
        ) {
            setLoading(false);
            toast.error("Please fill in all required fields."); // Display error toast
            return; // Stop submission
        }


        const payload = { family_id: familyId, ...formData }

        try {
            const res = await Axios.post(`/network`, payload, authorizationHeaders());
            console.log("res", res);

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                setFormData({
                    vpc_name: "",
                    vpc_id: "",
                    security_group_ids: [],
                    subnet_ids: [],
                    // vpc_ep_id: "",
                });
                navigate("/vpc");
                localStorage.removeItem("subnets");
                localStorage.removeItem("Securitygroup");
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            // Handle 440 Unauthorized Error
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
            console.error("Error posting resourcesIAM", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="pd mt-4 add-section-background">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Create VPC</p>
                    </div>
                </div>
                <section className='add-content-section'>
                    <div className="second">
                        <div className="row mt-4">
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="Name" className="form-label">Name</label>
                                <div className=''>
                                    <div className="add-input">
                                        <input
                                            type="text"
                                            name="vpc_name"
                                            placeholder="Enter Name"
                                            value={formData.vpc_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3 ">
                                <label htmlFor="Name" className="form-label">VPC ID</label>
                                <div className=''>
                                    <div className="add-input">
                                        <input
                                            type="text"
                                            name="vpc_id"
                                            placeholder="Enter VPC"
                                            value={formData.vpc_id}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-6 mb-3 ">
                                <div className='subnet-view'>
                                    <div className="d-flex justify-content-between subnet">
                                        <label htmlFor="Name" className="form-label">Subnet</label>
                                        <div>
                                            <button className="save-btn" type="button" onClick={() => setSubnetShow(true)}>
                                                + Add
                                            </button>
                                        </div>
                                    </div>

                                    {subnetList.map((item, index) => (
                                        <div className="add-input mt-3 mb-3" key={index}>
                                            <div className="input-group">
                                                <input type="text" value={item} readOnly />
                                                <span className="input-delete" >
                                                    <img src={editbtn} alt="Edit" className='me-4' style={{ cursor: 'pointer' }} onClick={() => handleEditSubnet(item)} />
                                                    <img src={deletebtn} alt="Delete" onClick={() => handleDelete(index)} />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3 ">
                                <div className='subnet-view'>
                                    <div className="d-flex justify-content-between subnet">
                                        <label htmlFor="Name" className="form-label">Security Group</label>
                                        <div>
                                            <button className="save-btn" type="button" onClick={() => setSecurityShow(true)}>
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                    {securityList.map((item, index) => (
                                        <div className="add-input mt-3 mb-3" key={index}>
                                            <div className="input-group">
                                                <input type="text" value={item} readOnly />
                                                <span className="input-delete" >
                                                    <img src={editbtn} alt="Edit" className='me-4' style={{ cursor: 'pointer' }} onClick={() => handleEditSecurity(item)} />
                                                    <img src={deletebtn} alt="Delete" onClick={() => handleSecurityDelete(index)} />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* <div className="row mt-4">
                        <label htmlFor="Name" className="form-label">VPC Endpoint</label>
                        <div className="col-lg-12 mb-3 ">
                            <div className=''>
                                <div className="add-input">
                                    <input
                                        type="text"
                                        name="vpc_ep_id"
                                        placeholder="Enter VPC Endpoint"
                                        value={formData.vpc_ep_id}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                    </div>

                </section>
                <div className="d-flex justify-content-center py-5">
                    <button className="cancel-button me-2 me-md-4" type="button" onClick={handleCancel}>
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className={`save-button ${loading ? 'loading' : ''}  `}
                        disabled={loading}
                        onClick={handleSubmit}>
                        {
                            loading ? (
                                <span
                                    className="spinner-border spinner-border-sm me-3 ms-3"
                                    role="status"
                                    aria-hidden="true"></span>) : ("Create")
                        }
                    </button>
                </div>

                <Subnet show={subnetShow} handleClose={handleClose} />
                <EditSubnet show={editSubnetShow} handleClose={handleClose} editData={editSubnetData} />
                <EditSecurityGroup show={editSecurityShow} handleClose={handleClose} editData={editSecurityData} />
                <SecurityGroup show={securityShow} handleClose={handleClose} />
            </div>
        </>
    )
}
export default AddVPC;