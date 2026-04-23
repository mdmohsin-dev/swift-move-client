import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParcel = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const serviceCeners = useLoaderData()
    const regionsDuplicate = serviceCeners.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)]
    const senderRegion = watch('senderRegion')
    const recieverRegion = watch('recieverRegion')

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
        console.log('cost', cost)

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
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
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
                    <div className='flex w-full gap-7 justify-between border-b border-b-gray-300 py-7'>
                        {/* PARCEL NAME */}
                        <div className='w-full'>
                            <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Parcel Name
                            </label>
                            <input
                                type="text"
                                {...register('parcelName')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Parcel Name"
                            />
                        </div>
                        {/* PARCEL WEIGHT */}
                        <div className='w-full'>
                            <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Parcel Weight (KG)
                            </label>
                            <input
                                type="text"
                                {...register('parcelWeight')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Parcel Weight (KG)"
                            />
                        </div>
                    </div>

                    <div className='flex gap-7 mt-8'>
                        {/* SENDER DETAILS */}
                        <div className='w-full'>
                            <p className='text-xl font-extrabold pb-6'>Sender Details</p>

                            {/* SENDER NAME */}
                            <div className='w-full'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Name
                                </label>
                                <input
                                    type="text"
                                    {...register('senderName')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Name"
                                />
                            </div>

                            {/* REGION */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Region
                                </label>
                                <select {...register('senderRegion')}
                                    defaultValue="Pick a color" className="select w-full">
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
                                    defaultValue="Pick a color" className="select w-full">
                                    <option disabled={true}>Pick a Disrtict</option>
                                    {
                                        districtByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                                    }
                                </select>
                            </div>

                            {/* ADDRESS */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Address
                                </label>
                                <input
                                    type="text"
                                    {...register('senderAddress')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
                            </div>

                            {/* PHONE */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Sender Phone No
                                </label>
                                <input
                                    type="number"
                                    {...register('senderPhoneNumber')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Sender Address"
                                />
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
                                    type="email"
                                    {...register('email')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Name"
                                />
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
                                <select {...register('recieverDistrict')}
                                    defaultValue="Pick a color" className="select w-full">
                                    <option disabled={true}>Pick a Disrtict</option>
                                    {
                                        districtByRegion(recieverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                    }
                                </select>
                            </div>

                            {/* RECIEVER NAME */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Address
                                </label>
                                <input
                                    type="text"
                                    {...register('recieverAddress')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Address"
                                />
                            </div>

                            {/* RECIEVER NAME */}
                            <div className='w-full pt-5'>
                                <label className="text-sm md:text-lg font-semibold text-gray-700 flex items-center gap-2">Reciever Phone No
                                </label>
                                <input
                                    type="text"
                                    {...register('recieverPhoneNo')}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="Reciever Phone No"
                                />
                            </div>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#CAEB66] px-6 btn text-black hover:bg-black hover:text-white hover:scale-105 font-bold py-3 transition duration-300 cursor-pointer">Proceed to Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendParcel;