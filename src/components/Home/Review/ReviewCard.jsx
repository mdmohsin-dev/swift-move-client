import React from 'react';
import icon from "../../../assets/Frame.png"

const ReviewCard = ({ review }) => {
    return (
        <div className='bg-white p-6 flex flex-col justify-center items-start gap-5 rounded-2xl'>
            <img src={icon} alt="" />
            <p>{review.review}</p>
            <div className="border-t-2 border-dashed border-[#7E9FA3] my-2 w-full"></div>
            <div className='flex gap-2'>
                <img className='w-14 h-14 rounded-full' src={review.user_photoURL} alt="" />
                <div>
                    <p>{review.userName}</p>
                    <p>{review.role}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;