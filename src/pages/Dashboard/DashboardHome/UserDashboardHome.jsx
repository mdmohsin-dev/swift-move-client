import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ActiveParcels from '../../../components/ActiveParcels';

const UserDashboardHome = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()


    const { data: deliveryStats = [], isLoading } = useQuery({
        queryKey: ['delivery-status-stats'],

        queryFn: async () => {

            const result = await axiosSecure.get(
                '/parcels/delivery-status/stats'
            );

            return result.data;
        }
    });

    const totalParcels = deliveryStats.reduce(
        (total, item) => total + item.count,
        0
    )


    const getStatusCount = (status) => {

        return deliveryStats.find(
            item => item._id === status
        )?.count || 0;

    }


    if (isLoading) {
        return <p>Loading...</p>
    }


    return (

        <div>
            <h3 className='text-4xl text-black'>Welcome Back <span className='text-[#F4AE33] font-semiboldd text-5xl'>{user.displayName}</span></h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14'>
                <div className='bg-purple-100 p-6 rounded-xl shadow'>

                    <h2 className='text-xl font-bold text-black'>
                        Total Parcels
                    </h2>

                    <p className='text-4xl font-bold text-yellow-600 mt-2'>
                        {totalParcels}
                    </p>

                </div>

                {/* PENDING */}
                <div className='bg-yellow-100 p-6 rounded-xl shadow'>

                    <h2 className='text-xl font-bold text-black'>
                        Pending Parcels
                    </h2>

                    <p className='text-4xl font-bold text-yellow-600 mt-2'>
                        {getStatusCount('pending-pickup')}
                    </p>

                </div>


                {/* ASSIGNED */}
                <div className='bg-blue-100 p-6 rounded-xl shadow'>

                    <h2 className='text-xl font-bold text-black'>
                        Assigned Parcels
                    </h2>

                    <p className='text-4xl font-bold text-blue-600 mt-2'>
                        {getStatusCount('rider_assigned')}
                    </p>

                </div>


                {/* DELIVERED */}
                <div className='bg-green-100 p-6 rounded-2xl shadow'>

                    <h2 className='text-xl font-bold text-black'>
                        Delivered Parcels
                    </h2>

                    <p className='text-4xl font-bold text-green-600 mt-2'>
                        {getStatusCount('parcel_delivered')}
                    </p>

                </div>

            </div>
            <ActiveParcels />
        </div>
    );
};


export default UserDashboardHome;