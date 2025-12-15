import React from 'react';
import useAuth from '../useAuth/useAuth';
import useAxios from '../useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // loading information 
    const { data: role = 'user', isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user?.email}/role`)
            return res.data;
        }
    })
    return { role, isLoading };
};

export default useRole;