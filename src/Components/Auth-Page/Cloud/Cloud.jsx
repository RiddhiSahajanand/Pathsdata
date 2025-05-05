import React from 'react'
import { useNavigate } from 'react-router-dom';
import Aws from "../../../assets/images/AWS.png";

const Cloud = () => {

    const navigate = useNavigate();

    const handleCloud = async (e) => {
        e.preventDefault();

        // navigate("/home");
        navigate("/sign-in");

    }

    return (
        <>
            <div className="header">
                <div className='title'>How will you be using PATHSDATA ?</div>
            </div>

            <form
                // onSubmit={(e) => handleContinue(e, "Bringowncloud")}
                // onSubmit={(e) => {
                //     e.preventDefault();
                // }}
                onSubmit={handleCloud}
            >
                <div className='title mb-3'>
                    Professional Use
                </div>

                <div className="account-logo">
                    <div className="col-md-3 col-sm-6 col-6">
                        <div className='box h-100'>
                            <div>
                                <img src={Aws} alt="" className='img-fluid' />
                            </div>
                            <p>
                                Amazon Web
                                Services
                            </p>
                        </div>
                    </div>
                </div>

                <p className='mb-3'>
                    By clicking “Continue “ you agree to PATHSDATA <br />
                    <span>Terms of Service</span>
                </p>

                <div className="mt-4">
                    <button
                        type="submit"
                        className="sign-btn w-100"
                    >
                        Continue
                    </button>
                </div>


            </form>
        </>
    )
}

export default Cloud