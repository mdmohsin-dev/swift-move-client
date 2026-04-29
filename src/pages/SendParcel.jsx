import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const SendParcel = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const navigate = useNavigate()

    const serviceCeners = useLoaderData()
    const regionsDuplicate = serviceCeners.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = watch('senderRegion')
    const recieverRegion = watch('recieverRegion')
    const parcelType = watch('parcelType')

    const districtByRegion = (region) => {
        const regionDestricts = serviceCeners.filter(c => c.region === region)
        const districts = regionDestricts.map(d => d.district)
        return districts
    }

    const handleSendParcel = (data) => {
        console.log(data)

        const isSameDistrict = data.senderDistrict === data.recieverDistrict
        const isDocument = data.parcelType === 'document'
        const parcelWeight = parseFloat(data.parcelWeight)


        let cost = 0
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCharge + extraCharge
            }
        }

        const parcelData = {
            ...data,
            cost: cost,
            createdAt: new Date()
        }

        Swal.fire({
            title: "Agree with the cost",
            text: `You will be charged ${cost} taka`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I agree"
        }).then((result) => {
            if (result.isConfirmed) {

                // SAVE PARCEL ON DATABASE
                axiosSecure.post("/parcels", parcelData)
                    .then(async res => {
                        console.log('after save data on database', res.data)
                        if (res.data.insertedId) {
                            await Swal.fire({
                                title: "Booking Confirm",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/dashboard/myParcels")
                        }
                    })
            }
        });
    }


    return (
        <div className='max-w-350 mx-auto bg-white rounded-3xl mt-14 p-12'>
            <div>
                <form onSubmit={handleSubmit(handleSendParcel)}
                    className="space-y-4">

                    {/* PARCEL TYPE */}
                    <div className='flex gap-12'>
                        <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                            <input type="radio"
                                {...register('parcelType')}
                                className='radio checked:text-[#bcf906] checked:border-2 checked:border-green-600' value='document' defaultChecked />
                            Document
                        </label>
                        <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                            <input type="radio"
                                {...register('parcelType')}
                                className='radio checked:text-[#bcf906] checked:border-2 checked:border-green-600'
                                value='not-document' />
                            Not-Document
                        </label>
                    </div>

                    {/* PARCEL NAME &&  PARCEL WEIGHT*/}
                    <div className='flex flex-col md:flex-row w-full gap-7 justify-between border-b border-b-gray-300 py-7'>
                        {/* PARCEL NAME */}
                        <div className='w-full'>
                            <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Parcel Name
                            </label>
                            <input
                                type="text"
                                {...register('parcelName', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Parcel Name"
                            />
                            {errors.parcelName?.type === 'required' && (<p className='text-red-500 text-lg font-medium'> add your Parcel Name</p>)}
                        </div>
                        {/* PARCEL WEIGHT */}
                        <div className='w-full'>
                            <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Parcel Weight (KG)
                            </label>
                            <input
                                type="number"
                                {...register('parcelWeight', {
                                    validate: (value) => {
                                        if (parcelType === 'not-document' && !value) {
                                            return 'Parcel weight is required for non-document items'
                                        }
                                        return true
                                    }
                                })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Parcel Weight (KG)"
                            />
                            {
                                errors.parcelWeight && (
                                    <p className="text-red-500 font-medium text-lg">
                                        {errors.parcelWeight.message}
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-7 mt-8'>
                        {/* SENDER DETAILS */}
                        <div className='w-full'>
                            <p className='text-xl font-extrabold pb-6'>Sender Details</p>

                            {/* SENDER NAME */}
                            <div className='w-full'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    {...register('senderName', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Name"
                                />
                                {errors.senderName?.type === 'required' && (<p className='text-red-500 text-lg font-medium'> add your name</p>)}
                            </div>

                            {/* SENDER Email */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    {...register('senderEmail')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Email"
                                />
                                {errors.senderEmail?.type === 'required' && (<p className='text-red-500 text-lg font-medium'> add your email</p>)}
                            </div>

                            {/* REGION */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Region
                                </label>
                                <select {...register('senderRegion')}
                                    className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </div>

                            {/* DISTRICT */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender District
                                </label>
                                <select {...register('senderDistrict')}
                                className="select w-full">
                                    <option disabled={true}>Pick a Disrtict</option>
                                    {
                                        districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                                {errors.senderDistrict?.type === 'required' && (<p className='text-red-500 text-lg font-medium'> select your District</p>)}
                            </div>

                            {/* ADDRESS */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Address
                                </label>
                                <input
                                    type="text"
                                    {...register('senderAddress', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
                                {errors.senderAddress?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your area address</p>)}
                            </div>

                            {/* PHONE */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Phone No
                                </label>
                                <input
                                    type="number"
                                    {...register('senderPhoneNumber', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
                                {errors.senderPhoneNumber?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your phone no</p>)}
                            </div>
                        </div>

                        {/* RECIEVER DETAILS */}
                        <div className='w-full'>
                            <p className='text-xl font-extrabold pb-6'>Reciever Details</p>

                            {/* RECIEVER NAME */}
                            <div className='w-full'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Name
                                </label>
                                <input
                                    type="text"
                                    {...register('recieverName', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Name"
                                />
                                {errors.recieverName?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your reciever name</p>)}
                            </div>

                            {/* RECIEVER Email */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Email
                                </label>
                                <input
                                    type="email"
                                    {...register('recieverEmail', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Email"
                                />
                                {errors.recieverEmail?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your reciever email</p>)}
                            </div>

                            {/* REGION */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Region
                                </label>
                                <select {...register('recieverRegion')}
                                    defaultValue="Pick a color" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </div>

                            {/* DISTRICT */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever District
                                </label>
                                <select {...register('recieverDistrict', { required: true })}
                                    defaultValue="Pick a color" className="select w-full">
                                    <option disabled={true}>Pick a Disrtict</option>
                                    {
                                        districtByRegion(recieverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                    }
                                </select>
                                {errors.recieverDistrict?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your Reciever District</p>)}

                            </div>

                            {/* RECIEVER Address */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Address
                                </label>
                                <input
                                    type="text"
                                    {...register('recieverAddress', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Address"
                                />
                                {errors.recieverAddress?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your reciever area address</p>)}
                            </div>

                            {/* RECIEVER Phone */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Phone No
                                </label>
                                <input
                                    type="text"
                                    {...register('recieverPhoneNo', { required: true })}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Phone No"
                                />
                                {errors.recieverPhoneNo?.type === 'required' && (<p className='text-red-500 text-lg font-medium'>Add your reciever phone number</p>)}
                            </div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#CAEB66] px-6 btn mt-5 text-black hover:bg-black hover:text-white hover:scale-105 font-bold py-3 transition duration-300 cursor-pointer">Proceed to Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;