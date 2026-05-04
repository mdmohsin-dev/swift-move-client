import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";

const ParcelTrack = () => {

    const { trackingId } = useParams()

    const axiosClient = useAxios()

    const { data: trackings = [] } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const result = await axiosClient.get(`/trackings/${trackingId}/logs`)
            return result.data
        }
    })

    return (
        <div className="min-h-[calc(100vh-110px)] flex justify-center items-center">
            <ul className="timeline timeline-vertical">
                {trackings.map((log, index) => {
                    const isEven = index % 2 === 0

                    return (
                        <li key={log._id}>

                            {index !== 0 && <hr className="bg-[#F4AE33]" />}

                            {isEven && (
                                <div className="timeline-start timeline-box">
                                    <p className="font-semibold text-lg">{log.details}</p>
                                    <p className="text-sm opacity-70">
                                        {new Date(log.createdAt).toLocaleString("en-BD", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                            )}

                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5 text-green-500"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            {!isEven && (
                                <div className="timeline-end timeline-box text-lg">
                                    <p className="font-semibold">{log.details}</p>
                                    <p className="text-sm opacity-70">
                                        {new Date(log.createdAt).toLocaleString("en-BD", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </p>
                                </div>
                            )}

                            {index !== trackings.length - 1 && (
                                <hr className="bg-[#F4AE33]" />
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default ParcelTrack;