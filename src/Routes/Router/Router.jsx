import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import Login from "../../Pages/Authentication/Login/Login";
import Register from "../../Pages/Authentication/Register/Register";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Profile from "../../Pages/Home/Profile/Profile";
import DashBoard from "../../Pages/DashBoard/DashBoard/DashBoard";
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import ManageUsers from "../../Pages/DashBoard/ManageUsers/ManageUsers";
import Services from "../../Pages/Services/Services";
import ServiceDetails from "../../Components/ServiceDetails/ServiceDetails";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import Spinner from "../../Components/Spinner/Spinner";
import MyBookings from "../../Pages/DashBoard/MyBookings/MyBookings";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('/locations.json'),
                hydrateFallbackElement: <Spinner />
            },
            {
                path: 'profile',
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: 'services',
                Component: Services
            },
            {
                path: 'serviceDetails/:id',
                Component: ServiceDetails
            },
            {
                path: 'aboutUs',
                Component: AboutUs
            },
            {
                path: 'contactUs',
                Component: ContactUs
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashBoard></DashBoard>
        </PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'manageUsers',
                Component: ManageUsers,
            },
            {
                path: 'myBookings',
                Component: MyBookings
            }
        ]
    }
])