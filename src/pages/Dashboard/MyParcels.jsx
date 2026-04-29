import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaPen } from 'react-icons/fa';
import { FaMagnifyingGlassPlus, FaTrash } from "react-icons/fa6";
import { Link } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels?email=${user.email}`)
            return result.data
        }
    })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra text-black">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Reciver</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((parcel, idx) =>
                                <tr key={parcel._id}>
                                    <th>{idx + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.recieverName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.paymentStatus === 'paid' ? <span className='text-green-500 font-semibold text-lg'>Paid</span> : <Link to={`/dashboard/payment/${parcel._id}`}
                                        className="btn btn-sm bg-blue-600 text-white">Pay Now</Link>}</td>
                                    <td></td>
                                    <td className='flex gap-4 justify-between'>

                                        <button className='cursor-pointer'><FaPen size={20}></FaPen></button>
                                        <button className='cursor-pointer'><FaMagnifyingGlassPlus size={20} /></button>
                                        <button className='cursor-pointer'><FaTrash color='red' size={20} /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;