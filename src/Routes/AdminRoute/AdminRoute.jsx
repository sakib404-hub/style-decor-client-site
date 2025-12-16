import React from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import useRole from '../../Hooks/useRole/useRole';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, isLoading } = useRole();
    if (loading || isLoading) {
        return <Loader></Loader>
    }
    if (role !== 'admin') {
        return <p>Access Forbidden!</p>
    }
    return children;
};

export default AdminRoute;