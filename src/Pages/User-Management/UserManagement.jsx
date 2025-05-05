import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import setting2 from "../../assets/images/setting2.png";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import plusicon from "../../assets/images/plus.png";
import member1 from "../../assets/images/member1.png";
import member2 from "../../assets/images/member2.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import upicon from "../../assets/images/upIcon.png";
import filter from "../../assets/images/filter.png";
import downicon from "../../assets/images/downIcon.png";
import usericon from "../../assets/images/usericon.png";
import Pagination from '../../Components/Pagination/Pagination';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';
import { Switch } from 'antd';
import DeleteVpc from '../../Components/Modal/Delete/DeleteVpc';
import { InviteUsers } from '../../Components/Modal/InviteUsers/InviteUsers';


const UserManagement = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt_token");
    const familyId = localStorage.getItem("family_id");
    const orgId = localStorage.getItem("org_id");

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);
    const [isActivate, setIsActivate] = useState(true); // Default is true
    const [userList, setUserList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState({});
    const [show, setShow] = useState(false);
    const [inviteShow, setInviteShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setDeleteId('')
        setInviteShow(false);
    }

    const GetUserList = async () => {
        setLoader(true);

        try {
            const res = await Axios.get(`/users?family_id=${familyId}`, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                setUserList(res?.data?.data);
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
        GetUserList();
    }, [])

    const handleDelete = async () => {
        try {
            const res = await Axios.delete(`/users/delete_user `, {
                data: { email_id: deleteId, family_id: familyId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );

            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                setShow(false);
                GetUserList();
            }
            else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error Delete resourcesIAM++", err);
        }
    }


    // const handleToggle = async (item) => {

    //     try {
    //         const response = await fetch(`https://yourapi.com/update-status/${id}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ status: active ? "Active" : "Inactive" }),
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to update status");
    //         }

    //         console.log("Status updated:", active);
    //     } catch (error) {
    //         console.error("API error:", error);
    //     }
    // };

    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(userList.map((_, index) => index));
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

    // Sort table by column (e.g., by Name)
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        if (selectedRows.length === userList?.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, userList?.length]);

    const addMember = () => {
        navigate("/add-member");
    }
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
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0">
                                        <div className='table-title'>
                                            Users
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
                                                <input type="text" placeholder="Search Members" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => addMember()}>
                                            Invite Users
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
                                {userList?.length === 0 || 'undefined' ? (
                                    <div className='data-not-found my-5'>
                                        Data Not Found
                                    </div>
                                ) : (
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
                                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>Name
                                                    {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                </th>
                                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>Email
                                                    {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                </th>
                                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>Role
                                                    {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                                </th>
                                                {/* <th onClick={handleSort} style={{ cursor: 'pointer' }}>Status
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th> */}
                                                <th onClick={handleSort} style={{ cursor: 'pointer' }}>Action
                                                    {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userList?.map((item, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td style={{ width: '50px', paddingLeft: '30px' }}>
                                                                <div onClick={() => handleCheckboxChange(index)}>
                                                                    {selectedRows.includes(index) ? (
                                                                        <img src={checkedIcon} className='checkbox-view' />
                                                                    ) : (
                                                                        <img src={uncheckIcon} className='checkbox-view' />
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex">
                                                                    {/* <img src={usericon} className="me-3" alt={item?.name} /> */}
                                                                    {item?.name ? item?.name : "Jhone Doe"}
                                                                </div>
                                                            </td>
                                                            <td>{item?.email_id}</td>
                                                            <td>{item?.role}</td>
                                                            {/* <td>
                                                            <Switch checked={isActivate} onChange={() => handleToggle(item)} />
                                                        </td> */}
                                                            <td>
                                                                <div>
                                                                    <img src={editbtn} alt="Edit" className='me-4' />
                                                                    <img src={deletebtn} alt="Delete" style={{ cursor: 'pointer' }} onClick={() => {
                                                                        setShow(true)
                                                                        setDeleteId(item?.email_id)
                                                                    }} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                        {/* <tfoot>
                                        <tr>
                                            <td colSpan="7">
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <button className="prev-btn" type="button">
                                                        Previous
                                                    </button>
                                                    <div className='page'>
                                                        Page 1 of 10
                                                    </div>
                                                    <button className="prev-btn" type="button">
                                                        Next
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot> */}
                                    </table>
                                )}
                                {/* <Pagination /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteVpc show={show} handleClose={handleClose} handleDelete={handleDelete} />
                <InviteUsers show={inviteShow} handleClose={handleClose} />

            </section>
        </>
    )
}
export default UserManagement