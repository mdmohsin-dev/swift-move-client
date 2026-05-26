import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const RiderTotalEarnings = () => {

    const axiosSecure = useAxiosSecure();
    const {  data,isLoading} = useQuery({

        queryKey: ['rider-earnings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rider/earnings');
            return res.data;
        }

    });

    if (isLoading) {
        return <p>Loading...</p>
    }

    console.log(data);

    return (

       

            <div className='bg-green-100 p-6 rounded-xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Total Earnings
                </h2>

                <p className='text-4xl font-bold text-green-600 mt-2'>

                    ৳ {data?.totalEarnings || 0}

                </p>

        </div>

    );
};

export default RiderTotalEarnings;