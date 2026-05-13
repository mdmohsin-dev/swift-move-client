import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CountUser = () => {

    const axiosSecure = useAxiosSecure()
    const { data: roleStats = [] } = useQuery({

        queryKey: ['role-stats'],

        queryFn: async () => {
            const res = await axiosSecure.get(
                '/users/role-stats'
            );
            return res.data;
        }

    })


    const { data: deliveryStats = [], isLoading } = useQuery({
        queryKey: ['delivery-status-stats'],

        queryFn: async () => {

            const result = await axiosSecure.get(
                '/parcels/delivery-status/stats'
            );

            return result.data;
        }
    });


    const getRoleCount = role => {
        return roleStats.find(
            item => item._id === role
        )?.count || 0

    }

    const totalParcels = deliveryStats.reduce(
        (total, item) => total + item.count,
        0
    )


    const getStatusCount = (status) => {

        return deliveryStats.find(
            item => item._id === status
        )?.count || 0;

    }

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className='bg-yellow-100 p-6 rounded-xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Users
                </h2>

                <p className='text-4xl font-bold text-yellow-600 mt-2'>
                    {getRoleCount('user')}
                </p>

            </div>

            <div className='bg-blue-100 p-6 rounded-xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Riders
                </h2>

                <p className='text-4xl font-bold text-blue-600 mt-2'>
                    {getRoleCount('rider')}
                </p>

            </div>

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
    );
};

export default CountUser;