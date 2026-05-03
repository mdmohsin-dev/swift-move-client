import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Rider = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const navigate = useNavigate()

    const serviceCeners = useLoaderData()
    const regionsDuplicate = serviceCeners.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = watch('region')

    const districtByRegion = (region) => {
        const regionDestricts = serviceCeners.filter(c => c.region === region)
        const districts = regionDestricts.map(d => d.district)
        return districts
    }

    const handleSaveRider = (data) => {
        console.log(data)
        axiosSecure.post("/riders", data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Applied successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div className='max-w-350 mx-auto bg-white rounded-3xl mt-14 p-12'>
            <div className='flex'>
                <div className='w-full'>
                    <form onSubmit={handleSubmit(handleSaveRider)}
                        className="space-y-4">

                        <div className='w-full'>
                            <p className='text-3xl font-extrabold pb-6'>Tell us about yourself</p>

                            {/* Rider NAME */}
                            <div className='w-full'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    {...register('name', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Your Name"
                                />
                                {errors.name?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your name</p>)}
                            </div>

                            {/* Rider Email */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    {...register('email', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Your Email"
                                />
                                {errors.email?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your email</p>)}
                            </div>

                            {/* Driving License No */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Driving License Number
                                </label>
                                <input
                                    type="text"
                                    {...register('drivingLicense', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Your License No"
                                />
                                {errors.drivingLicense?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your driving license No</p>)}
                            </div>

                            {/* REGION */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your Region
                                </label>
                                <select {...register('region')}
                                    className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </div>

                            {/* DISTRICT */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your District
                                </label>
                                <select {...register('district')}
                                    className="select w-full">
                                    <option disabled={true}>Pick a Disrtict</option>
                                    {
                                        districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                                {errors.district?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Select your District</p>)}
                            </div>

                            {/* NID no */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your NID No
                                </label>
                                <input
                                    type="number"
                                    {...register('nid', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Your Address"
                                />
                                {errors.nid?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your NID No</p>)}
                            </div>

                            {/* PHONE */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Your Phone No
                                </label>
                                <input
                                    type="number"
                                    {...register('phoneNumber', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
                                {errors.phoneNumber?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your phone no</p>)}
                            </div>

                            {/* Bike reg no */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Bike Registration Number
                                </label>
                                <input
                                    type="number"
                                    {...register('bikeRegNo', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
                                {errors.bikeRegNo?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your bike registration no</p>)}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#CAEB66] w-full px-6 btn mt-5 text-black hover:bg-black hover:text-white hover:scale-105 font-bold py-3 transition duration-300 cursor-pointer">Apply as a Rider
                        </button>
                    </form>
                </div>
                <div className='w-full'>

                </div>
            </div>
        </div>
    );
};

export default Rider;