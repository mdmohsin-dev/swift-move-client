import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // REQUEST INTERCEPTORS
        const reqInterceptor = axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        // RESPONSE INTERCEPTORS
        const resInterceptor = axiosInstance.interceptors.response.use((response) => {
            return response
        }, (error) => {
            if (error.status === 401 || error.status === 403) {
                logout()
                    .then(() => {
                        navigate("/login")
                    })
            }
            return Promise.reject(error)
        })

        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptor)
            axiosInstance.interceptors.response.eject(resInterceptor)
        }
    }, [user])

    return axiosInstance
};

export default useAxiosSecure;