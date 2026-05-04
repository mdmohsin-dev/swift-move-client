import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ComplatedDelivery = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'rider_assigned'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`)
            return result.data
        }
    })

    const calculatePayout = (parcel) => {
        if (parcel.senderDistrict === parcel.recieverDistrict) {
            return parcel.cost * 0.8
        }
        else {
            return parcel.cost * 0.6
        }
    }

    return (
        <div className='text-black'>
            <h3 className="text-4xl">Completed delivery {parcels.length}</h3>

            <div className="overflow-x-auto text-black">
                <div className="overflow-x-auto">
                    <p className="text-4xl "></p>
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Sender District</th>
                                <th>Reciever District</th>
                                <th>Total Cost</th>
                                <th>Payout</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, idx) => <tr key={parcel._id}>
                                    <th>{idx + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>{parcel.recieverDistrict}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{calculatePayout(parcel)}</td>
                                    <td><button className="btn btn-sm bg-[#F4AE33]">Cashout</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ComplatedDelivery;