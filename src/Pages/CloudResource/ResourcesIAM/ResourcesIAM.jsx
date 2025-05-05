

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import alldelete from "../../../assets/images/delete.png";
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
import checkedIcon from "../../../assets/images/checked.png";
import uncheckIcon from "../../../assets/images/unchecked.svg";
import filter from "../../../assets/images/filter.png";

import Delete from '../../../Components/Modal/Delete/Delete';
import Pagination from '../../../Components/Pagination/Pagination';
import { authorizationHeaders, Axios } from '../../../helper/Axios';
import { toast } from 'react-toastify';
import DeleteVpc from '../../../Components/Modal/Delete/DeleteVpc';


const ResourcesIAM = () => {

    const navigate = useNavigate();
    const tenantId = localStorage.getItem("signin-tenantid");
    const token = localStorage.getItem("jwt_token");
    const familyId = localStorage.getItem("family_id");



    const resourceList = [
        { name: "John Doe", img: member1 },
        { name: "Emily Wise", img: member2 },
        { name: "Devil Maria", img: member3 },
        { name: "Gloria John", img: member4 },
        { name: "Mathias Hysi", img: member6 }
    ]

    const [selectedRows, setSelectedRows] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [deleteId, setDeleteId] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setDeleteId('')
    }

    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(resourcesIAM.map((_, index) => index));
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

    // useEffect(() => {
    //     if (selectedRows.length === resourcesIAM.length) {
    //         setIsChecked(true);
    //     } else {
    //         setIsChecked(false);
    //     }
    // }, [selectedRows, resourcesIAM.length]);

    // Sort table by column (e.g., by Name)

    const [resourcesIAM, setResourcesIAM] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteName, setDeleteName] = useState(null);

    const [sortOrder, setSortOrder] = useState({ column: null, order: 'asc' });


    const GetResourcesIAM = async () => {
        setLoader(true);

        try {
            const res = await Axios.get(`/resource_iam?family_id=${familyId}`, authorizationHeaders());

            if (res?.data?.statusCode === 200) {
                setResourcesIAM(res?.data?.data);
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

    const handleDelete = async () => {
        let deleteData = {};

        if (deleteId.credential_type === "instance_profile") {
            deleteData = {
                credential_type: "instance_profile",
                instance_profile_name: deleteId.instance_profile_name, // Ensure you use the correct value from deleteId
                family_id: familyId
            };
        } else if (deleteId.credential_type === "data_source_catalog") {
            deleteData = {
                credential_type: "data_source_catalog",
                ds_name: deleteId.ds_name, // Ensure you use the correct value from deleteId
                family_id: familyId
            };
        }

        try {
            const res = await Axios.delete(`/resource_iam`, {
                data: deleteData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                handleClose();
                GetResourcesIAM();
            } else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error Delete resourcesIAM++", err);
        }
    };


    const handleSort = (column) => {
        // setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

        setSortOrder((prev) => ({
            column,
            order: prev.column === column && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const filterData = (Array.isArray(resourcesIAM) ? [...resourcesIAM] : [])
        ?.filter((i) => {
            const formattedDate = new Date(i?.created_at).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }).toLowerCase();

            const searchstr = `${i.role_name} ${formattedDate}`.toLowerCase();

            return searchstr.includes(search.toLowerCase());
        })
        ?.sort((a, b) => {
            if (!sortOrder.column) return 0;
            if (sortOrder.column === "role_name") {
                return sortOrder.order === 'asc'
                    ? a.role_name.localeCompare(b.role_name)
                    : b.role_name.localeCompare(a.role_name);
            }
            if (sortOrder.column === "created_at") {
                return sortOrder.order === 'asc'
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            }
            return 0;
        });

    useEffect(() => {
        GetResourcesIAM();
    }, []);

    return (
        <>
            <section className='content-section mt-4'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-3 mb-lg-5">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 mt-3 mt-lg-0 d-flex align-items-center">
                                        <div className='table-title'>
                                            Cluster Resource IAM
                                        </div>

                                        {/* <button
                                            className="add-btn delete-btn boreder-0 ms-3"
                                            type="button"
                                            disabled={selectedRows.length === 0}
                                        >
                                            <img src={alldelete} alt="" />
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

                                                <input
                                                    type="text"
                                                    placeholder="Search Cluster Resource IAM"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => navigate("/add-resourcesIAM")}>
                                            Create
                                            <img src={plusicon} className='ms-2' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">

                                {filterData?.length === 0 ? (
                                    <div className='data-not-found my-5'>
                                        Data Not Found
                                    </div>
                                ) : filterData?.length === 0 ? (
                                    <div className='data-not-found my-5'>
                                        {error}
                                    </div>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                {/* <th style={{ width: '50px', paddingLeft: '30px' }}>
                                                    <div className="d-flex justify-content-left align-items-center">
                                                        <div onClick={toggleCheckbox} >
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
                                                <th onClick={() => handleSort("created_at")} style={{ cursor: 'pointer' }}>
                                                    Created at
                                                    {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                                    <img
                                                        src={sortOrder.column === "created_at" && sortOrder.order === 'asc' ? upicon : downicon}
                                                        style={{ paddingLeft: '10px' }} alt="Sort"
                                                    />

                                                </th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterData?.map((item, index) => (
                                                <tr key={index}>
                                                    {/* <td style={{ width: '50px', paddingLeft: '30px' }}>
                                                        <div
                                                            onClick={() => handleCheckboxChange(index)}
                                                        >
                                                            {selectedRows.includes(index) ? (
                                                                <img src={checkedIcon} className='checkbox-view' />
                                                            ) : (
                                                                <img src={uncheckIcon} className='checkbox-view' />

                                                            )}
                                                        </div>
                                                    </td> */}
                                                    <td>
                                                        {/* <img src={member.img} className="me-3" alt={i.name} /> */}
                                                        {item.credential_type === "instance_profile" ?
                                                            item.instance_profile_name :
                                                            item.ds_name
                                                        }
                                                    </td>
                                                    <td>
                                                        {/* {i.created_at} */}
                                                        {new Date(item.created_at).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td>
                                                        <div className=''>
                                                            {/* <img
                                                                src={settingbtn}
                                                                alt="Setting"
                                                                className='me-4'
                                                            /> */}
                                                            <img
                                                                src={editbtn}
                                                                alt="Edit"
                                                                className='me-4 cursor-pointer'
                                                                onClick={() => {
                                                                    navigate("/edit-resourcesIAM", { state: { resourcesIAM: item } });
                                                                }}
                                                            />
                                                            {/* <div> */}

                                                            <img
                                                                src={deletebtn}
                                                                alt="Delete"
                                                                className='cursor-pointer'
                                                                onClick={() => {
                                                                    setShow(true)
                                                                    setDeleteId(item)
                                                                }
                                                                }
                                                            />
                                                            {/* </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {/* Pagination */}
                                {/* {
                                    filterData?.length > 0 && (

                                        <Pagination />
                                    )
                                } */}

                            </div>
                        </div>
                    </div>
                </div>
                <DeleteVpc show={show} handleClose={handleClose} handleDelete={handleDelete} />

            </section>


            { /* ----- Delete-ResourcesIAM Modal ----- */}
            {/* <Delete show={modalShow?.deleteResourcesIAM} handleClose={handleClose} isDeleteLoading={isDeleteLoading} handleDelete={handleDelete} role="Resources IAM" /> */}

        </>
    )
}
export default ResourcesIAM;








