import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaPen } from 'react-icons/fa';
import { FaMagnifyingGlassPlus, FaTrash } from "react-icons/fa6";

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

    console.log(parcels)

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
                            <th>Actions</th>
                        </tr>
                    </thead><
                        tbody>
                        {
                            parcels?.map((parcel, idx) =>
                                <tr key={parcel._id}>
                                    <th>{idx + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.recieverName}</td>
                                    <td>{parcel.cost?.amount} {parcel.cost.currency}</td>
                                    <td>
                                        <div className='flex  items-center justify-between'>
                                            <button className='cursor-pointer'><FaPen size={20}></FaPen></button>
                                            <button className='cursor-pointer'><FaMagnifyingGlassPlus size={20} /></button>
                                            <button className='cursor-pointer'><FaTrash color='red' size={20} /></button>
                                        </div>
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