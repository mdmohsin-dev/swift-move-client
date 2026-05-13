import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { parcelId } = useParams()

    const axiosSecure = useAxiosSecure()

 



  

    return (
        <div>
            <h1 className='text-black'>Plese pay ${parcel.cost} for {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn bg-[#CAEB66]'>Pay</button>
        </div>
    );
};

export default Payment;