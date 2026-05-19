import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TodayDelivered = () => {

    const axiosSecure = useAxiosSecure()

    const { data, isLoading } = useQuery({

        queryKey: ['today-delivered'],

        queryFn: async () => {
            const res = await axiosSecure.get(
                '/today-delivered-count'
            );

            return res.data;
        }

    })

    if (isLoading) {
        return <p>Loading...</p>
    }


    return (
        <div>
            <div className='bg-green-100 p-6 rounded-xl shadow'>

                <h2 className='text-xl font-bold text-black'>
                    Today Delivered
                </h2>

                <p className='text-4xl font-bold text-green-600 mt-2'>
                    {data?.todayDelivered || 0}
                </p>

            </div>
        </div>
    );
};

export default TodayDelivered;