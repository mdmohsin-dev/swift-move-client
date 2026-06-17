import { FiEdit2 } from 'react-icons/fi';
import {
    MdOutlineEmail,
    MdOutlinePhone,
    MdOutlineLocationOn,
    MdOutlineCalendarToday,
} from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { MdVerified } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const UserProfile = () => {
    const { user } = useAuth();
    const { role } = useRole()


    const displayName = user?.displayName || 'User Name';
    const email = user?.email || 'user@example.com';
    const photoURL = user?.photoURL || null;
    const joinedDate = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        })
        : 'N/A';
    const loginMethod = user?.providerData?.[0]?.providerId === 'google.com'
        ? 'Google'
        : 'Email & Password';

    const initials = displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const infoItems = [
        {
            icon: <MdOutlineEmail className="text-base text-[#0F6E56]" />,
            iconBg: 'bg-[#E1F5EE]',
            label: 'Email',
            value: email,
        },
        {
            icon: <MdOutlinePhone className="text-base text-[#0F6E56]" />,
            iconBg: 'bg-[#E1F5EE]',
            label: 'Phone',
            value: user?.phoneNumber || '+880 1700 000000',
        },
        {
            icon: <MdOutlineLocationOn className="text-base text-[#0F6E56]" />,
            iconBg: 'bg-[#E1F5EE]',
            label: 'Location',
            value: 'Dhaka, Bangladesh',
        },
        {
            icon: <MdOutlineCalendarToday className="text-base text-[#3C3489]" />,
            iconBg: 'bg-[#EEEDFE]',
            label: 'Member since',
            value: joinedDate,
        },
        {
            icon: <FcGoogle className="text-base" />,
            iconBg: 'bg-gray-100',
            label: 'Login method',
            value: loginMethod,
        },
    ];

    return (
        <div className="flex items-start justify-center py-10">
            <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">


                <div className="bg-[#02846e] px-5 pt-5 md:pb-16 pb-10">
                    <div className="flex items-center justify-between">

                        <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full">
                            <MdVerified className="text-sm text-[#9FE1CB]" />
                            {role}
                        </span>

                        {/* Edit button */}
                        <button className="inline-flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30 hover:bg-white/10 transition cursor-pointer">
                            <FiEdit2 className="text-sm" />
                            Edit profile
                        </button>
                    </div>
                </div>

                <div className="px-5 md:-mt-14 -mt-8 mb-3 gap-3">
                    <div className="relative flex-shrink-0">
                        {photoURL ? (
                            <img
                                src={photoURL}
                                alt={displayName}
                                className="md:w-26 w-16 md:h-26 h-16 rounded-full border-4 border-white object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full border-4 border-white bg-[#9FE1CB] flex items-center justify-center text-xl font-semibold text-[#085041]">
                                {initials}
                            </div>
                        )}

                    </div>

                    <div className="pb-1 flex items-center gap-2 mt-2">
                        <p className="font-semibold text-2xl text-gray-800">
                            {displayName}
                        </p>
                        <span className="flex items-center gap-1 bg-[#E1F5EE] text-[#085041] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full" />
                            Active
                        </span>
                    </div>
                </div>

                {/* ── Thin divider ── */}
                <div className="mx-5 h-px bg-gray-100 mb-4" />

                {/* ── Option 2 style: label left, value right ── */}
                <div className="px-5 pb-6 flex flex-col gap-0">
                    {infoItems.map((item, i) => (
                        <div
                            key={i}
                            className={`flex flex-col md:flex-row md:items-center gap-3 justify-between py-3 ${i !== infoItems.length - 1
                                ? 'border-b border-gray-100' : ''}`} >

                            {/* Label side */}
                            <span className="flex items-center gap-2 text-lg text-black font-semibold">
                                <span className={`w-7 h-7 rounded-lg ${item.iconBg} hidden md:flex items-center justify-center`}> {item.icon}</span>
                                {item.label}
                            </span>

                            {/* Value side */}
                            <span className="text-xs font-semibold text-gray-700  md:text-right truncate">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default UserProfile;