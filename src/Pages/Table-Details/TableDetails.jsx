import React from 'react'
import setting2 from "../../assets/images/setting2.png";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import { Link } from 'react-router-dom';
import editIcon from "../../assets/images/edit-icon.png";
import Pagination from '../../Components/Pagination/Pagination';

const TableDetails = () => {
    return (
        <>

            <section className='content-section bg-color mt-4'>
                <div className="top">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <div className="title mb-3 mb-lg-4">Append</div>
                        </div>
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <div className='d-flex justify-content-end align-items-center'>
                                <div>
                                    <span className='text-end'>Last updated (UTC)</span><br />
                                    <span className='text-end'>January 23, 2025 at  20:46:39</span>
                                </div>
                                <button className="add-btn version-btn boreder-0 ms-3" type="button">
                                    Version 3
                                </button>
                                <button className="add-btn boreder-0 ms-3" type="button">
                                    {/* <img src={setting2} alt="" /> */}
                                    Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-2 mb-lg-4">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 d-flex">

                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="group-add-btn active"> Table overview</button>
                                            <button type="button" className="group-add-btn"> Data quality</button>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="table-info">
                                <div className="top">
                                    <div className="btn-group-info" role="group" aria-label="Basic example">
                                        <button type="button" className="group-btn-info active">Table details</button>
                                        <button type="button" className="group-btn-info"> Advanced properties</button>
                                    </div>
                                </div>
                                <form className="row">
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>

                                        <p>
                                            append
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Description
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Database
                                        </label>

                                        <p>
                                            Dhruvil
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Table management
                                        </label>

                                        <p>
                                            Managed by Glue Data Catalog
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Classification
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Location
                                        </label>

                                        <p>
                                            s3:/dhurvil-test
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Connection
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Compaction stauts
                                        </label>

                                        <p>
                                            Off
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Deprecated
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Last updated
                                        </label>

                                        <p>
                                            March 22, 2024
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Table format
                                        </label>

                                        <p>
                                            Apache Iceberg
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Input format
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Output format
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                        <label htmlFor="name" className="form-label">
                                            Serde serialization lib
                                        </label>

                                        <p>
                                            -
                                        </p>
                                    </div>
                                </form>
                            </div>

                            <div className="table-info mt-5">
                                <div className="top">
                                    <div className="btn-group-info" role="group" aria-label="Basic example">
                                        <button type="button" className="group-btn-info active">Schema</button>
                                        <button type="button" className="group-btn-info">Partition</button>
                                    </div>
                                </div>
                                <div className="top schema-top mb-3 mb-lg-4 mt-4 mt-lg-5">
                                    <div className="row justify-content-between">
                                        <div className="col-lg-6">
                                            <div className="title mb-3 mb-lg-4">Schema <span>(9)</span></div>
                                            <p>
                                                View and manage all available tables
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="schema-second mb-3 mb-lg-5">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <div className="fisrt mb-2 mb-lg-4">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-lg-6 d-flex flex-wrap gap-2">
                                                        <button className="add-btn boreder-0 " type="button">
                                                            <img src={editIcon} className='edit-icon' /> Edit schema as JSON
                                                        </button>
                                                        <button className="add-btn crawler-btn boreder-0 ms-3" type="button">
                                                            <img src={editIcon} className='edit-icon' /> Edit schema
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0">
                                                        <div className='d-flex justify-content-end'>
                                                            <div className="pseudo-search">
                                                                <button className="fa fa-search" type="submit" />

                                                                <input type="text" className='w-100' placeholder="Search Schema" autoFocus required />
                                                            </div>
                                                            <div className='d-flex justify-content-end align-items-center'>
                                                                <button className="add-btn boreder-0 ms-3" type="button">
                                                                    <img src={setting2} alt="" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className="second table-responsive schema-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Column Name</th>
                                                            <th>Data Type</th>
                                                            <th>Partition Key</th>
                                                            <th>Comment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>coustmerid</td>
                                                            <td>string</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td>2</td>
                                                            <td>name</td>
                                                            <td>string</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td>3</td>
                                                            <td>email</td>
                                                            <td>string</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td>4</td>
                                                            <td>phone</td>
                                                            <td>string</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td>5</td>
                                                            <td>address</td>
                                                            <td>string</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr className=''>
                                                            <td>6</td>
                                                            <td>age</td>
                                                            <td>biginit</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
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

                                                {/* <Pagination /> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default TableDetails