import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './../useAuth/useAuth'
import { useNavigate } from 'react-router';

const axiosSecureInstance = axios.create({
    baseURL: 'http://localhost:5016'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //intercepting the requests
        const reqInterceptor = axiosSecureInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
        //response interceptor
        const responseInterceptor = axiosSecureInstance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                    .then(() => {
                        navigate('/login');
                    });
            }
            return Promise.reject(error);
        })

        return () => {
            axiosSecureInstance.interceptors.request.eject(reqInterceptor);
            axiosSecureInstance.interceptors.response.eject(responseInterceptor);
        }
    }, [user, logOut, navigate])


    return axiosSecureInstance;
};

export default useAxiosSecure;