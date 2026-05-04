import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxios = () => {
    return axiosClient
};

export default useAxios;