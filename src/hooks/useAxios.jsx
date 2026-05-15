import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://swift-move-server.vercel.app'
})

const useAxios = () => {
    return axiosClient
};

export default useAxios;