import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import plusicon from "../../assets/images/plus.png";
import arrowright from "../../assets/images/arrow-right.png";
import deletebtn from "../../assets/images/delete-btn.png";
import filter from "../../assets/images/filter.png";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import { authorizationHeaders, Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';
import DeleteVpc from '../../Components/Modal/Delete/DeleteVpc';

import settingbtn from "../../assets/images/setting-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import organization_name from "../../assets/images/organization_name.png";
import Delete from "../../assets/images/delete.png";

const Organization = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("jwt_token");


    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);


    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);

    const [organizationData, setOrganizationData] = useState([]);
    console.log('====================================');
    console.log("organizationDataorganizationData", organizationData);
    console.log('====================================');

    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);


    const handleClose = () => {
        setShow(false);
        setDeleteId(null)
    }


    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(organizationData.map((_, index) => index));
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
        if (selectedRows.length === organizationData?.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, organizationData?.length]);

    // Sort table by column (e.g., by Name)
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    const handleCreate = () => {
        navigate("/add-organization");
    }

    const handleOrganizationDash = (i) => {
        navigate(`/organization-dash/${i?.org_id}`);

        localStorage.setItem("org_id", i?.org_id);
    }

    const GetOrganizationData = async () => {
        setLoader(true);
        try {
            const res = await Axios.get(`/organization`, authorizationHeaders());
            if (res.data?.statusCode === 200) {
                setOrganizationData(res.data.data);
            }
            else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error organization++", err);
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
        setIsDeleteLoading(true);

        try {
            const res = await Axios.delete(`/organization`, {
                data: { org_id: deleteId },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            );

            if (res?.data?.statusCode === 200) {
                toast.success(res.data?.message);
                handleClose();
                GetOrganizationData();
            }
            else {
                toast.error(res.data?.message);
            }

        } catch (err) {
            console.error("Error-Delete-Organization++", err);
        } finally {
            setIsDeleteLoading(false);
        }
    }


    useEffect(() => {
        GetOrganizationData();
    }, []);

    return (
        <>

            {/* <section className="title pd">
                <div className="row align-items-center justify-content-end">
                    <div className='col-lg-6 mt-4 mb-4 d-lg-flex justify-content-lg-end'>
                        <button className="add-btn boreder-0" type="button" onClick={() => handleCreate()}>
                            <img src={plusicon} className='me-2' />  Create Organization
                        </button>
                    </div>
                </div>
            </section> */}


            {/* <section className='card-box row pd'> */}
            {/* {organizationData.map((item, index) => {

                    return (
                        <>
                            <div className="col-lg-4 col-12 mb-4">
                                <div className="box cursor-pointer position-relative" onClick={() => handleOrganizationDash(item?.org_id, item?.org_name)}>
                                    <div className='position-absolute' style={{ zIndex: 999, right: '20px', top: '20px' }}>
                                        <img
                                            src={deletebtn}
                                            alt="Delete"
                                            className=''
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShow(true)
                                                setDeleteId(item?.org_id)
                                            }}
                                        />
                                    </div>
                                    <div className="main-title">{item?.org_id}</div>
                                    <div className="title">{item?.org_name}</div>
                                    <div className="desc d-flex justify-content-between align-items-center">
                                        <p className='description-text'>
                                            {item?.org_description}
                                        </p>
                                        <div>
                                            <img src={arrowright} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })} */}

            {/* <div className="table-responsive table_fam">
                    <table className=''>
                        <tbody>
                            {organizationData.map((i, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className='title'>NAME</div>
                                            <div className='info d-flex align-items-center cursor-pointer' onClick={() => handleOrganizationDash(i)}>
                                                <img src={organization_name} alt="" className='me-3' />
                                                {i.org_name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='title'>Description</div>
                                            <div className='info'>
                                                <div
                                                    className="description-show cursor-pointer"
                                                    data-tooltip-id={`tooltip-${i.org_id}`}
                                                    data-tooltip-content={i.org_description}
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "normal",
                                                        lineHeight: "1.5em",

                                                        maxWidth: "100%",
                                                    }}>
                                                    {i.org_description}
                                                </div>

                                                <Tooltip
                                                    id={`tooltip-${i.org_id}`}
                                                    effect="solid"
                                                    place="top"
                                                    className="custom-tooltip"
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className='title'>FAMILIES	</div>
                                            <div className='info'>
                                                {i.org_family || 0}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='title'>INDUSTRY	</div>
                                            <div className='info'>
                                                <div className="dot"></div>
                                                {i.org_industry || "-"}
                                            </div>
                                        </td>
                                        <td className='cursor-default'>
                                            <div className='title'>Actions	</div>
                                            <div className='info'>
                                                <img
                                                    src={editbtn}
                                                    alt="Edit"
                                                    className='me-4'
                                                />
                                                <img
                                                    src={deletebtn}
                                                    alt="Delete"
                                                    className='cursor-pointer'
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShow(true)
                                                        setDeleteId(i?.org_id)
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>

            </section > */}


            <section className='content-section mt-4'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-3 mb-lg-5">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 d-flex align-items-center">
                                        <div className='table-title'>
                                            Organization
                                        </div>

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

                                    <div className="col-lg-6 d-flex align-items-center justify-content-end">
                                        <div>
                                            <button className="filter boreder-0 " type="button">
                                                <img src={filter} className='me-2' /> Filter
                                            </button>
                                        </div>

                                        <div className='ms-3 me-3'>
                                            <div className="pseudo-search">
                                                <button className="fa fa-search" type="submit" />

                                                <input type="text" placeholder="Search Organization" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => handleCreate()}>
                                            Create Organization
                                            <img src={plusicon} className='ms-2' />
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">
                                {(!organizationData || organizationData.length === 0) ? (
                                    <div className="data-not-found my-5">
                                        Data Not Found
                                    </div>
                                ) : (
                                    <>

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
                                                    <th onClick={handleSort} style={{ cursor: 'pointer', width: '550px' }}>
                                                        Description
                                                        {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        FAMILIES
                                                        {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                                    </th>
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        INDUSTRY
                                                        {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                                    </th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {organizationData?.map((i, index) => (
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
                                                            <div className='info d-flex align-items-center cursor-pointer' onClick={() => handleOrganizationDash(i)}>
                                                                <img src={organization_name} alt="" className='me-3' />
                                                                {i.org_name}
                                                            </div>
                                                        </td>
                                                        <td style={{ position: "relative", width: '550px' }}>
                                                            <div className='info'>
                                                                <div
                                                                    className="description-show cursor-pointer"
                                                                    data-tooltip-id={`tooltip-${i.org_id}`}
                                                                    data-tooltip-content={i.org_description}
                                                                    style={{
                                                                        display: "-webkit-box",
                                                                        WebkitLineClamp: 1,
                                                                        WebkitBoxOrient: "vertical",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "normal",
                                                                        lineHeight: "1.5em",

                                                                        maxWidth: "100%",
                                                                    }}>
                                                                    {i.org_description}
                                                                </div>

                                                                <Tooltip
                                                                    id={`tooltip-${i.org_id}`}
                                                                    effect="solid"
                                                                    place="top"
                                                                    className="custom-tooltip"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {i.org_family || 0}
                                                        </td>
                                                        <td>
                                                            {i.org_industry || "-"}
                                                        </td>
                                                        <td>
                                                            {/* <img src={settingbtn} alt="Setting" className='me-4' /> */}
                                                            <img
                                                                src={editbtn}
                                                                alt="Edit"
                                                                className='me-4 cursor-pointer'
                                                                onClick={() => {
                                                                    navigate("/edit-organization", { state: { organization: i } });
                                                                }}
                                                            />
                                                            <img
                                                                src={deletebtn}
                                                                alt="Delete"
                                                                className='cursor-pointer'
                                                                onClick={() => {
                                                                    setShow(true)
                                                                    setDeleteId(i?.org_id)
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
            </section>

            <DeleteVpc show={show} handleClose={handleClose} handleDelete={handleDelete} isDeleteLoading={isDeleteLoading} />


        </>
    )
}

export default Organization;








{/* <tr>
                                <td>
                                    <div className='title'>NAME</div>
                                    <div className='info d-flex align-items-center'>
                                        <img src={organization_name} alt="" className='me-3' />
                                        Acme Corp
                                    </div>
                                </td>
                                <td>
                                    <div className='title'>Description</div>
                                    <div className='info'>
                                        Medical innovations
                                    </div>
                                </td>
                                <td>
                                    <div className='title'>FAMILIES	</div>
                                    <div className='info'>
                                        5
                                    </div>
                                </td>
                                <td>
                                    <div className='title'>INDUSTRY	</div>
                                    <div className='info'>
                                        <div className="dot"></div>
                                        Technology
                                    </div>
                                </td>
                                <td>
                                    <div className='title'>Actions	</div>
                                    <div className='info'>
                                        <img
                                            src={settingbtn}
                                            alt="Setting"
                                            className='me-4' />
                                        <img
                                            src={editbtn}
                                            alt="Edit"
                                            className='me-4 cursor-pointer'
                                        />
                                        <img
                                            src={deletebtn}
                                            alt="Delete"
                                            className='cursor-pointer'
                                        />
                                    </div>
                                </td>
                            </tr> */}
