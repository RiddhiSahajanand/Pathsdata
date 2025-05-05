
import { useNavigate } from "react-router-dom";
import blog1 from "../../assets/images/img_0.png"
import uparrow from "../../assets/images/sidebar/uparrow.png"
import linkarrow from "../../assets/images/linkarrow.png"
import { useState } from "react";


const Blog = () => {
    const navigate = useNavigate();
    const handleBlog = () => {
        navigate("/blog/what-is-data-management");
    }


    return (
        <>
            <section className='row justify-content-top blog-section '>
                <div>
                    {/* <h4 className='privacytitle mt-5'>Blog</h4> */}
                    <div className='blog-main-view'>
                        <div className="row text-center">
                            <div className="col-12 blog-box ">
                                <span className='welcome-title'>Our Blog</span>
                                <span className="blog-second-desc">Explore the depths of data strategy - welcome to the PATHSDATA blog.</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12 left-view">
                            <section className="blog ">
                                <div className="blog-form">
                                    {/* <form className="row"> */}
                                    <div className="col-12 mb-3">
                                        <input
                                            type="text"
                                            className="form-control custom-input"
                                            name="firstname"
                                            id="firstname"
                                            placeholder="Search Blog"
                                        />
                                        <div >
                                            <div className=" search-blog-card h-100 cursor-pointer mt-5" onClick={() => handleBlog()}>
                                                <img src={blog1} className="card-img-top" alt="Blog 1" />
                                                <div className="">
                                                    <div className="d-flex justify-content-between my-4">
                                                        <div className="">
                                                            <p className="blog-date">April 17, 2025</p>
                                                        </div>
                                                        <div>
                                                            {/* <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} /> */}
                                                        </div>
                                                    </div>
                                                    <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                                    <p className="read-more-text">Read More <img src={linkarrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} /></p>
                                                    {/* <div className="d-flex justify-content-center">
                                                        <button
                                                            className="read-more-btn">
                                                            Read More <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                        </button>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* </form> */}
                                </div>
                            </section>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-4 col-12 right-view custom-scroll">
                            <div className="row">
                                <div className="col-md-3 col-lg-4  ">
                                    <div className="blog-card h-100 cursor-pointer" onClick={() => handleBlog()}>
                                        <img src={blog1} className="card-img-top" alt="Blog 1" />
                                        <div className="">
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="">
                                                    <p className="blog-date">April 17, 2025</p>
                                                </div>
                                                <div>
                                                    <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                            <p className="blog-desc">Discover what data management is, why it's crucial for business success, and how it improves decision-making, security, and compliance. Learn about data governance, ETL processes, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-md-3 col-lg-4  ">
                                    <div className="blog-card h-100 cursor-pointer" onClick={() => handleBlog()}>
                                        <img src={blog1} className="card-img-top" alt="Blog 1" />
                                        <div className="">
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="">
                                                    <p className="blog-date">April 17, 2025</p>
                                                </div>
                                                <div>
                                                    <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                            <p className="blog-desc">Discover what data management is, why it's crucial for business success, and how it improves decision-making, security, and compliance. Learn about data governance, ETL processes, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-4  ">
                                    <div className="blog-card h-100 cursor-pointer" onClick={() => handleBlog()}>
                                        <img src={blog1} className="card-img-top" alt="Blog 1" />
                                        <div className="">
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="">
                                                    <p className="blog-date">April 17, 2025</p>
                                                </div>
                                                <div>
                                                    <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                            <p className="blog-desc">Discover what data management is, why it's crucial for business success, and how it improves decision-making, security, and compliance. Learn about data governance, ETL processes, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-4  ">
                                    <div className="blog-card h-100 cursor-pointer" onClick={() => handleBlog()}>
                                        <img src={blog1} className="card-img-top" alt="Blog 1" />
                                        <div className="">
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="">
                                                    <p className="blog-date">April 17, 2025</p>
                                                </div>
                                                <div>
                                                    <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                            <p className="blog-desc">Discover what data management is, why it's crucial for business success, and how it improves decision-making, security, and compliance. Learn about data governance, ETL processes, and more.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-4  ">
                                    <div className="blog-card h-100 cursor-pointer" onClick={() => handleBlog()}>
                                        <img src={blog1} className="card-img-top" alt="Blog 1" />
                                        <div className="">
                                            <div className="d-flex justify-content-between my-4">
                                                <div className="">
                                                    <p className="blog-date">April 17, 2025</p>
                                                </div>
                                                <div>
                                                    <img src={uparrow} alt="" className="" style={{ height: '16px', cursor: 'pointer' }} />
                                                </div>
                                            </div>
                                            <p className="blog-title">What Is Data Management and Why Does It Matter for Your Business?</p>
                                            <p className="blog-desc">Discover what data management is, why it's crucial for business success, and how it improves decision-making, security, and compliance. Learn about data governance, ETL processes, and more.</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
