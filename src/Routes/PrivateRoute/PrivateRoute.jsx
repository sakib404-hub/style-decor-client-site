import React, { Children } from 'react';
import useAuth from '../../Hooks/useAuth/useAuth';
import { Navigate } from 'react-router';
import Spinner from '../../Components/Spinner/Spinner'


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // const location = useLocation();
    // console.log(location.state);

    //checking if we got the loading state true if yes then returning a spinner
    if (loading) {
        return <Spinner></Spinner>
    }
    //if the user does not exist taking him/her to login
    if (!user) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    //if the user exist routing him to his intended path
    return children;
};

export default PrivateRoute;