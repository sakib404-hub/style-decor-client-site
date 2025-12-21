import React from 'react';
import useAuth from '../useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const axiosInstanceSecure = useAxiosSecure();

    // loading information 
    const { data: role = 'user', isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get(`/users/${user?.email}/role`)
            return res.data;
        }
    })
    // console.log(role);
    return { role, isLoading };
};

export default useRole;