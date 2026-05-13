import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";


const AdminDashboardHome = () => {

    const axiosSecure = useAxiosSecure();

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


    if (isLoading) {
        return <p>Loading...</p>
    }

    const pieChartData = deliveryStats.map(item => ({
        name: item._id,
        value: item.count
    }));


    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF"
    ];


    return (
        <div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>

                <div className='bg-yellow-100 p-6 rounded-xl shadow'>
                    <h2 className='text-xl font-bold text-black'>
                        Pending
                    </h2>

                    <p className='text-4xl font-bold text-yellow-600 mt-2'>
                        {getStatusCount('pending-pickup')}
                    </p>
                </div>


                <div className='bg-blue-100 p-6 rounded-xl shadow'>
                    <h2 className='text-xl font-bold text-black'>
                        Assigned
                    </h2>

                    <p className='text-4xl font-bold text-blue-600 mt-2'>
                        {getStatusCount('rider_assigned')}
                    </p>
                </div>


                <div className='bg-purple-100 p-6 rounded-xl shadow'>
                    <h2 className='text-xl font-bold text-black'>
                        In Transit
                    </h2>

                    <p className='text-4xl font-bold text-purple-600 mt-2'>
                        {getStatusCount('in-transit')}
                    </p>
                </div>


                <div className='bg-green-100 p-6 rounded-xl shadow'>
                    <h2 className='text-xl font-bold text-black'>
                        Delivered
                    </h2>

                    <p className='text-4xl font-bold text-green-600 mt-2'>
                        {getStatusCount('parcel_delivered')}
                    </p>
                </div>

            </div>

            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >

                            {
                                pieChartData.map((entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index % COLORS.length]
                                        }
                                    />

                                ))
                            }

                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

            </div>

        </div>


    );
};

export default AdminDashboardHome;