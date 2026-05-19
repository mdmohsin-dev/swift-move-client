import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { FaClockRotateLeft } from 'react-icons/fa6';
import useAuth from '../hooks/useAuth';

const ActiveParcels = () => {

    const axiosSecure = useAxiosSecure()
    const user = useAuth()

    const { data: activeParcels = [] } = useQuery({

        queryKey: ['active-parcels',user?.email],

        queryFn: async () => {
            const res = await axiosSecure.get('/active-parcels');
            return res.data;
        }

    })

    return (
        <div className='bg-gray-100 p-6 mt-24 rounded-md'>
            <div className='text-black flex items-center gap-3'>
                <FaClockRotateLeft color='#228464' size={25} />
                <p className='text-2xl font-medium'>Recent Parcels</p>
            </div>
            <div className='overflow-x-auto mt-6 text-black'>
                <table className='table'>
                    <thead>
                        <tr className='text-black'>
                            <th>Parcel</th>
                            <th>Status</th>
                            <th>Destination</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeParcels.map(parcel => (

                                <tr key={parcel._id}>

                                    <td>
                                        {parcel.parcelName}
                                    </td>

                                    <td>
                                        {parcel.deliveryStatus}
                                    </td>
                                    <td>{parcel.recieverDistrict}, {parcel.recieverRegion}</td>
                                    <td>{new Date(parcel.createdAt).toLocaleDateString('en-GB',
                                        {
                                            day: 'numeric',
                                            month: 'short',
                                        })}</td>
                                    <td>
                                        <Link to={`/parcel-track/${parcel.trackingId}`} className='btn btn-sm bg-[#CAEB66]'>Track Parcel</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveParcels;