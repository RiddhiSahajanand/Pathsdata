import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Subnet = ({ show, handleClose }) => {
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
        const updatedSubnets = [...new Set([...existingSubnets, subnet])]; // Ensure unique values

        // const updatedSubnets = [...existingSubnets, subnet];
        localStorage.setItem("subnets", JSON.stringify(updatedSubnets));
        toast.success("Subnet added successfully");
        setSubnet("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-header">
            </div>
            <div className="modal-body mt-3 ">
                <div className="content text-center">
                    <span className="mb-1 delete-modal-title">Add Subnet</span>
                </div>

                <div className="mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="add-input">
                                <input
                                    type="text"
                                    placeholder="Enter Subnet"
                                    value={subnet}
                                    onChange={handleChange}
                                    autoFocus
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="otp-btn w-100 mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default Subnet;
