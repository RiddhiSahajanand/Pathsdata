
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SecurityGroup = ({ show, handleClose }) => {
    const [issecurityGroup, setSecurityGroup] = useState("");

    const handleChange = (e) => {
        setSecurityGroup(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!issecurityGroup.trim()) {
            toast.error("Security Group cannot be empty");
            return;
        }
        const existingSecuritygroup = JSON.parse(localStorage.getItem("Securitygroup")) || [];
        const updatedSecuritygroup = [...existingSecuritygroup, issecurityGroup];
        localStorage.setItem("Securitygroup", JSON.stringify(updatedSecuritygroup));
        toast.success("Security Group added successfully");
        setSecurityGroup("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-header">
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
            </div>
            <div className="modal-body mt-3">
                <div className="content text-center">
                    <span className="mb-1 delete-modal-title">Add Security Group</span>
                </div>
                <div className="mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <div className="add-input">
                                <input
                                    type="text"
                                    placeholder="Enter Security Group"
                                    value={issecurityGroup}
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

export default SecurityGroup;
