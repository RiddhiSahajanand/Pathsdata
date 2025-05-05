// import React from 'react'
// import { Modal } from 'react-bootstrap';

// const DeleteVpc = ({ show, handleClose, handleDelete }) => {
//     return (
//         <Modal show={show} centered>
//             <div className="modal-header">
//                 <h5 className="modal-title" id="deleteModalLabel">
//                     {`Delete`}
//                 </h5>
//             </div>
//             <div className="modal-body">
//                 <p>
//                     {`Are you sure you want to delete this record?`}
//                 </p>
//             </div>
//             <div className="modal-footer">
//                 <button type="button" className="close-btn" onClick={handleClose}>
//                     No
//                 </button>
//                 <button
//                     type="button"
//                     className={`delete-btn `}
//                     onClick={handleDelete} >
//                     Yes
//                 </button>
//             </div>
//         </Modal>
//     )
// }

// export default DeleteVpc;
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import close from "../../../assets/images/close_white.png"

const DeleteVpc = ({ show, handleClose, handleDelete, isDeleteLoading }) => {
    const [subnet, setSubnet] = useState("");

    const handleChange = (e) => {
        setSubnet(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subnet.trim()) {
            toast.error("Subnet cannot be empty");
            return;
        }
        const existingSubnets = JSON.parse(localStorage.getItem("subnets")) || [];
        const updatedSubnets = [...existingSubnets, subnet];
        localStorage.setItem("subnets", JSON.stringify(updatedSubnets));
        toast.success("Subnet added successfully");
        setSubnet("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div >
                <div className="delete-modal-body">
                    <div className="content text-center">
                        <span className="delete-modal-title">Delete</span>
                    </div>

                    <div className="mt-2">
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <div className="d-flex justify-content-center">
                                    <p style={{ fontSize: '17px', color: '#fff' }}>
                                        {`Are you sure you want to delete this record?`}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="delete-modal-footer">
                    <div className='d-flex justify-content-center'>
                        <button className="cancel-btn  me-md-2" type="button" onClick={handleClose}>
                            No
                        </button>
                        <button type="submit" className="save-btn" onClick={handleDelete} disabled={isDeleteLoading} >
                            {isDeleteLoading ? (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )
                                :
                                (
                                    'Yes'
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default DeleteVpc;
