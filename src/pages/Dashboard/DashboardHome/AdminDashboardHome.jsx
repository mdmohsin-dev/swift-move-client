import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const AdminDashboardHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['delivery-status-stats'],
        queryFn: async () => {
            const result = await axiosSecure.get('/parcels/delivery-status/stats')
            return result.data
        }
    })

    const getPichartData = data => {
        return data.map(item => ({ name: item._id, value: item.count }))
    }
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]

    return (
        <div className='text-black'>
            <div className='w-full h-[400px]'>

                <PieChart style={{ width: '100%', maxWidth: '500px', aspectRatio: 2 }}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={getPichartData(deliveryStats)}
                        cx="50%"
                        cy="100%"
                        outerRadius="120%"
                        label
                    >
                        {getPichartData(deliveryStats).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

        </div>
    );
};

export default AdminDashboardHome;