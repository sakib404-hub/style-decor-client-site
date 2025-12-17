import React from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import useRole from '../../Hooks/useRole/useRole';
import Spinner from '../../Components/Spinner/Spinner';

const DecoratorsRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, isLoading } = useRole();
    if (loading || isLoading) {
        return <Spinner></Spinner>
    }
    if (role.role !== 'decorator') {
        return <p>Access Forbidden!</p>
    }
    return children;
};

export default DecoratorsRoute;