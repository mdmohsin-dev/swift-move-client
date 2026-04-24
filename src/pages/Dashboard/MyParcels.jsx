import React from 'react';
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyParcels = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels?email=${user.email}`)
            return result
        }
    })

    console.log(parcels)

    return (
        <div>

        </div>
    );
};

export default MyParcels;