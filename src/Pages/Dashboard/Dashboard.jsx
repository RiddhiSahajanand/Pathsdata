import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dashboard1 from "../../assets/images/dashboard-icon-1.png";
import dashboard2 from "../../assets/images/dashboard-icon-2.png";
import dashboard3 from "../../assets/images/dashboard-icon-3.png";
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";
import icon5 from "../../assets/images/icon5.png";
import icon6 from "../../assets/images/icon6.png";
import icon7 from "../../assets/images/icon7.png";
import icon8 from "../../assets/images/icon8.png";
import icon9 from "../../assets/images/icon9.png";
import ReactApexChart from 'react-apexcharts';



const Dashboard = () => {

    const navigate = useNavigate();
    // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");

    const handleLogout = async () => {
        // try {
        //     const res = await Axios.get(`/auth/logout`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //             "Content-Type": "application/json"
        //         }
        //     });

        //     if (res.data?.status) {
        //         toast.success(res.data?.message);

        //         localStorage.removeItem("user-signup-token");
        //         localStorage.removeItem("user-signin-token");
        //         navigate("/signin");
        //     }
        //     else {
        //         toast.error(res.data.message);
        //     }
        // } catch (err) {
        //     // console.error(err);

        //     if (err?.response?.data?.status === false) {
        //         toast.error(err?.response?.data?.message);

        //         localStorage.removeItem("adminToken");
        //         navigate("/signin");
        //     }

        // }
        localStorage.removeItem("user-signup-token");
        localStorage.removeItem("user-signin-token");
        navigate('/signin');
    }
    
    // const [state, setState] = useState({

    //     series: [
    //         {
    //             name: "Total User",
    //             data: [1000, 3500, 2800, 5000, 2900, 2600, 4900]
    //         },
    //         {
    //             name: "Total Group",
    //             data: [2500, 3500, 2700, 2900, 5000, 2600, 4500]
    //         }
    //     ],
    //     options: {
    //         chart: {
    //             height: 350,
    //             type: 'line',
    //             dropShadow: {
    //                 enabled: true,
    //                 color: '#000',
    //                 top: 18,
    //                 left: 7,
    //                 blur: 10,
    //                 opacity: 0.5
    //             },
    //             zoom: {
    //                 enabled: false
    //             },
    //             toolbar: {
    //                 show: false
    //             },


    //         },
    //         colors: ['#4C70FF', '#FF339C'],
    //         dataLabels: {
    //             enabled: true,
    //         },
    //         stroke: {
    //             curve: 'smooth'
    //         },
    //         title: {
    //             text: 'Total Usage',
    //             align: 'left'
    //         },
    //         grid: {
    //             borderColor: '#e7e7e7',
    //             row: {
    //                 colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    //                 opacity: 0.5
    //             },
    //         },
    //         markers: {
    //             size: 1
    //         },
    //         xaxis: {
    //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //             title: {
    //                 text: ''
    //             },
    //             labels: {
    //                 rotate: -45, // Rotate labels for better visibility
    //                 rotateAlways: true, // Force rotation
    //                 hideOverlappingLabels: false, // Ensure all labels are shown
    //                 showDuplicates: true, // Display all labels
    //                 style: {
    //                     fontSize: '12px'
    //                 }
    //             },
    //             tickAmount: 11
    //         },
    //         yaxis: {
    //             title: {
    //                 text: ''
    //             },
    //             min: 0,
    //             max: 10000
    //         },
    //         legend: {
    //             position: 'top',
    //             horizontalAlign: 'right',
    //             floating: true,
    //             offsetY: -25,
    //             offsetX: -5
    //         }
    //     },


    // });

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

            <div className='mt-5 pd'>
                <div className='row count'>
                    <div className='col-lg-4 col-sm-6 mb-3'>
                        <div className="card">
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Payment Duel</h5>
                                    <p className="card-text">$ 20.00</p>
                                </div>
                                <div>
                                    <img src={dashboard1} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-6 mb-3'>
                        <div className="card">
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text">5412</p>
                                </div>
                                <div>
                                    <img src={dashboard2} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-sm-6 mb-3'>
                        <div className="card">
                            <div className="card-body d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Total Groups</h5>
                                    <p className="card-text">350</p>
                                </div>
                                <div>
                                    <img src={dashboard3} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='chart-background'>
                    {/* <ReactApexChart options={state.options} series={state.series} type="line" height={350} /> */}
                    <div id="chart">
                        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
                    </div>
                </div>

                <div>
                    <div className='row mt-4'>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon1} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Workspace</h5>
                                        <p className="description">Configure workspace settings. Workspaces contain notebooks, libraries, queries, and workflows </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon2} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1">Catalog</h5>
                                        <p className="description">Manage megastores as your top-level container for catalogs, schemas (also called databases), views and tables </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon3} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Usage</h5>
                                        <p className="description">View usage details and graphs for your account in Databricks Units (DBU) or estimated costs (in $USD) </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon4} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Users & groups</h5>
                                        <p className="description">Manage identities for use with jobs, automated tools and systems </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon5} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Cloud resources</h5>
                                        <p className="description">Manage IAM credentials, VPC configurations and S3 bucket permissions for your AWS services </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon6} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Settings</h5>
                                        <p className="description">Configure your Databricks account single sign-on, user provisioning, subscription, and billing </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon7} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Create Managed Database</h5>
                                        <p className="description">Create Managed Database is a cloud-based database service designed to simplify data management </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon8} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Start using Spaces</h5>
                                        <p className="description">Feature that allows you to create, organize, and manage collaborative work environments with ease </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 mb-4 mb-lg-5'>
                            <div className=" card-view">
                                <div className="card-body d-flex justify-content-between">
                                    <div className='d-flex align-items-center pe-4'>
                                        <img src={icon9} alt="" />
                                    </div>
                                    <div>
                                        <h5 className="title1"> Product Docs</h5>
                                        <p className="description">Technical overviews, how-tos, release notes and support material </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <h4 className=' mt-2 me-5'>
                    Welcome Dashboard
                </h4> */}

                {/* <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
            </div>

        </>
    )
}

export default Dashboard