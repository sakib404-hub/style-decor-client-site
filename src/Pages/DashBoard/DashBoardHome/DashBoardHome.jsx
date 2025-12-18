import React from 'react';
import useRole from '../../../Hooks/useRole/useRole';
import Spinner from '../../../Components/Spinner/Spinner';
import AdminDashBoard from './AdminDashBoard/AdminDashBoard';
import UserDashBoard from './UserDashBoard/UserDashBoard';
import DecoratorDashBoard from './DecoratorDashBoard/DecoratorDashBoard';

const DashBoardHome = () => {
    const { role, isLoading } = useRole();
    if (isLoading) {
        return <Spinner></Spinner>
    }
    if (role.role === 'admin') {
        return <AdminDashBoard></AdminDashBoard>
    }
    else if (role.role === 'user') {
        return <UserDashBoard></UserDashBoard>
    }
    else {
        return <DecoratorDashBoard></DecoratorDashBoard>
    }
};

export default DashBoardHome;