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

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],

        queryFn: async () => {

            const result = await axiosSecure.get(
                '/parcels/delivery-status/stats'
            );

            return result.data;
        }
    });


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

    );
};

export default AdminDashboardHome;