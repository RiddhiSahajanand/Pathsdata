import React, { useState, useEffect } from 'react';
import Delete from "../../assets/images/delete.png";
import settingbtn from "../../assets/images/setting-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import { useNavigate } from 'react-router-dom';
import member1 from "../../assets/images/member1.png";
import member2 from "../../assets/images/member2.png";
import member3 from "../../assets/images/member3.png";
import member4 from "../../assets/images/member4.png";
import member6 from "../../assets/images/member6.png";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import plusicon from "../../assets/images/plus.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import filter from "../../assets/images/filter.png";
import Pagination from '../../Components/Pagination/Pagination';
import { Axios, authorizationHeaders } from '../../helper/Axios';
import DeleteVpc from '../../Components/Modal/Delete/DeleteVpc';
import { toast } from 'react-toastify';


const Cluster = () => {
    const navigate = useNavigate();
    const tenantId = localStorage.getItem("signin-tenantid");
    const token = localStorage.getItem("jwt_token");
    const familyId = localStorage.getItem("family_id");

    const AddCluster = () => {
        navigate("/add-cluster")
    }
    const dummyArray = [
        { id: 1, cluster_name: "Test", Create: "Admin", created_at: "02/02/2025", updatedDate: "02/02/2025", }
    ]

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);
    // const [credentialList, setCredentialList] = useState([]);
    const [clusterList, setClusterList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleClose = () => {
        setShow(false);
        setDeleteId(null)
    }

    const GetCluster = async () => {
        setLoader(true);

        try {
            const res = await Axios.get(`/clusters?family_id=${familyId}`, authorizationHeaders());
            console.log("Get-Cluster", res);


            if (res.data?.statusCode === 200) {
                setClusterList(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error resourcesIAM++", err);

            if (err?.message === "Network Error") {
                setError(err.message);
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
            setLoader(false);
        }
    }

    useEffect(() => {
        GetCluster();
    }, [])


    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`/clusters`, {
                data: { cluster_name: deleteId?.cluster_name, cluster_type: deleteId?.cluster_type, family_id: familyId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );

            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                handleClose();
                GetCluster();
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error-Delete-Clusters++", err);
        }
    }



    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(clusterList.map((_, index) => index));
        }
        setIsChecked(!isChecked);
    };

    // Handle checkbox selection
    const handleCheckboxChange = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    useEffect(() => {
        if (selectedRows.length === clusterList?.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, clusterList?.length]);

    // Sort table by column (e.g., by Name)
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <>
            <section className='content-section mt-4'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-3 mb-lg-5">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 ">
                                        <div className='table-title'>
                                            Cluster
                                        </div>
                                    </div>

                                    <div className="col-lg-6 d-flex align-items-center justify-content-end">
                                        <div>
                                            <button className="filter boreder-0 " type="button">
                                                <img src={filter} className='me-2' /> Filter
                                            </button>
                                        </div>

                                        <div className='ms-3 me-3'>
                                            <div className="pseudo-search">
                                                <button className="fa fa-search" type="submit" />

                                                <input type="text" placeholder="Search Cluster" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => AddCluster()}>
                                            Create
                                            <img src={plusicon} className='ms-2' />
                                        </button>

                                        {/* <button
                                            className="add-btn delete-btn boreder-0 ms-3"
                                            type="button"
                                            disabled={selectedRows.length === 0}
                                        >
                                            <img src={Delete} alt="" />
                                        </button>

                                        {selectedRows.length > 0 && (
                                            <span className="row-text ms-3">{selectedRows.length} row selected</span>
                                        )} */}
                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">
                                {(!clusterList || clusterList.length === 0) ? (
                                    <div className="data-not-found my-5">
                                        Data Not Found
                                    </div>
                                ) : (
                                    <>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '50px', paddingLeft: '30px' }}>
                                                        <div className="d-flex justify-content-left align-items-center">
                                                            <div onClick={toggleCheckbox} >
                                                                {isChecked ?
                                                                    <img src={checkedIcon} className='checkbox-view' /> :
                                                                    <img src={uncheckIcon} className='checkbox-view' />
                                                                }
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        Name
                                                        {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        Cluster Type
                                                        {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        Created Date
                                                        {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        Updated Date
                                                        {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                    </th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clusterList?.map((item, index) => (
                                                    <tr key={index}>
                                                        {
                                                            console.log(item)
                                                        }
                                                        <td style={{ width: '50px', paddingLeft: '30px' }}>
                                                            <div
                                                                onClick={() => handleCheckboxChange(index)}
                                                            >
                                                                {selectedRows.includes(index) ? (
                                                                    <img src={checkedIcon} className='checkbox-view' />
                                                                ) : (
                                                                    <img src={uncheckIcon} className='checkbox-view' />

                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div onClick={()=> navigate("/cluster-details")}>
                                                                {item.cluster_type}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.cluster_type}
                                                        </td>
                                                        <td>
                                                            {new Date(item.created_at).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'long',
                                                                year: 'numeric'
                                                            })}
                                                        </td>
                                                        <td>{item.updated_at || "-"}</td>
                                                        <td>
                                                            {/* <img src={settingbtn} alt="Setting" className='me-4' /> */}
                                                            <img
                                                                src={editbtn}
                                                                alt="Edit"
                                                                className='me-4 cursor-pointer'
                                                            // onClick={() => {
                                                            //     navigate("/edit-credential-configure", { state: { credentialconfigure: item } });
                                                            // }}
                                                            />
                                                            <img
                                                                src={editbtn}
                                                                alt="Edit"
                                                                className='me-4 cursor-pointer'
                                                            // onClick={() => {
                                                            //     navigate("/edit-credential-configure", { state: { credentialconfigure: item } });
                                                            // }}
                                                            />
                                                            <img
                                                                src={deletebtn}
                                                                alt="Delete"
                                                                className='cursor-pointer'
                                                                onClick={() => {
                                                                    setShow(true)
                                                                    setDeleteId(item)
                                                                }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}

                                {/* <Pagination /> */}

                            </div>
                        </div>
                    </div>
                </div>
                <DeleteVpc show={show} handleClose={handleClose} handleDelete={handleDelete} />
            </section>
        </>
    )
}
export default Cluster;