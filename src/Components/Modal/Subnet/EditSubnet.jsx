import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EditSubnet = ({ show, handleClose, editData, subnetList }) => {
    const [subnet, setSubnet] = useState("");

    // Update state when `editData` changes
    console.log("subnetList", subnetList);

    useEffect(() => {
        if (editData) {
            setSubnet(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        setSubnet(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subnet.trim()) {
            toast.error("Subnet cannot be empty");
            return;
        }

        let existingSubnets = JSON.parse(localStorage.getItem("subnets")) || [];

        // Find the index of the subnet to edit
        const index = existingSubnets.findIndex(item => item === editData);

        if (index !== -1) {
            // Update the existing subnet
            existingSubnets[index] = subnet;
            localStorage.setItem("subnets", JSON.stringify(existingSubnets));
            toast.success("Subnet updated successfully");
        } else {
            toast.error("Subnet not found");
        }

        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-header">
            </div>
            <div className="modal-body mt-3">
                <div className="content text-center">
                    <span className="mb-1 delete-modal-title">Edit Subnet</span>
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

export default EditSubnet;
