

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import emailIcon from "../../../assets/images/auth-modal.png";
import closeIcon from "../../../assets/images/close-arrow.png";

import { useNavigate } from 'react-router-dom';

export const DataSource = ({ show, handleClose }) => {

    const navigate = useNavigate();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className='close-view'>
                <div className='close-icn' onClick={() => handleClose()}>
                    <img src={closeIcon} alt="" />
                </div>
            </div>
            <div className="data-source-modal ">
                <div className="content ">
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className='text-view'>
                            <p>metastore_aws_us_west_2</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name">Data Source Type</label>
                        <div className='text-view'>
                            <p>Apache Iceberg</p>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name">Catalog Type</label>
                        <div className='mb-5 mt-3'>
                            <p>Glue</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="data-source-btn w-100"
                        onClick={() => navigate("/database")}
                    >
                        Explore Database
                    </button>
                </div>
            </div>
        </Modal>
    );
};
