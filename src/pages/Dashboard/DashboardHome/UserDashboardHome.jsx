import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserDashboardHome = () => {


    const axiosSecure = useAxiosSecure();


    // GET DELIVERY STATUS STATS
    const { data: deliveryStats = [], isLoading } = useQuery({
        queryKey: ['delivery-status-stats'],

        queryFn: async () => {

            const result = await axiosSecure.get(
                '/parcels/delivery-status/stats'
            );

            return result.data;
        }
    });


    // GET COUNT BY STATUS
    const getStatusCount = (status) => {

        return deliveryStats.find(
            item => item._id === status
        )?.count || 0;

    }


    // LOADING
    if (isLoading) {
        return <p>Loading...</p>
    }


    return (

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>

            {/* PENDING */}
            <div className='bg-yellow-100 p-6 rounded-2xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Pending
                </h2>

                <p className='text-4xl font-bold text-yellow-600 mt-2'>
                    {getStatusCount('pending-pickup')}
                </p>

            </div>


            {/* ASSIGNED */}
            <div className='bg-blue-100 p-6 rounded-2xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Assigned
                </h2>

                <p className='text-4xl font-bold text-blue-600 mt-2'>
                    {getStatusCount('rider_assigned')}
                </p>

            </div>


            {/* IN TRANSIT */}
            <div className='bg-purple-100 p-6 rounded-2xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    In Transit
                </h2>

                <p className='text-4xl font-bold text-purple-600 mt-2'>
                    {getStatusCount('in-transit')}
                </p>

            </div>


            {/* DELIVERED */}
            <div className='bg-green-100 p-6 rounded-2xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Delivered
                </h2>

                <p className='text-4xl font-bold text-green-600 mt-2'>
                    {getStatusCount('parcel_delivered')}
                </p>

            </div>

        </div>
    );
};


export default UserDashboardHome;