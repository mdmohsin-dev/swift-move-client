import { useQuery } from '@tanstack/react-query';
import React from 'react';
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
            <h1>Admin dashboard</h1>

            <div className="stats shadow">
                {
                    deliveryStats.map(stat => <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-8 w-8 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <div className="stat-title">{stat._id}</div>
                        <div className="stat-value">{stat.count}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>)
                }
            </div>


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