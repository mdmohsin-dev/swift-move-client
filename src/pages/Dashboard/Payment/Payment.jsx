import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { parcelId } = useParams()

    const axiosSecure = useAxiosSecure()

    const { data: parcel = [] } = useQuery({
        queryKey: ['parcle', parcelId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels/${parcelId}`)
            return result.data
        }
    })



    const handlePayment = async () => {
        const paymentInfo = {
            parcelId: parcel._id,
            parcelName: parcel.parcelName,
            cost: parcel.cost,
            senderEmail: parcel.senderEmail,
            trackingId: parcel.trackingId
        }
        const result = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(result.data)
        window.location.href = result.data.url
    }

    return (
        <div>
            <h1 className='text-black'>Plese pay ${parcel.cost} for {parcel.parcelName}</h1>
            <button onClick={handlePayment} className='btn bg-[#CAEB66]'>Pay</button>
        </div>
    );
};

export default Payment;