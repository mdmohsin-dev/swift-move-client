import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRider = () => {

    const [selectedParcel, setSelectedParcel] = useState(null)

    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef()

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const result = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return result.data
        }
    })


    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`)
            return res.data
        }
    })

    const openRiderAssignModal = (parcel) => {
        setSelectedParcel(parcel)
        riderModalRef.current.showModal()
    }


    const handleAssignRider = (rider) => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id
        }

        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close()
                    parcelsRefetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div className=' text-black'>
            <h1 className='text-7xl'>Assgin rider{parcels.length} </h1>

            <div>
                <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Riders:{riders.length}</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        riders.map((rider, idx) => <tr>
                                            <th>{idx + 1}</th>
                                            <td>{rider.name}</td>
                                            <td>{rider.email}</td>
                                            <td><button onClick={() => handleAssignRider(rider)}
                                                className="btn btn-sm bg-[#CAEB66] text-black">Assign</button></td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Cost</th>
                                <th>Booked at</th>
                                <th>Pickup District</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, idx) => <tr key={parcel._id}>
                                    <th>{idx + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>BDT {parcel.cost}</td>
                                    <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td><button onClick={() => openRiderAssignModal(parcel)}
                                        className='btn btn-sm bg-[#CAEB66] text-black'>Find Rider</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AssignRider;