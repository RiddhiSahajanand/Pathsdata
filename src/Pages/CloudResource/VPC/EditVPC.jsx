

import { useNavigate, useLocation } from "react-router-dom";
import deletebtn from "../../../assets/images/delete-btn.png";
import editbtn from "../../../assets/images/edit-btn.png";
import Subnet from "../../../Components/Modal/Subnet/Subnet";
import { useEffect, useState } from "react";
import SecurityGroup from "../../../Components/Modal/SecurityGroup/SecurityGroup";
import { Axios, authorizationHeaders } from "../../../helper/Axios";
import { toast } from "react-toastify";
import EditSecurityGroup from "../../../Components/Modal/SecurityGroup/EditSecurityGroup";
import EditSubnet from "../../../Components/Modal/Subnet/EditSubnet";

const EditVPC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the state from navigation
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

    // console.log("subnetList", subnetList);


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


    // useEffect(() => {
    //     const storedSubnets = JSON.parse(localStorage.getItem("subnets")) || [];
    //     const storedSecurityGroup = JSON.parse(localStorage.getItem("Securitygroup")) || [];
    //     console.log("storedSubnets", storedSubnets);

    //     setSubnetList(storedSubnets);
    //     setSecurityList(storedSecurityGroup);

    //     if (location.state) {
    //         setFormData({
    //             vpc_name: location.state.vpc_name || "",
    //             vpc_id: location.state.vpc_id || "",
    //             security_group_ids: location.state.security_group_ids || [],
    //             subnet_ids: location.state.subnet_ids || [],
    //             vpc_ep_id: location.state.vpc_ep_id || "",
    //         });

    //         // If both subnets and security groups are empty in localStorage, set them
    //         if (storedSubnets.length === 0) {
    //             localStorage.setItem("subnets", JSON.stringify(location.state.subnet_ids || []));
    //         }
    //         if (storedSecurityGroup.length === 0) {
    //             localStorage.setItem("Securitygroup", JSON.stringify(location.state.security_group_ids || []));
    //         }
    //     } else {
    //         setSubnetList(storedSubnets);
    //         setSecurityList(storedSecurityGroup);
    //     }
    // }, [location.state, subnetShow, securityShow, editSecurityShow, editSubnetShow]);

    useEffect(() => {
        let storedSubnets = JSON.parse(localStorage.getItem("subnets")) || [];
        let storedSecurityGroup = JSON.parse(localStorage.getItem("Securitygroup")) || [];

        console.log("storedSubnets before update", storedSubnets);

        if (location.state) {
            setFormData({
                vpc_name: location.state.vpc_name || "",
                vpc_id: location.state.vpc_id || "",
                security_group_ids: location.state.security_group_ids || [],
                subnet_ids: location.state.subnet_ids || [],
                // vpc_ep_id: location.state.vpc_ep_id || "",
            });

            // If both subnets and security groups are empty in localStorage, store location.state values
            if (storedSubnets.length === 0 && location.state.subnet_ids?.length > 0) {
                localStorage.setItem("subnets", JSON.stringify(location.state.subnet_ids));
                storedSubnets = location.state.subnet_ids; // Update the reference
            }
            if (storedSecurityGroup.length === 0 && location.state.security_group_ids?.length > 0) {
                localStorage.setItem("Securitygroup", JSON.stringify(location.state.security_group_ids));
                storedSecurityGroup = location.state.security_group_ids; // Update the reference
            }
        }

        // Immediately update state with the latest values
        setSubnetList(storedSubnets);
        setSecurityList(storedSecurityGroup);

        console.log("storedSubnets after update", storedSubnets);
    }, [location.state, subnetShow, securityShow, editSecurityShow, editSubnetShow]);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
    };

    const handleCancel = () => {
        navigate(-1);
        localStorage.removeItem("subnets");
        localStorage.removeItem("Securitygroup");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        const payload = {
            family_id: familyId,
            vpc_name: formData.vpc_name,
            vpc_id: formData.vpc_id,
            security_group_ids: securityList,
            subnet_ids: subnetList,
            // vpc_ep_id: formData.vpc_ep_id,
        }

        try {
            const res = await Axios.patch(`/network`, payload, authorizationHeaders());
            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                navigate("/vpc");
                localStorage.removeItem("subnets");
                localStorage.removeItem("Securitygroup");
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error("Error updating VPC", err);
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
        <div className="pd mt-4">
            <div className="add-section row">
                <div className="col-lg-12">
                    <p className="add-title">Edit VPC</p>
                </div>
            </div>
            <section className='add-content-section '>
                <div className="second">
                    <div className="row mt-4">
                        <div className="col-lg-6 mb-3 ">
                            <label className="form-label">Name</label>
                            <div className="add-input">
                                <input
                                    type="text"
                                    name="vpc_name"
                                    placeholder="Enter Name"
                                    value={formData.vpc_name}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3 ">
                            <label className="form-label">VPC ID</label>
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

                    <div className="row mt-4">
                        <div className="col-lg-6 mb-3">
                            <div className='subnet-view'>
                                <div className="d-flex justify-content-between subnet">
                                    <label className="form-label">Subnet</label>
                                    <button className="save-btn" type="button" onClick={() => setSubnetShow(true)}>+ Add</button>
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
                        <div className="col-lg-6 mb-3">
                            <div className='subnet-view'>
                                <div className="d-flex justify-content-between subnet">
                                    <label className="form-label">Security Group</label>
                                    <button className="save-btn" type="button" onClick={() => setSecurityShow(true)}>+ Add</button>
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
                    <label className="form-label">VPC Endpoint</label>
                    <div className="col-lg-12 mb-3">
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
                </div> */}
                </div>
            </section>
            <div className="d-flex justify-content-center py-5">
                <button className="cancel-button me-2 me-md-4" type="button" onClick={handleCancel}>Cancel</button>
                <button
                    type="submit"
                    className={`save-button ${loading ? 'loading' : ''} `}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {
                        loading ? (
                            <span
                                className="spinner-border spinner-border-sm me-2 ms-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            "Edit"
                        )
                    }
                </button>
            </div>

            <Subnet show={subnetShow} handleClose={handleClose} />
            <SecurityGroup show={securityShow} handleClose={handleClose} />
            <EditSubnet show={editSubnetShow} handleClose={handleClose} editData={editSubnetData} subnetList={subnetList} />
            <EditSecurityGroup show={editSecurityShow} handleClose={handleClose} editData={editSecurityData} />

        </div>
    );
};

export default EditVPC;
