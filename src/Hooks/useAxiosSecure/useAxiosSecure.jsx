import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './../useAuth/useAuth'

const axiosSecureInstance = axios.create({
    baseURL: 'http://localhost:5016'
})

const useAxiosSecure = () => {
    const { user } = useAuth();

    useEffect(() => {
        //intercepting the requests
        axiosSecureInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
    }, [user])

    return axiosSecureInstance;
};

export default useAxiosSecure;