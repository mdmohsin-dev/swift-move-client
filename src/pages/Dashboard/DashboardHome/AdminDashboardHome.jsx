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
import CountUser from '../../../components/CountUser';
import PendingRiders from '../../../components/PendingRiders';


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
            <CountUser />

<PendingRiders/>

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