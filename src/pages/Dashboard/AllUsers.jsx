import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUserShield, FaUserSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const [searchText, setSearchText] = useState('')

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users',searchText],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users?searchText=${searchText}`)
            return result.data
        }
    })

    const handleChangeRole = (user, newRole) => {
        const roleInfo = { role: newRole }

        Swal.fire({
            title: "Are you sure?",
            text: newRole === 'admin'
                ? `Do you want to make ${user.displayName} an Admin?`
                : `Do you want to remove from ${user.displayName} and Admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: newRole === 'admin'
                ? "Yes, make Admin"
                : "Yes, remove Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: "Success!",
                                text: newRole === 'admin'
                                    ? `${user.displayName} is now an Admin.`
                                    : `${user.displayName} is remove from an Admin.`,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div className='text-black'>
            <h1 className="text-7xl">All users: {users.length}</h1>
            <p>{searchText}</p>
            <div className="md:mt-12 mt-7">
                    <div onChange={(e) => setSearchText(e.target.value)} className="border border-gray-300 max-w-md flex justify-between">
                        <input name="location"
                            className="input focus:outline-none border-none w-full" placeholder="Search by district" type="text" />
                    </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className='flex items-center gap-3'>
                                            <img className='w-12 h-12 rounded-full' src={user.photoURL} alt="" />
                                            <div>
                                                <p className='text-xl font-medium'>{user.displayName}</p>
                                                <p className='text-lg text-green-600 font-semibold'>{user.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className='flex gap-4'>
                                            {
                                                user.role === 'admin' ?
                                                    <button onClick={() => handleChangeRole(user, 'user')}
                                                        className='cursor-pointer'><FaUserSlash size={24} color='red'></FaUserSlash></button>
                                                    :
                                                    <button onClick={() => handleChangeRole(user, 'admin')}
                                                        className='cursor-pointer'><FaUserShield color='green' size={24}></FaUserShield></button>
                                            }

                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;