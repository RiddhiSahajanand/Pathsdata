

import { useNavigate } from "react-router-dom";
import { authorizationHeaders, Axios } from "../../helper/Axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import Select from 'react-select';

import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import plusicon from "../../assets/images/plus.png";


const initialState = {
    cluster_name: "",
    cluster_type: "standalone", // Cluster Type
    assume_role_arn: "", // Credential Configure
    network: "",
    region: "",
    subnet_id: "", // Master Node Subnet
    sg_ids: [], // Master Node Security group
    instance_type: "", // Master Node Type
    runtime: "", // Pathsdata Run Time
    ebs_size: "", // EBS Size
    instance_profile_name: "", // Master Node Profile instance_profile_name
    worker_details: {
        instance_type: "", // Work Node Type
        instance_profile_name: "", // Work Node Profile
        subnet_id: "", // Work Node Subnet
        sg_ids: [], // Work Node Security Group
        ebs_size: "", // Work Node EBS
        number_worker_nodes: "", // Number Worker
    }
}

const AddCluster = () => {

    const navigate = useNavigate();
    const tenantId = localStorage.getItem("signin-tenantid");
    const familyId = localStorage.getItem("family_id");


    const [credentialList, setCredentialList] = useState([]);
    const [networkList, setNetworkList] = useState([]);
    const [resourcesIAMList, setResourcesIAMList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    console.log(formData);


    const selectedNetworkList = networkList?.find((i) => i.vpc_name === formData.network);



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("worker_")) {
            const key = name.replace("worker_", "");
            setFormData((prev) => ({
                ...prev,
                worker_details: {
                    ...prev.worker_details,
                    [key]: value,
                },
            }));
        }
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        // e.preventDefault();

        const payload = {
            family_id: familyId,
            cluster_name: formData.cluster_name,
            cluster_type: formData.cluster_type,
            assume_role_arn: formData.assume_role_arn,
            subnet_id: formData.subnet_id,
            sg_ids: formData.sg_ids,
            region: formData.region,
            instance_type: formData.instance_type,
            runtime: formData.runtime,
            ebs_size: parseInt(formData.ebs_size),
            instance_profile_name: formData.instance_profile_name,
            tags: [{
                Key: "CreatedBy",
                Value: "Nithya"
            }]
        };

        if (formData.cluster_type === "distributed") {
            payload.worker_details = {
                instance_type: formData.worker_details?.instance_type,
                instance_profile_name: formData.worker_details?.instance_profile_name,
                subnet_id: formData.worker_details?.subnet_id,
                sg_ids: formData.worker_details?.sg_ids,
                ebs_size: parseInt(formData.worker_details?.ebs_size),
                number_worker_nodes: parseInt(formData.worker_details?.number_worker_nodes),
            }
        }

        console.log("Submit-Cluster", payload);



        try {
            setLoading(true);

            const res = await Axios.post(`/clusters`, payload, authorizationHeaders());
            console.log("Post-Cluster++", res);

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                // toast.success('Cluster created successfully!');

                setFormData(initialState);
                navigate("/cluster")
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (err) {
            console.error("Error-Post-Cluster++", err);

            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                localStorage.setItem("openCloudOption", false);
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "Failed to create cluster");
            }
        } finally {
            setLoading(false);
        }
    }




    const GetCredentialConfig = async () => {
        try {
            const res = await Axios.get(`/credential_configure?family_id=${familyId}`, authorizationHeaders());

            if (res.data?.statusCode === 200) {
                setCredentialList(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error resourcesIAM++", err);

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

    const GetNetwork = async () => {
        try {
            const res = await Axios.get(`/network?family_id=${familyId}`, authorizationHeaders());

            if (res.data?.statusCode === 200) {
                setNetworkList(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error resourcesIAM++", err);

            if (err?.message === "Network Error") {
                toast.error("Network Error");
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        }
    }

    const GetResourcesIAM = async () => {
        try {
            const res = await Axios.get(`/resource_iam?family_id=${familyId}`, authorizationHeaders());

            if (res.data?.statusCode === 200) {
                setResourcesIAMList(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error resourcesIAM++", err);

            if (err?.message === "Network Error") {
                toast.error("Network Error");
            }
            if (err?.response?.data?.statusCode === "440") {
                toast.error("Session expired. Please log in again.");
                localStorage.clear();
                navigate("/sign-in");
            } else {
                toast.error(err?.response?.data?.message || "An error occurred");
            }
        }
    }

    useEffect(() => {
        GetCredentialConfig();
        GetNetwork();
        GetResourcesIAM();
    }, []);

    return (
        <>
            <div className="pd mt-4">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">Create Cluster Creations</p>
                    </div>
                </div>

                
                <section className='add-content-section mb-5'>
                    <p className="cluster-section-title">Basic Setting</p>

                    <div className="second mt-3 mt-lg-4">
                        <form className="row mt-4">
                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="cluster_name" className="form-label">Name</label>
                                <div className=''>
                                    <div className="add-input">
                                        <input
                                            type="text"
                                            id="cluster_name"
                                            name="cluster_name"
                                            placeholder="Enter Name"
                                            value={formData.cluster_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="cluster_type" className="form-label">Cluster Type</label>
                                <div className="add-input">
                                    <select
                                        name="cluster_type"
                                        id="cluster_type"
                                        value={formData?.cluster_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Types</option>
                                        <option value="standalone">Standalone</option>
                                        <option value="distributed">Distributed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="assume_role_arn" className="form-label">Credential Configure</label>

                                {
                                    credentialList?.length > 0 ? (
                                        <>
                                            <div className="add-input">
                                                <select
                                                    name="assume_role_arn"
                                                    id="assume_role_arn"
                                                    value={formData?.assume_role_arn}
                                                    onChange={handleChange}
                                                    required>
                                                    <option value="">Select Credential Configure</option>
                                                    {credentialList?.map((i, index) => (
                                                        <option key={index} value={i.role_arn}>
                                                            {i.role_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <button className="add-btn boreder-0 " type="button" onClick={() => navigate("/add-credential-configure")}>
                                                    <img src={plusicon} className='me-2' /> Create
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </section>
                <section className='add-content-section mb-5'>
                    <p className="cluster-section-title">Network Setting</p>

                    <div className="second mt-3 mt-lg-4">
                        <form className="row mt-4">

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="network" className="form-label">Network</label>

                                {
                                    networkList?.length > 0 ? (
                                        <>
                                            <div className="add-input">
                                                <select
                                                    name="network"
                                                    id="network"
                                                    value={formData?.network}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Network</option>
                                                    {networkList?.map((i, index) => (
                                                        <option key={index} value={i.role_arn}>
                                                            {i.vpc_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <button className="add-btn boreder-0 " type="button" onClick={() => navigate("/add-vpc")}>
                                                    <img src={plusicon} className='me-2' /> Create
                                                </button>
                                            </div>
                                        </>
                                    )
                                }

                            </div>

                            <>
                                <div className="col-lg-6 mb-4 ">
                                    <label htmlFor="subnet_id" className="form-label">Master Node Subnet</label>
                                    <div className="add-input">
                                        <select
                                            name="subnet_id"
                                            id="subnet_id"
                                            value={formData?.subnet_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Master Node Subnet</option>

                                            {
                                                selectedNetworkList?.subnet_ids?.map((i, index) => (
                                                    <option key={index} value={i}>
                                                        {i}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-4 ">
                                    <label htmlFor="sg_ids" className="form-label">Master Node Security group</label>
                                    <div className="add-input">
                                        {/* <select
                                                name="sg_ids"
                                                id="sg_ids"
                                                value={formData?.sg_ids}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Master Node Security group</option>

                                                {
                                                    selectedNetworkList.security_group_ids?.map((i, index) => (
                                                        <option key={index} value={i}>
                                                            {i}
                                                        </option>
                                                    ))
                                                }
                                            </select> */}


                                        <Select
                                            isMulti
                                            options={selectedNetworkList?.security_group_ids?.map((i) => ({
                                                label: i,
                                                value: i,
                                            }))}
                                            value={formData?.sg_ids?.map((i) => ({ label: i, value: i }))}
                                            onChange={(selectedOptions) => {
                                                // Handle multi-selection change
                                                const selectedValues = selectedOptions.map(option => option.value);
                                                handleChange({
                                                    target: {
                                                        name: 'sg_ids',
                                                        value: selectedValues,
                                                    }
                                                });
                                            }}
                                            name="sg_ids"
                                            id="sg_ids"
                                            getOptionLabel={(option) => option.label}
                                            getOptionValue={(option) => option.value}
                                            placeholder="Select Master Node Security group"
                                            className="w-100"
                                            styles={customSelectStyles}
                                        />

                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4 ">
                                    <label htmlFor="region" className="form-label">Region</label>
                                    <div className=''>
                                        <div className="add-input">
                                            <input
                                                type="text"
                                                id="region"
                                                name="region"
                                                placeholder="Enter Region"
                                                value={formData.region}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </form>
                    </div>
                </section>
                <section className='add-content-section mb-5'>
                    <p className="cluster-section-title">Node Configration</p>

                    <div className="second mt-3 mt-lg-4">
                        <form className="row mt-4">

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="instance_type" className="form-label">Master Node Type</label>
                                <div className="add-input">
                                    <select
                                        name="instance_type"
                                        id="instance_type"
                                        value={formData?.instance_type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Master Node Type</option>
                                        <option value="t2.micro">t2.micro</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="runtime" className="form-label">PATHSDATA Run Time</label>
                                <div className="add-input">
                                    <select
                                        name="runtime"
                                        id="runtime"
                                        value={formData?.runtime}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select PATHSDATA Run Time</option>
                                        <option value="0.1">0.1</option>
                                        <option value="0.2">0.2</option>
                                        <option value="0.3">0.3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="ebs_size" className="form-label">EBS Size</label>

                                <div className="add-input">
                                    <input
                                        type="text"
                                        pattern='\d*'
                                        id="ebs_size"
                                        name="ebs_size"
                                        placeholder="Enter EBS Size"
                                        value={formData.ebs_size}
                                        onChange={handleChange}
                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4 ">
                                <label htmlFor="instance_profile_name" className="form-label">Master Node Profile</label>

                                {
                                    resourcesIAMList?.length > 0 ? (
                                        <>
                                            <div className="add-input">
                                                <select
                                                    name="instance_profile_name"
                                                    id="instance_profile_name"
                                                    value={formData?.instance_profile_name}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Master Node Profile</option>
                                                    {resourcesIAMList?.map((i, index) => (
                                                        <option key={index} value={i.instance_profile_name}>
                                                            {i.instance_profile_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <button className="add-btn boreder-0 " type="button" onClick={() => navigate("/add-resourcesIAM")}>
                                                    <img src={plusicon} className='me-2' /> Create
                                                </button>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </section>

                {
                    formData?.cluster_type === 'distributed' && (
                        <>
                            <section className='add-content-section '>
                                <p className="cluster-section-title">Work Node Configration</p>

                                <div className="second mt-3 mt-lg-4">
                                    <form className="row mt-4" >
                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="instance_type" className="form-label">Work Node Type</label>
                                            <div className="add-input">
                                                <select
                                                    name="worker_instance_type"
                                                    id="instance_type"
                                                    value={formData?.worker_details?.instance_type}
                                                    onChange={handleChange}
                                                    required>
                                                    <option value="">Select Work Node Type</option>
                                                    <option value="t2.micro">t2.micro</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="instance_profile_name" className="form-label">Work Node Profile</label>
                                            {
                                                resourcesIAMList?.length > 0 ? (
                                                    <>
                                                        <div className="add-input">
                                                            <select
                                                                name="worker_instance_profile_name"
                                                                id="instance_profile_name"
                                                                value={formData?.worker_details?.instance_profile_name}
                                                                onChange={handleChange}
                                                                required
                                                            >
                                                                <option value="">Select Work Node Profile</option>
                                                                {resourcesIAMList?.map((i, index) => (
                                                                    <option key={index} value={i.instance_profile_name}>
                                                                        {i.instance_profile_name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <button className="add-btn boreder-0 " type="button" onClick={() => navigate("/add-resourcesIAM")}>
                                                                <img src={plusicon} className='me-2' /> Create
                                                            </button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="subnet_id" className="form-label">Work Node Subnet</label>
                                            <div className="add-input">
                                                <select
                                                    name="worker_subnet_id"
                                                    id="subnet_id"
                                                    value={formData?.worker_details?.subnet_id}
                                                    onChange={handleChange}
                                                    required>
                                                    <option value="">Select Work Node Subnet</option>
                                                    {
                                                        selectedNetworkList?.subnet_ids?.map((i, index) => (
                                                            <option key={index} value={i}>
                                                                {i}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="sg_ids" className="form-label">Work Node Security Group</label>
                                            <div className="add-input">
                                                {/* <select
                                                            name="worker_sg_ids"
                                                            id="sg_ids"
                                                            value={formData?.worker_details?.sg_ids}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="">Select Work Node Security Group</option>
                                                            {
                                                                selectedNetworkList.security_group_ids?.map((i, index) => (
                                                                    <option key={index} value={i}>
                                                                        {i}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select> */}

                                                <Select
                                                    isMulti
                                                    options={selectedNetworkList?.security_group_ids?.map((i) => ({
                                                        label: i,
                                                        value: i,
                                                    }))}
                                                    value={formData?.worker_details?.sg_ids?.map((i) => ({ label: i, value: i }))}
                                                    onChange={(selectedOptions) => {
                                                        // Handle multi-selection change
                                                        const selectedValues = selectedOptions?.map(option => option.value);
                                                        handleChange({
                                                            target: {
                                                                name: 'worker_sg_ids',
                                                                value: selectedValues,
                                                            }
                                                        });
                                                    }}
                                                    name="worker_sg_ids"
                                                    id="worker_sg_ids"
                                                    getOptionLabel={(option) => option.label}
                                                    getOptionValue={(option) => option.value}
                                                    placeholder="Select Master Node Security group"
                                                    className="w-100 "
                                                    styles={customSelectStyles}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="ebs_size" className="form-label">Work Node EBS</label>
                                            <div className=''>
                                                <div className="add-input">
                                                    <input
                                                        type="text"
                                                        pattern='\d*'
                                                        id="ebs_size"
                                                        name="worker_ebs_size"
                                                        placeholder="Enter Work Node EBS"
                                                        value={formData.worker_details?.ebs_size}
                                                        onChange={handleChange}
                                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="number_worker_nodes" className="form-label">Number Worker</label>
                                            <div className=''>
                                                <div className="add-input">
                                                    <input
                                                        type="text"
                                                        pattern='\d*'
                                                        id="number_worker_nodes"
                                                        name="worker_number_worker_nodes"
                                                        placeholder="Enter Number Worker"
                                                        value={formData.worker_details?.number_worker_nodes}
                                                        onChange={handleChange}
                                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </>
                    )
                }

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
                                "Create"
                            )
                        }
                    </button>
                </div>
            </div >
        </>
    )
}
export default AddCluster;





export const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'rgba(4, 9, 32, 1)',
        border: 'none',
        boxShadow: 'none',
        color: 'rgba(255, 255, 255, 1)',
        padding: '7px 13px',
        fontSize: '1rem',
        borderRadius: '10px',
        '&:hover': {
            border: 'none'
        },
        '&:focus': {
            border: 'none',
            boxShadow: 'none'
        }
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'rgb(0, 47, 255)'  // Selected background color
            : state.isFocused
                ? '#0d6efd'  // Focused background color
                : 'rgba(4, 9, 32, 1)',  // Default background color
        color: 'white',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#0d6efd', // Hover effect color
        }
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(4, 9, 32, 1)',
        border: '1px solid rgb(255, 255, 255)',
        borderRadius: '5px',
        marginRight: "5px",
        color: 'rgba(255, 255, 255, 1)',
        fontSize: '16px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 1)',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 1)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 1)',
        }
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 1)'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(4, 9, 32, 1)',
        border: '1px solid #333',
        borderRadius: '10px',
        marginTop: 0
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 1)',
    })
};










