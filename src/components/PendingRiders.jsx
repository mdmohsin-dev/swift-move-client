import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TbTrashFilled } from "react-icons/tb";
import Swal from "sweetalert2";

const PendingRiders = () => {

    const axiosSecure = useAxiosSecure()

    const { data: pendingRiders = [], refetch } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders?status=pending')
            return res.data
        }
    })

    const handleApproval = (rider, status) => {
        const updatInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updatInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Rider ${status === 'approved' ? 'Approved' : 'Rejected'} Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    return (
        <div className="w-full">
            {
                pendingRiders.length < 1 ? '' : <div className="overflow-x-auto text-black mt-18 ml-24">
                    <h3 className="text-3xl font-bold">Rider Approval Requests</h3>
                <table className="table table-zebra mt-6">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Application Status</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingRiders.map((rider, idx) => <tr>
                                <th>{idx + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>
                                    {
                                        <p className={`
                                                ${rider.status === 'approved' && 'text-green-600'}
                                                ${rider.status === 'pending' && 'text-yellow-500'}
                                                ${rider.status === 'rejected' && 'text-red-600'}`}
                                        >
                                            {rider.status === 'pending' && 'pending'}
                                            {rider.status === 'approved' && 'approved'}
                                            {rider.status === 'rejected' && 'rejected'}
                                        </p>
                                    }
                                </td>
                                <td>{rider.district}</td>
                                <td>{rider.phoneNumber}</td>
                                <td className="flex gap-8">
                                    <button onClick={() => handleApproval(rider, 'approved')}
                                        className="cursor-pointer"><FaCheck color="green" size={28}></FaCheck></button>
                                    <button onClick={() => handleApproval(rider, 'rejected')}
                                        className="cursor-pointer"><RxCross2 color="red" size={28}></RxCross2></button>
                                    <button className="cursor-pointer"><TbTrashFilled color="red" size={28}></TbTrashFilled></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            }
            
        </div>
    );
};

export default PendingRiders;