import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://swift-move-server.vercel.app'
    // baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return axiosClient
};

export default useAxios;