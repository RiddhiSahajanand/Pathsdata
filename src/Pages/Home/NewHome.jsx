import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Arrowicon from "../../assets/images/Arrow-icon.png";
import lightning from "../../assets/images/lightning.png";
import stepicn from "../../assets/images/step-icn.png";
import catelogbtn from "../../assets/images/catelog-btn.png";
import Bilingbtn from "../../assets/images/Biling-btn.png";
import Cloudservicesbtn from "../../assets/images/Cloudservices-btn.png";
import Settinghomebtn from "../../assets/images/Setting-home-btn.png";
import Userbtn from "../../assets/images/Users-btn.png";

import family from "../../assets/images/dashboard/family.png";
import organization from "../../assets/images/dashboard/organization.png";
import managefamily from "../../assets/images/dashboard/manage-family.png";
import manageorganization from "../../assets/images/dashboard/manage-organization.png";
import billing from "../../assets/images/dashboard/billing.png";
import setting from "../../assets/images/dashboard/setting.png";


const NewHome = () => {

    const navigate = useNavigate();
    // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");

    const handleLogout = async () => {
        localStorage.removeItem("user-signup-token");
        localStorage.removeItem("user-signin-token");
        navigate('/signin');
    }

    const [chartData, setChartData] = useState({
        series: [{
            name: 'Total User',
            data: [1000, 3500, 2600, 2400, 1200, 6800, 4500, 2800, 5000, 2900, 2600, 4900],
        }, {
            name: 'Total Group',
            data: [2500, 3500, 2700, 2900, 5000, 2600, 4500, 2900, 3600, 4500, 2800, 2000],
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            colors: ['#4C70FF', '#FF339C'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Total Usage',
                align: 'left',
                style: {
                    color: '#FFFFFF',
                    fontFamily: 'Poppins, serif',
                    fontWeight: 500,
                    fontSize: '18px'
                }
            },
            grid: {
                // row: {
                //     // colors: ['#f3f3f3', 'transparent'],
                //     opacity: 0.5
                // },
                show: false,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#AEB9E1',

                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#AEB9E1'
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -48,
                offsetX: -5,
                labels: {
                    colors: '#AEB9E1',
                }
            }
        },
    });

    return (
        <>

            <div className='mt-4 pd'>
                <div className='home-main-view'>
                    <div className="row text-center">
                        <div className="col-lg-4 col-md-12 welcome-box">
                            <span className='welcome-title'>Welcome to PATHSDATA!</span>
                            <span className='welcome-desc'>Organize your work and improve your <br /> perfomance with us here.</span>
                            <button
                                type="button"
                                className="journy-btn "
                            >
                                Start your journey <img src={Arrowicon} alt="" />
                            </button>
                        </div>
                        <div className="col-lg-8 col-md-12 welcome-card justify-content-end">
                            <div className="row g-3 justify-content-end">
                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <div className='card-one cursor-pointer' onClick={() => navigate("/add-family")}>
                                        <div className='card-main'>
                                            <div>
                                                <p className='card-title'>01</p>
                                            </div>
                                            <div>
                                                <img src={stepicn} alt="" height={70} />
                                            </div>
                                        </div>
                                        <div className='dummy-box'>

                                        </div>
                                        <div className='card-tecnical'>
                                            {/* <button
                                                type="button"
                                                className="technical-btn w-100">
                                                <img src={lightning} alt="" className='me-2' /> 
                                                <p>1 Min-non technical</p>
                                            </button> */}
                                            <div className='text-start mb-3'>
                                                <img src={family} alt="" className='me-2' />
                                            </div>
                                            <span className='tec-title'>Create Family</span>
                                            <span className='tec-description'>
                                                Start collaborating by creating a new Family where you can organize your projects, team members, and data efficiently.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <div className='card-two cursor-pointer' onClick={() => navigate("/add-organization")}>
                                        <div className='card-main'>
                                            <div>
                                                <p className='card-title'>02</p>
                                            </div>
                                            <div>
                                                <img src={stepicn} alt="" height={70} />
                                            </div>
                                        </div>
                                        <div className='dummy-box'>

                                        </div>
                                        <div className='card-tecnical'>
                                            {/* <button
                                                type="button"
                                                className="technical-btn w-100">
                                                <img src={lightning} alt="" className='me-2' /> <p>1 Min-non technical</p>
                                            </button> */}
                                            <div className='text-start mb-3'>
                                                <img src={organization} alt="" className='me-2' />
                                            </div>
                                            <span className='tec-title'>Create Organization</span>
                                            <span className='tec-description'>
                                                Set up your organization to manage workspaces, teams, and permissions across your platform
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='digital-ecosystem'>
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6 mt-4 mb-4">
                            <span className='second-view-title'>Manage Your Digital Ecosystem</span>
                            <p className='second-view-desc'>All the tools you need to manage your services, users, and billing in one place.</p>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-lg-3 mb-4 mb-lg-5'>
                            <div className="home-card-view" onClick={() => navigate("/family")}>
                                <div className="d-flex flex-column justify-content-between">
                                    <img src={managefamily} alt="" height={50} width={50} className='mb-3' />
                                    <div>
                                        <span className="digital-title"> Manage Your Family</span>
                                        <p className="digital-desc">
                                            Keep your family organized in one place. Add family members, set up shared spaces, and manage permissions effortlessly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 mb-4 mb-lg-5'>
                            <div className="home-card-view" onClick={() => navigate("/organization")}>
                                <div className="d-flex flex-column justify-content-between">
                                    <img src={manageorganization} alt="" height={50} width={50} className='mb-3' />
                                    <div>
                                        <span className="digital-title"> Manage Your Organization</span>
                                        <p className="digital-desc">
                                            Administer your organization with ease. Organize teams, manage permissions, and streamline workflows to keep everything running smoothly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3 mb-4 mb-lg-5'>
                            <div className="home-card-view">
                                <div className="d-flex flex-column justify-content-between">
                                    <img src={billing} alt="" height={50} width={50} className='mb-3' />
                                    <div>
                                        <span className="digital-title"> Biling</span>
                                        <p className="digital-desc">View invoices, track payments, and manage subscriptions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-3 mb-4 mb-lg-5'>
                            <div className="home-card-view">
                                <div className="d-flex flex-column justify-content-between">
                                    <img src={setting} alt="" height={50} width={50} className='mb-3' />
                                    <div>
                                        <span className="digital-title"> Settings</span>
                                        <p className="digital-desc">Customize preferences and optimize your platform.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHome;