import React, { useState } from 'react';

const initialState = {
    name: "",
    email_id: "",
    role: "",
    // image: ""
};

const CreateUsers = ({ show, handleClose, GetUserList }) => {

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        handleClose();
        GetUserList();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-header">
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
            </div>
            <div className="modal-body mt-3">
                <div className="content text-center">
                    <span className="mb-1 delete-modal-title">Invite User</span>
                    <p>
                        Invite a new team member by entering their details below.
                        You can assign an existing role or create a new one if
                        needed.
                    </p>
                </div>
                <div className="mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="add-input mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="add-input mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                placeholder="Enter Email"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                required
                            />
                        </div>
                        <div className="add-input mb-3">
                            <label htmlFor="name" className="form-label">Role</label>

                            <select
                                name="role"
                                id="role"
                                value={formData?.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="otp-btn w-100 mt-2">
                                Send Invitation Cancel
                            </button>

                            <button type="submit" className="otp-btn w-100 mt-2">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default CreateUsers;