import React, { useEffect, useState } from 'react'
import managefamily from "../../assets/images/dashboard/manage-family.png";
import manageorganization from "../../assets/images/dashboard/manage-organization.png";
import billing from "../../assets/images/dashboard/billing.png";
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { authorizationHeaders, Axios } from '../../helper/Axios';
import arrowright from "../../assets/images/arrow-right.png";
import plusicon from "../../assets/images/plus.png";
import settingbtn from "../../assets/images/setting-btn.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import organization_family from "../../assets/images/organization_family.png";
import Delete from "../../assets/images/delete.png";
import filter from "../../assets/images/filter.png";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";


const OrganizationDash = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);

    const [familyList, setFamilyList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt_token");


    console.log('====================================');
    console.log("familyList", familyList);
    console.log('====================================');


    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(familyList.map((_, index) => index));
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
        if (selectedRows.length === familyList?.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, familyList?.length]);

    // Sort table by column (e.g., by Name)
    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    const fetchFamilyDetails = async (orgId, token) => {
        setLoader(true);
        try {
            const res = await Axios.get(`/organization/list_families?org_id=${orgId}`, authorizationHeaders());
            if (res.data?.statusCode === 200) {
                setFamilyList(res?.data?.data);
                toast.success(res?.data?.message)
            }
            else {
                toast.error(res.data?.message);
            }
        } catch (err) {
            console.error("Error GetFamilyData++", err);
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
    };

    useEffect(() => {
        fetchFamilyDetails(id, token);
    }, [id]);


    const handleFamily = (i) => {
        // navigate("/vpc")

        navigate("/home2");
        localStorage.setItem("family_name", i?.name);
        localStorage.setItem("openCloudOption", true);

        localStorage.setItem("family_id", i?.family_id)
    }



    const handleCreate = () => {
        navigate("/add-family");
        localStorage.setItem("openOrgFamily", true)

    }

    const handleEdit = (i) => {
        navigate("/edit-family", { state: { family: i } });
        localStorage.setItem("openOrgFamily", true)

    }

    return (
        <>
            {loader && <div className="loader-overlay"><div className="loader"></div></div>}

            <section className='pd'>
                <div className='row mt-4'>
                    <div className='col-lg-4 mb-4 mb-lg-5'>
                        <div className="home-card-view">
                            <div className="d-flex flex-column justify-content-between">
                                <img src={managefamily} alt="" height={50} width={50} className='mb-3' />
                                <div>
                                    <span className="digital-title">Users Management</span>
                                    <p className="digital-desc">Control user access, permissions, and team.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4 mb-lg-5'>
                        <div className="home-card-view">
                            <div className="d-flex flex-column justify-content-between">
                                <img src={manageorganization} alt="" height={50} width={50} className='mb-3' />
                                <div>
                                    <span className="digital-title">Billing</span>
                                    <p className="digital-desc">View invoices, track payments, and manage subscriptions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-4 mb-lg-5'>
                        <div className="home-card-view">
                            <div className="d-flex flex-column justify-content-between">
                                <img src={billing} alt="" height={50} width={50} className='mb-3' />
                                <div>
                                    <span className="digital-title">Setting</span>
                                    <p className="digital-desc">Customize preferences and optimize your platform.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div>
                    <section className="title ">
                        <div className="row align-items-center justify-content-end">
                            <div className='col-lg-6  mb-4 d-lg-flex justify-content-lg-end'>
                                <button className="add-btn boreder-0" type="button" onClick={() => handleCreate()}>
                                    <img src={plusicon} className='me-2' />Create Family
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className='card-box row'> */}
                {/* {familyList?.map((item, index) => {
                            return (
                                <div className="col-lg-4 col-12 mb-4" style={{ cursor: 'pointer' }} onClick={() => handleFamily(item?.family_id)}>
                                    <div className="box">
                                        <div className="main-title">{item?.family_id}</div>
                                        <div className="title">{item?.name}</div>

                                        <div className="desc d-flex justify-content-between align-items-center">
                                            <p className='description-text'>{item?.description}</p>
                                            <div>
                                                <img src={arrowright} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}




                {/* <div className="table-responsive table_fam">
                            <table className=''>
                                <tbody>
                                    {familyList?.map((i, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className='title'>NAME</div>
                                                    <div className='info d-flex align-items-center cursor-pointer' onClick={() => handleFamily(i)}>
                                                        <img src={organization_family} alt="" className='me-3' />
                                                        {i.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='title'>Description</div>
                                                    <div className='info'>
                                                        <div
                                                            className="description-show"
                                                            data-tooltip-id={`tooltip-${i.family_id}`}
                                                            data-tooltip-content={i.description}
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
                                                            {i.description}
                                                        </div>

                                                        <Tooltip
                                                            id={`tooltip-${i.family_id}`}
                                                            effect="solid"
                                                            place="top"
                                                            className="custom-tooltip"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='title'>MEMBERS</div>
                                                    <div className='info'>
                                                        {i.org_family || 0}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='title'>Organization</div>
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
                                                            className=''
                                                        // onClick={(e) => {
                                                        //     e.stopPropagation();
                                                        //     setShow(true)
                                                        //     setDeleteId(i?.org_id)
                                                        // }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </section>
                </div > */}
            </section >

            <section className='content-section'>
                <div className="second">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-3 mb-lg-5">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 d-flex align-items-center">
                                        <div className='table-title'>
                                            Family
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

                                                <input type="text" placeholder="Search Family" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => handleCreate()}>
                                            Create Family
                                            <img src={plusicon} className='ms-2' />
                                        </button>

                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">
                                {(!familyList || familyList.length === 0) ? (
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
                                                    <th onClick={handleSort} style={{ cursor: 'pointer' }}>
                                                        Name
                                                        {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
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
                                                {familyList?.map((i, index) => (
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
                                                            <div className='info d-flex align-items-center cursor-pointer' onClick={() => handleFamily(i)}>
                                                                <img src={organization_family} alt="" className='me-3' />
                                                                {i.name}
                                                            </div>
                                                        </td>
                                                        <td style={{ position: "relative", width: '550px' }}>
                                                            <div className='info'>
                                                                <div
                                                                    className="description-show"
                                                                    data-tooltip-id={`tooltip-${i.family_id}`}
                                                                    data-tooltip-content={i.description}
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
                                                                    {i.description}
                                                                </div>

                                                                <Tooltip
                                                                    id={`tooltip-${i.family_id}`}
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
                                                                // onClick={() => {
                                                                //     navigate("/edit-credential-configure", { state: { credentialconfigure: item } });
                                                                // }}
                                                                onClick={() => handleEdit(i)}
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
        </>
    )
}

export default OrganizationDash;














// import React, { useEffect, useState } from 'react'
// import managefamily from "../../assets/images/dashboard/manage-family.png";
// import manageorganization from "../../assets/images/dashboard/manage-organization.png";
// import billing from "../../assets/images/dashboard/billing.png";
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { authorizationHeaders, Axios } from '../../helper/Axios';

// const OrganizationDash = () => {
//     const { id } = useParams();
//     const [familyList, setFamilyList] = useState([]);
//     const [loader, setLoader] = useState(false);

//     const GetOrganizationFamilyData = async () => {
//         setLoader(true);

//         const payload = {
//             org_id: id
//         }
//         try {
//             // const res = await Axios.get(`/organization/list_families`, payload, authorizationHeaders());
//             const res = await Axios.get(`/organization/list_families`, {
//                 ...authorizationHeaders(),
//                 data: { org_id: id }  // This is non-standard for GET requests
//             });
//             if (res.data?.statusCode === 200) {
//                 setFamilyList(res.data.data);
//             }
//             else {
//                 toast.error(res.data?.message);
//             }
//         } catch (err) {
//             console.error("Error organization++", err);
//             if (err?.message === "Network Error") {
//                 setError(err.message);
//             }
//             if (err?.response?.data?.statusCode === "440") {
//                 toast.error("Session expired. Please log in again.");
//                 localStorage.clear();
//                 navigate("/sign-in");
//             } else {
//                 toast.error(err?.response?.data?.message || "An error occurred");
//             }
//         } finally {
//             setLoader(false);
//         }
//     }

//     useEffect(() => {
//         GetOrganizationFamilyData();
//     }, []);
//     return (
//         <>

//             <section className='pd'>
//                 <div className='row mt-4'>
//                     <div className='col-lg-4 mb-4 mb-lg-5'>
//                         <div className="home-card-view" onClick={() => navigate("/new/family")}>
//                             <div className="d-flex flex-column justify-content-between">
//                                 <img src={managefamily} alt="" height={50} width={50} className='mb-3' />
//                                 <div>
//                                     <span className="digital-title">Users Management</span>
//                                     <p className="digital-desc">Control user access, permissions, and team.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='col-lg-4 mb-4 mb-lg-5'>
//                         <div className="home-card-view" onClick={() => navigate("/new/organization")}>
//                             <div className="d-flex flex-column justify-content-between">
//                                 <img src={manageorganization} alt="" height={50} width={50} className='mb-3' />
//                                 <div>
//                                     <span className="digital-title">Biling</span>
//                                     <p className="digital-desc">View invoices, track payments, and manage subscriptions.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='col-lg-4 mb-4 mb-lg-5'>
//                         <div className="home-card-view">
//                             <div className="d-flex flex-column justify-content-between">
//                                 <img src={billing} alt="" height={50} width={50} className='mb-3' />
//                                 <div>
//                                     <span className="digital-title">Setting</span>
//                                     <p className="digital-desc">Customize preferences and optimize your platform.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//         </>
//     )
// }

// export default OrganizationDash