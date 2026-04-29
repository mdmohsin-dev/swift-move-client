import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className='text-black'>
            <h2 className="text-4xl">Payment Cancelled.Please try again</h2>
            <Link className='btn bg-[#CAEB66]' to="/dashboard/myParcels">Try again</Link>
        </div>
    );
};

export default PaymentCancel;