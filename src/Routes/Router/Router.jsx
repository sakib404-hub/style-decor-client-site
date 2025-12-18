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
import PaymentsSuccess from "../../Pages/DashBoard/Payments/PaymentsSuccess/PaymentsSuccess";
import PaymentCancel from "../../Pages/DashBoard/Payments/PaymentCancel/PaymentCancel";
import PaymentHistory from "../../Pages/DashBoard/PaymentHistory/PaymentHistory";
import AdminRoute from "../AdminRoute/AdminRoute";
import AssignDecorator from "../../Pages/DashBoard/AssignDecorator/AssignDecorator";
import ManageServices from "../../Pages/DashBoard/ManageServices/ManageServices";
import DecoratorsRoute from "../DecoratorsRoute/DecoratorsRoute";
import CompletedService from "../../Pages/DashBoard/CompletedService.jsx/CompletedService";
import DashBoardHome from "../../Pages/DashBoard/DashBoardHome/DashBoardHome";
import AddService from "../../Pages/DashBoard/AddService/AddService";
import EditOrRemove from "../../Pages/DashBoard/EditOrRemove/EditOrRemove";


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
                index: true,
                Component: DashBoardHome
            },
            {
                path: 'manageUsers',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
            {
                path: 'addServices',
                element: <AdminRoute>
                    <AddService></AddService>
                </AdminRoute>
            },
            {
                path: 'editorRemoveServices',
                element: <AdminRoute>
                    <EditOrRemove></EditOrRemove>
                </AdminRoute>
            },
            {
                path: 'myBookings',
                Component: MyBookings
            },
            {
                path: 'payment-success',
                Component: PaymentsSuccess
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'payment-cancel',
                Component: PaymentCancel
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'assign-decorator',
                element: <AdminRoute>
                    <AssignDecorator></AssignDecorator>
                </AdminRoute>
            },
            {
                path: 'completedService',
                Component: CompletedService
            },
            {
                path: 'manageServices',
                element: <DecoratorsRoute>
                    <ManageServices></ManageServices>
                </DecoratorsRoute>
            }
        ]
    }
])