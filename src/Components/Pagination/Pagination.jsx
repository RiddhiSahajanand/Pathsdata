import React from 'react';
import leftpagination from "../../assets/images/left-pagination.png";
import rightpagination from "../../assets/images/right-pagination.png";

const Pagination = () => {
    return (
        <div className='pagination'>
            <div className="prev cursor-pointer">
                <img src={leftpagination} alt="" className='prev' disabled />
            </div>

            Page 1 of 1

            <div className="next cursor-pointer">
                <img src={rightpagination} alt="" className='next' disabled />
            </div>
        </div>
    )
}

export default Pagination