import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchPharams, setSearchPharams] = useSearchParams()
    const [paymentIfno, setPaymentInfo] = useState({})
    const sessionId = searchPharams.get("session_id")
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [])
    return (
        <div className='text-black'>
            <h2 className="text-4xl">Payment success</h2>
            <p>Your transactionId:{paymentIfno.transactionId}</p>
            <p>Your trackingId:{paymentIfno.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;