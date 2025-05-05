import React from 'react';
import setting2 from "../../assets/images/setting2.png";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import editbtn from "../../assets/images/edit-btn.png";
import { useNavigate } from 'react-router-dom';


const CloudResource = () => {
    const navigate = useNavigate();

    const createVPC = () => {
        navigate("/add-vpc")
    }
    return (
        <>
            <section className='content-section pd mt-5'>
                <div className="second mt-3 mt-lg-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="fisrt mb-2 mb-lg-4">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-lg-6 d-flex">
                                        <button className="add-btn boreder-0 " type="button" onClick={() => createVPC()}>
                                            + Create
                                        </button>

                                        <button className="add-btn delete-btn boreder-0 ms-3" type="button">
                                            <img src={Delete} alt="" />
                                        </button>
                                    </div>
                                    <div className="col-lg-6 col-xl-3 mt-3 mt-lg-0 ">
                                        <div className=''>
                                            <div className="pseudo-search">
                                                <button className="fa fa-search" type="submit" />
                                                <input type="text" placeholder="Search members" autoFocus required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="second table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Create Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                            <td>11 February, 2025</td>
                                            <td><img src={editbtn} /></td>
                                        </tr>
                                        <tr>
                                            <td>Emily Wise</td>
                                            <td>11 February, 2025</td>
                                            <td><img src={editbtn} /></td>
                                        </tr>
                                        <tr>
                                            <td>Devil Maria</td>
                                            <td>11 February, 2025</td>
                                            <td><img src={editbtn} /></td>
                                        </tr>
                                        <tr>
                                            <td>Gloria John</td>
                                            <td>11 February, 2025</td>
                                            <td><img src={editbtn} /></td>
                                        </tr>
                                        <tr>
                                            <td>Mathias Hysi</td>
                                            <td>11 February, 2025</td>
                                            <td><img src={editbtn} /></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="5">
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
                                    </tfoot>

                                </table>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CloudResource;