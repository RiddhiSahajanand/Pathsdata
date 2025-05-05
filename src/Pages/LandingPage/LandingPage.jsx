import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './LandingPage.css';
import review1 from '../../assets/images/home/review1.png';
import review2 from '../../assets/images/home/review2.png';
import review3 from '../../assets/images/home/review3.png';
import rightarrow from '../../assets/images/home/right-arrow.png';
import company1 from '../../assets/images/home/company1.png';
import company2 from '../../assets/images/home/company2.png';
import company3 from '../../assets/images/home/company3.png';
import company4 from '../../assets/images/home/company4.png';
import company5 from '../../assets/images/home/company5.png';
import feature1 from '../../assets/images/home/feature-icon1.png';
import feature2 from '../../assets/images/home/feature-icon2.png';
import feature3 from '../../assets/images/home/feature-icon3.png';
import feature4 from '../../assets/images/home/feature-icon4.png';
import feature5 from '../../assets/images/home/feature-icon5.png';
import feature6 from '../../assets/images/home/feature-icon6.png';
import { Axios } from '../../helper/Axios';
import { toast } from 'react-toastify';

const initialState = {
    firstname: "",
    lastname: "",
    work_email: "",
    organization: "",
    message: ""
}

const LandingPage = () => {
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState(initialState);


    useEffect(() => {
        const sectionId = searchParams.get('scrollTo');
        if (sectionId) {
            const el = document.getElementById(sectionId);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 300); // Delay to wait until page fully renders
            }
        }
    }, [searchParams]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setContact((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const payload = {
            first_name: contact.firstname,
            last_name: contact.lastname,
            work_email: contact.work_email,
            organization: contact.organization,
            message: contact.message
        }

        try {
            const res = await Axios.post("/auth/contact_us", payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res?.data?.statusCode === 200) {
                toast.success(res?.data?.message);
                setContact(initialState);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error("Error Contact-Us++", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {/* ---- Banner Start ---- */}
            <section className='banner'>
                <div className="container text-center">
                    <div className="d-none reviews d-flex justify-content-center align-items-center">
                        <img
                            src={review1}
                            alt="Review 1"
                            className="review-avatar img-fluid"
                        />
                        <img
                            src={review2}
                            alt="Review 2"
                            className="review-avatar img-fluid"
                        />
                        <img
                            src={review3}
                            alt="Review 3"
                            className="review-avatar img-fluid"
                        />
                        <span className='ms-3 me-1'>200+</span>
                        Reviews
                    </div>

                    <h1 className="title">
                        Your Data. One Platform. Zero Bottlenecks.
                        <br className='d-none d-md-block' />
                    </h1>

                    <p className="description">
                        PathsData lets you run fast without sacrificing your data architecture since it is meant for high-throughput environments with low-latency.
                    </p>

                    <div className="buttons">
                        <Link
                            to="https://app.usemotion.com/meet/dhruvil-shah-hqvx/meeting"
                            target='_blank'
                            className="main-button discover-btn"
                        >
                            Discover Demo
                            <img src={rightarrow} className='ms-2' />
                        </Link>

                        {/* <button type='button' className="main-button">
                            Learn More
                        </button> */}
                    </div>
                </div>

                {/* ---- Company Start ---- */}
                <section className='mt-5 company'>
                    <div className="d-none container text-center">
                        <h5 className="text-white">Trusted by 30+ companies</h5>

                        <div className="slider-container">
                            <div className='images d-flex justify-content-center align-items-center flex-wrap'>
                                <img src={company1} alt="Company 1" className="company-logo" />
                                <img src={company2} alt="Company 2" className="company-logo" />
                                <img src={company3} alt="Company 3" className="company-logo" />
                                <img src={company4} alt="Company 4" className="company-logo" />
                                <img src={company5} alt="Company 5" className="company-logo" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* ---- Company End ---- */}

                {/* ---- Square Start ---- */}
                <div className='squre s1'></div>
                <div className='squre s2'></div>
                <div className='squre s3'></div>
                <div className='squre s4'></div>
                <div className='squre s5'></div>
                <div className='squre s6'></div>
                {/* ---- Square End ---- */}
            </section>
            {/* ---- Banner End ---- */}

            {/* ---- Company Start ---- */}
            {/* <section className='company'>
                            <div className="container text-center">
                                <h5 className="text-white">Trusted by 30+ companies</h5>
            
                                <div className="slider-container">
                                    <div className='images d-flex justify-content-center align-items-center'>
                                        <img src={company1} alt="Company 1" className="company-logo" />
                                        <img src={company2} alt="Company 2" className="company-logo" />
                                        <img src={company3} alt="Company 3" className="company-logo" />
                                        <img src={company4} alt="Company 4" className="company-logo" />
                                        <img src={company5} alt="Company 5" className="company-logo" />
                                    </div>
                                </div>
                            </div>
                        </section> */}
            {/* ---- Company End ---- */}

            {/* ---- Feature Start ---- */}
            <section className='features' id="features">
                <div className="container text-center">
                    <h5 className="text-white">Features</h5>

                    <h1 className="title text-white">
                        Simple framework for your business
                        <br className='d-none d-md-block' />
                        that just works
                    </h1>

                    <p className="description text-white">
                        Discover the unique features designed to enhance your experience. From innovative solutions to user-friendly functionality, we ensure every detail is crafted with your needs in mind.
                    </p>
                </div>

                <div className="info row g-4">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature1} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Rust-based
                            </div>
                            <p>
                                PATHSDATA's processing engine runs on Rust, which avoids garbage collection and maintains memory safty. By doing so, it also offers consistent performance under pressure by maximizing speed and concurrency.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature2} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Unifying Analytic Platform
                            </div>
                            <p>
                                With the capacity to aggregate unstructured and structured data, PATHSDATA simplifies processes and accelerates insight generation.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature3} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Apache DataFusion
                            </div>
                            <p>
                                By combining all your data under one query layer, PATHSDATA improves integration, transformation, and scalability across workloads using Apache DataFusion.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature4} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Apache Iceberg
                            </div>
                            <p>
                                PATHSDATA uses Apache Iceberg to handle large datasets with full transactional support. Schema modifications are securely controlled, and data stays constant at scale.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature5} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Standalone and Distributed
                            </div>
                            <p>
                                Run PATHSDATA as a standalone for lightweight tasks, or you can scale it across distributed environments. The system can fit your setup without losing speed, reliability, or simplicity in use.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="box">
                            <div className='icon'>
                                <img src={feature6} alt="" className='img-fluid mb-2 mb-md-3' />
                            </div>
                            <div className="title mb-2 mb-md-3">
                                Cloud Support
                            </div>
                            <p>
                                PATHSDATA offers simple managed services that are fully compatible with the cloud configurations of Amazon Web Services (AWS), hence simplifying the implementation procedure. Your system can scale automatically, ensuring efficient resource allocation without much overhead.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ---- Feature End ---- */}

            {/* ---- Contact Start ---- */}
            <section className='contact' id="contact">
                <div className="container text-center">
                    <h5 className="text-white">Contact us</h5>

                    <h1 className="title text-white">
                        Book a demo today
                    </h1>

                    <p className="description">
                        We’re all ears! Talk to us about your needs, and we’ll provide the best possible solution.
                    </p>
                </div>

                <div className="contact-form">
                    <form className="row" onSubmit={handleSubmit}>
                        <div className='col-lg-6 group'>
                            <label htmlFor="firstname" className='mb-2'>
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder='Your first name'
                                // autoComplete='off'
                                value={contact.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-lg-6 group'>
                            <label htmlFor="lastname" className='mb-2'>
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder='Your last name'
                                // autoComplete='off'
                                value={contact.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-lg-6 group'>
                            <label htmlFor="work_email" className='mb-2'>
                                Work email
                            </label>
                            <input
                                type="email"
                                name="work_email"
                                id="work_email"
                                placeholder='Enter work email'
                                // autoComplete='off'
                                value={contact.work_email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-lg-6 group'>
                            <label htmlFor="organization" className='mb-2'>
                                Organization name
                            </label>
                            <input
                                type="text"
                                name="organization"
                                id="organization"
                                placeholder='Your organization name'
                                // autoComplete='off'
                                value={contact.organization}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-lg-12 group'>
                            <label htmlFor="message" className='mb-2'>
                                How can we help you?
                            </label>
                            <textarea
                                type="text"
                                name="message"
                                id="message"
                                placeholder='Enter short message'
                                // autoComplete='off'
                                value={contact.message}
                                onChange={handleChange}
                                required
                                style={{ height: "200px" }}
                            />
                        </div>

                        <div className="text-center submit">
                            <button
                                type='submit'
                                className={`main-button submitreq-btn ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="me-2 spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                            style={{ width: '18px', height: '18px' }}
                                        ></span>
                                    </>
                                ) : (
                                    "Submit Request"
                                )}

                                {/* Submit request */}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            {/* ---- Contact End ---- */}

        </>
    )
}

export default LandingPage;