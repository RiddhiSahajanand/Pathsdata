import React, { useState, useEffect } from 'react'
import setting2 from "../../assets/images/setting2.png";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import plusicon from "../../assets/images/plus.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";

import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination/Pagination';

const TableList = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isChecked, setIsChecked] = useState(false);

    const tableList = [
        { id: '1', name: 'dhruvil', database: 'demo', location: 'file:/tmp/spark/a.', classification: '-', deprected: '-', viewdata: 'Table Data	', quality: 'View data quality' },
        { id: '2', name: 'dhruvil', database: 'run', location: 'file:/tmp/spark/a.', classification: '-', deprected: '-', viewdata: 'Table Data	', quality: 'View data quality' }
    ]

    const toggleCheckbox = () => {
        if (isChecked) {
            setSelectedRows([]);
        } else {
            setSelectedRows(tableList.map((_, index) => index));
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
        if (selectedRows.length === tableList.length) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selectedRows, tableList.length]);


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

            <section className="title pd">
                <div className="row">
                    <div className="col-12 mt-4 mb-4">
                        <h3>Tables </h3>
                        <p>
                            A table is the metadata definition that represents your data, Including its schema. A table can be used as a source or target in a job definition
                        </p>
                    </div>
                </div>
            </section>

            <section className='content-section pd'>
                <div className="top">
                    <div className="row justify-content-between">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <div className="title mb-3 mb-lg-3">Tables <span>(02)</span></div>
                            <p>
                                View and manage all available tables
                            </p>
                        </div>
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <div className='d-flex justify-content-end align-items-center'>
                                <div>
                                    <span className='text-end'>Last updated (UTC)</span><br />
                                    <span className='text-end'>January 23, 2025 at  20:46:39</span>
                                </div>
                                <button className="add-btn boreder-0 ms-3" type="button">
                                    <img src={setting2} alt="" />
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
                                    <div className="col-lg-6">
                                        <div className='d-flex flex-wrap gap-2'>

                                            <button className="add-btn boreder-0 " type="button">
                                                <img src={plusicon} className='me-2' />  Add Database
                                            </button>

                                            {/* <button className="add-btn edit-btn boreder-0 ms-3" type="button">
                                            <img src={edit} alt="" />
                                        </button> */}

                                            <button className="add-btn crawler-btn boreder-0 ms-3" type="button">
                                                Add Table Using Crawler
                                            </button>

                                            <button
                                                className="add-btn delete-btn boreder-0 ms-3"
                                                type="button"
                                                disabled={selectedRows.length === 0}
                                            >
                                                <img src={Delete} alt="" />
                                            </button>

                                            {selectedRows.length > 0 && (
                                                <span className="row-text ms-3">{selectedRows.length} row selected</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 ">
                                        <div className=''>
                                            <div className="pseudo-search">
                                                <button className="fa fa-search" type="submit" />

                                                <input type="text" placeholder="Search Tables" autoFocus required />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="second table-responsive">
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
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Database
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Location
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Classification
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Deprected
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>View data
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                            <th onClick={handleSort} style={{ cursor: 'pointer' }}>Data quality
                                                {sortOrder === 'asc' ? <img src={upicon} style={{ paddingLeft: '10px' }} /> : <img src={downicon} style={{ paddingLeft: '10px' }} />}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableList.map((item, index) => {
                                            return (
                                                <>
                                                    <tr>
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
                                                        <td><Link to="/table-details">{item?.name}</Link></td>
                                                        <td>{item?.database}</td>
                                                        <td>{item?.location}</td>
                                                        <td>{item?.classification}</td>
                                                        <td>{item?.deprected}</td>
                                                        <td>{item?.viewdata}</td>
                                                        <td>{item?.quality}</td>
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

                                {/* <Pagination /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default TableList