
import React, { useEffect, useState } from 'react';
import Delete from "../../../assets/images/delete.png";
import settingbtn from "../../../assets/images/setting-btn.png";
import editbtn from "../../../assets/images/edit-btn.png";
import deletebtn from "../../../assets/images/delete-btn.png";
import member1 from "../../../assets/images/member1.png";
import member2 from "../../../assets/images/member2.png";
import member3 from "../../../assets/images/member3.png";
import member4 from "../../../assets/images/member4.png";
import member6 from "../../../assets/images/member6.png";
import upicon from "../../../assets/images/upIcon.png";
import downicon from "../../../assets/images/downIcon.png";
import plusicon from "../../../assets/images/plus.png";
import filter from "../../../assets/images/filter.png";

// import checkedIcon from "../../../assets/images/checked.png";
import checkedIcon from "../../../assets/images/checked.png";
import uncheckIcon from "../../../assets/images/unchecked.svg";


import { useNavigate } from 'react-router-dom';
import Pagination from '../../../Components/Pagination/Pagination';
import { Axios, authorizationHeaders } from '../../../helper/Axios';
import { toast } from 'react-toastify';
import DeleteVpc from '../../../Components/Modal/Delete/DeleteVpc';


const VPC = () => {
    const navigate = useNavigate();
    // const tenantId = localStorage.getItem("signin-tenantid");
    const token = localStorage.getItem("jwt_token");
    const familyId = localStorage.getItem("family_id");

    const vpcList = [
        { name: "John Doe", img: member1 },
        { name: "Emily Wise", img: member2 },
        { name: "Devil Maria", img: member3 },
        { name: "Gloria John", img: member4 },
        { name: "Mathias Hysi", img: member6 }
    ]

    const createVPC = () => {
        navigate("/add-vpc")
    }
    const editVPC = (item) => {
        navigate("/edit-vpc", { state: item });
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);
    const [vpcData, setVpcData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const handleClose = () => {
        setShow(false);
        setDeleteId('')
    }
    console.log('====================================');
    console.log("vpcData", vpcData?.length);
    console.log('====================================');

    const GetVPCData = async () => {
        setLoader(true);

        try {
            const res = await Axios.get(`/network?family_id=${familyId}`, authorizationHeaders());
            console.log("networkres", res);

            if (res.data?.statusCode === 200) {
                setVpcData(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error VPC++", err);

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
        GetVPCData();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`/network`, {
                data: { vpc_name: deleteId, family_id: familyId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );

            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                setShow(false);
                GetVPCData();
            }
            else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error Delete resourcesIAM++", err);
        }
    }

    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(vpcData.map((_, index) => index));
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
        if (selectedRows.length === vpcData?.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, vpcData?.length]);


    // Sort table by column (e.g., by Name)
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    return (
        <>

            {/* <section className="title pd">
                <div className="row align-items-center">
                    <div className="col-lg-6 mt-4 mb-4">
                        <h3>Welcome back, Jameson 👋</h3>
                    </div>
                </div>
            </section> */}

            <section className='content-section mt-4'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-3 mb-lg-5">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 d-flex align-items-center">
                                        <div className='table-title'>
                                            Network
                                        </div>

                                        {/* <button
                                            className="add-btn delete-btn boreder-0 ms-3"
                                            type="button"
                                            disabled={selectedRows.length === 0}
                                        >
                                            <img src={Delete} alt="" />
                                        </button> */}
                                        {selectedRows.length > 0 && (
                                            <span className="row-text ms-3">{selectedRows.length} row selected</span>
                                        )}
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

                                                <input type="text" placeholder="Search Network" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => createVPC()}>
                                            Create
                                            <img src={plusicon} className='ms-2' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">
                                {(!vpcData || vpcData.length === 0) ? (
                                    <div className="data-not-found my-5">
                                        Data Not Found
                                    </div>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* <th style={{ width: '50px', paddingLeft: '30px' }}>
                                                    <div className="d-flex justify-content-left align-items-center">
                                                        <div
                                                            // className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
                                                            onClick={toggleCheckbox}
                                                        >
                                                            {isChecked ?
                                                                <img src={checkedIcon} className='checkbox-view' /> :
                                                                <img src={uncheckIcon} className='checkbox-view' />
                                                            }
                                                        </div>
                                                    </div>
                                                </th> */}
                                                <th onClick={handleSort} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row' }}>
                                                    <div className="d-flex justify-content-left align-items-center me-3">
                                                        <div
                                                            // className={`custom-checkbox ${isChecked ? 'checked' : ''}`}
                                                            onClick={toggleCheckbox}>
                                                            {isChecked ?
                                                                <img src={checkedIcon} className='checkbox-view' /> :
                                                                <img src={uncheckIcon} className='checkbox-view' />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='mt-1'>
                                                        <p> Name {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}</p>
                                                    </div>
                                                </th>
                                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                    Created at
                                                    {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vpcData?.map((item, index) => (
                                                <tr key={index}>
                                                    {/* <td style={{ width: '50px', paddingLeft: '30px' }}>
                                                        <div className="d-flex justify-content-left align-items-center">
                                                            <div
                                                                // className={`custom-checkbox ${selectedRows.includes(index) ? 'checked' : ''}`}
                                                                onClick={() => handleCheckboxChange(index)}
                                                            >
                                                                {selectedRows.includes(index) ? (
                                                                    <img src={checkedIcon} className='checkbox-view' />
                                                                ) : (
                                                                    <img src={uncheckIcon} className='checkbox-view' />

                                                                )}
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                    <td>
                                                        {/* <img src={item.img} className="me-3" alt={item.name} /> */}
                                                        {item.vpc_name}
                                                    </td>
                                                    <td> {new Date(item.created_at).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}</td>
                                                    <td>
                                                        <div>
                                                            {/* <img src={settingbtn} alt="Setting" className='me-4' /> */}
                                                            <img src={editbtn} alt="Edit" className='me-4' style={{ cursor: 'pointer' }} onClick={() => editVPC(item)} />
                                                            <img src={deletebtn} alt="Delete" className='' style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setShow(true)
                                                                    setDeleteId(item?.vpc_name)
                                                                }
                                                                } />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {/* <Pagination /> */}

                            </div>
                        </div>
                    </div>
                </div>
                <DeleteVpc show={show} handleClose={handleClose} handleDelete={handleDelete} />
            </section >
        </>
    )
}
export default VPC;