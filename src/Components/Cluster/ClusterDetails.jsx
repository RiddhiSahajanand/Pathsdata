import React from 'react'
import upicon from "../../assets/images/upIcon.png";
import downicon from "../../assets/images/downIcon.png";
import plusicon from "../../assets/images/plus.png";
import checkedIcon from "../../assets/images/checked.png";
import uncheckIcon from "../../assets/images/unchecked.svg";
import filter from "../../assets/images/filter.png";
import editbtn from "../../assets/images/edit-btn.png";
import deletebtn from "../../assets/images/delete-btn.png";
import editing from "../../assets/images/editing.png";
import restart from "../../assets/images/restart.png";
import disabled from "../../assets/images/disabled.png";
import pause from "../../assets/images/pause.png";

const ClusterDetails = () => {
    return (
        <>

            <div className="cluster_detail">
                <div className="add-section row">
                    <div className="col-lg-12">
                        <p className="add-title">New_Cluster</p>
                    </div>

                    <div className="top_btn mt-2">
                        <button type="button" className="detail-btn">
                            <img src={editing} className='img-fluid me-2' />
                            Edit
                        </button>

                        <button type="button" className="detail-btn">
                            <img src={restart} className='img-fluid me-2' />
                            Restart
                        </button>

                        <button type="button" className="detail-btn">
                            <img src={disabled} className='img-fluid me-2' />
                            Terminated
                        </button>

                        <button type="button" className="detail-btn">
                            <img src={pause} className='img-fluid me-2' />
                            Stop
                        </button>
                    </div>
                </div>



                <section className='content-section mt-4'>
                    <div className="second mt-3 mt-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="fisrt mt-4 mb-3 mb-lg-4">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-lg-6 mt-3 mt-lg-0  d-flex align-items-center">
                                            <div className='table-title active cursor-pointer'>
                                                Configuration
                                            </div>

                                            <div className='table-title cursor-pointer'>
                                                Events logs
                                            </div>

                                            <div className='table-title cursor-pointer'>
                                                libraries
                                            </div>
                                        </div>

                                        <div className="col-lg-6 d-flex align-items-center justify-content-end">
                                            <div>
                                                <button className="filter boreder-0 " type="button">
                                                    <img src={filter} className='me-2' /> Filter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="second table-responsive">

                                    <div className='table-title'>
                                        Cluster
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Cluster Name
                                                </th>
                                                <th>
                                                    Status
                                                </th>
                                                <th>
                                                    Created By
                                                </th>
                                                <th>
                                                    Creation Date
                                                </th>
                                                <th>Region</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    New_Cluster
                                                </td>
                                                <td className='running'>
                                                    Running
                                                </td>
                                                <td>
                                                    Patrick Smith
                                                </td>
                                                <td>
                                                    2025-04-03 12:56:11 NZST
                                                </td>
                                                <td>
                                                    us-central1
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>


                                    <div className='table-title'>
                                        Compute Resources
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Number of Nodes
                                                </th>
                                                <th>
                                                    Node Type
                                                </th>
                                                <th>
                                                    CPU per Node
                                                </th>
                                                <th>
                                                    Memory per Node
                                                </th>
                                                <th>Auto scaling
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    3
                                                </td>
                                                <td>
                                                    n1-standard-4
                                                </td>
                                                <td>
                                                    4 vCPU
                                                </td>
                                                <td>
                                                    16 GB RAM
                                                </td>
                                                <td className='enabled'>
                                                    Enabled
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>



                                    <div className='table-title'>
                                        Storage Configuration

                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Disk Type
                                                </th>
                                                <th>
                                                    Disk Size
                                                </th>
                                                <th>
                                                    Data Encryption
                                                </th>
                                                <th>
                                                    {/* Creation Date */}
                                                </th>
                                                <th>
                                                    {/* Region */}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    SSD

                                                </td>
                                                <td>
                                                    100 GB
                                                </td>
                                                <td className='enabled'>
                                                    Enabled
                                                </td>
                                                <td>
                                                    {/* 2025-04-03 12:56:11 NZST */}
                                                </td>
                                                <td>
                                                    {/* us-central1 */}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <div className='table-title'>
                                        Network Settings
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    VPC Network
                                                </th>
                                                <th>
                                                    Subnetwork
                                                </th>
                                                <th>
                                                    IP Allocation
                                                </th>
                                                <th>
                                                    {/* Creation Date */}
                                                </th>
                                                <th>
                                                    {/* Region */}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    default
                                                </td>
                                                <td>
                                                    default-subnet
                                                </td>
                                                <td>
                                                    Dynamic
                                                </td>
                                                <td>
                                                    {/* 2025-04-03 12:56:11 NZST */}
                                                </td>
                                                <td>
                                                    {/* us-central1 */}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </div>
                    </div>
                </section>








            </div>

        </>
    )
}

export default ClusterDetails;