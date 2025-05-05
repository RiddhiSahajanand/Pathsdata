import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import plus from "../../assets/images/plus.png";
import plusicon from "../../assets/images/plus.png";
import upicon from "../../assets/images/upIcon.png";
import viewicon from "../../assets/images/view-database.png";
import downicon from "../../assets/images/downIcon.png";
import leftpagination from "../../assets/images/left-pagination.png";
import rightpagination from "../../assets/images/right-pagination.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import filter from "../../assets/images/filter.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import Delete from "../../assets/images/delete.png";
import Pagination from '../../Components/Pagination/Pagination';
import { DataSource } from '../../Components/Modal/DataSource/DataSource';


const DataCatalog = () => {
    const navigate = useNavigate();

    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
    }
    const handleSort = (columnName) => {
        if (sortColumn === columnName) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            setSortColumn(columnName);
        }
        else {
            setSortColumn(columnName);
            setSortOrder('asc');
        }
    };
    const handleCreate = () => {
        navigate("/create-data-source");
    }

    const handleDataSource = () => {
        setShow(true)
    }
    return (
        <>

            {/* <section className="title pd">
                <div className="row align-items-center justify-content-end">
                    <div className='col-lg-6 mt-4 mb-4 d-lg-flex justify-content-lg-end'>
                        <button className="add-btn boreder-0" type="button" onClick={() => handleCreate()}>
                            <img src={plusicon} className='me-2' />  Create
                        </button>
                    </div>
                </div>
            </section> */}

            <section className='content-section mt-4'>
                <div className="top">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title mb-2 mb-md-3 mb-lg-4">Data Management</div>
                            <p>
                                A metastores is the top-level container for catalog in Unity Catalog . Within a metastore, Unity Catalog provides a 3-level namespace for organizing data : catalogs
                                schemas (also called databases), and tables / views. <Link>Learn more</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="second mt-3 mt-lg-4">
                    <div className="">
                        <div className="">
                            <div className="fisrt mb-2 mb-lg-4">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6">
                                        {/* <button className="add-btn boreder-0" type="button">
                                            <img src={plusicon} className='me-2' />  Create metastore
                                        </button> */}
                                    </div>
                                    <div className="col-lg-6 col-xl-6 mt-3 mt-lg-0  d-flex align-items-center justify-content-end">
                                        <div>
                                            <button className="filter boreder-0 " type="button">
                                                <img src={filter} className='me-2' /> Filter
                                            </button>
                                        </div>

                                        <div className='ms-3 me-3'>
                                            <div className="pseudo-search">
                                                <button className="fa fa-search" type="submit" />

                                                <input type="text" placeholder="Search Data" autoFocus required />
                                            </div>
                                        </div>

                                        <button className="add-btn boreder-0 " type="button" onClick={() => handleCreate()}>
                                            <span className='me-2'> Create   </span><img src={plusicon} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive datacatalog-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Region</th>
                                            <th>Path</th>
                                            <th>
                                                Created at
                                                <span className='sorting' onClick={() => handleSort('CreatedAt')}>
                                                    <img
                                                        src={sortColumn === "CreatedAt" ? (sortOrder === 'asc' ? upicon : downicon) : downicon}
                                                    />
                                                </span>
                                                {/* {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />} */}
                                            </th>
                                            <th>
                                                Updated at
                                                <span className='sorting' onClick={() => handleSort('UpdatedAt')}>
                                                    <img
                                                        src={sortColumn === "UpdatedAt" ? (sortOrder === 'asc' ? upicon : downicon) : downicon}
                                                    />
                                                </span>
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td onClick={() => handleDataSource()}><NavLink  >metastore_aws_us_west_2</NavLink></td>
                                            <td>us-west-2</td>
                                            <td>file:/tmp/spark-warehouse</td>
                                            <td>01/15/2025</td>
                                            <td>01/15/2025</td>
                                            <td>
                                                <div>
                                                    <img src={viewicon} alt="Edit" className='me-4' onClick={() => navigate("/database")} style={{ height: 32, cursor: 'pointer' }} />
                                                    <img src={editbtn} alt="Edit" className='me-4' />
                                                    <img src={deletebtn} alt="Edit" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td onClick={() => handleDataSource()} ><NavLink  >metastore_aws_us_west_2</NavLink></td>
                                            <td>us-west-2</td>
                                            <td>file:/tmp/spark-warehouse</td>
                                            <td>01/15/2025</td>
                                            <td>01/15/2025</td>
                                            <td>
                                                <div>
                                                    <img src={viewicon} alt="Edit" className='me-4' onClick={() => navigate("/database")} style={{ height: 32, cursor: 'pointer' }} />
                                                    <img src={editbtn} alt="Edit" className='me-4' />
                                                    <img src={deletebtn} alt="Edit" />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className=''>
                                            <td onClick={() => handleDataSource()}><NavLink  >metastore_aws_us_west_2</NavLink></td>
                                            <td>us-west-2</td>
                                            <td>file:/tmp/spark-warehouse</td>
                                            <td>01/15/2025</td>
                                            <td>01/15/2025</td>
                                            <td>
                                                <div>
                                                    <img src={viewicon} alt="Edit" className='me-4' onClick={() => navigate("/database")} style={{ height: 32, cursor: 'pointer' }} />
                                                    <img src={editbtn} alt="Edit" className='me-4' />
                                                    <img src={deletebtn} alt="Edit" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* <Pagination /> */}


                            </div>
                        </div>
                    </div>
                </div>


            </section >



            <DataSource show={show} handleClose={handleClose} />

        </>
    )
}

export default DataCatalog;