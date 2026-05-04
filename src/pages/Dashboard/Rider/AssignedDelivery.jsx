import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDelivery = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'rider_assigned'],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned`)
            return result.data
        }
    })


    const hadnleConfirmDelivery = (parcel, status) => {
        const statusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Parcel status is updated with ${status.split("_").join(" ")}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
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
                                <th>Confirm</th>
                                <th>Other Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                parcels.map((parcel, idx) => <tr key={parcel._id}>
                                    <th>{idx + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>{parcel.recieverDistrict}</td>
                                    <td>{
                                        parcel.deliveryStatus === 'rider_assigned' ? <div className="flex gap-4">
                                            <button onClick={() => hadnleConfirmDelivery(parcel, 'rider_arriving')}
                                                className="btn btn-sm bg-[#CAEB66] text-black">Accept</button>
                                            <button className="btn btn-sm bg-red-500 text-white">Reject</button>
                                        </div> :
                                            <p>Accepted</p>
                                    }</td>
                                    <td><div className="flex gap-4">
                                        <button onClick={() => hadnleConfirmDelivery(parcel, 'parcel_picked_up')}
                                            className="btn btn-sm bg-red-500 text-white">Markd as Picked Up</button>
                                        <button onClick={() => hadnleConfirmDelivery(parcel, 'parcel_delivered')}
                                            className="btn btn-sm bg-[#CAEB66] text-black">Markd as Delivered</button>
                                    </div></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignedDelivery;