import React from "react";
import { Outlet } from "react-router";
import authImg from "../../assets/authImg.png";
import Logo from "../../Components/Logo/Logo";
import Footer from "../../Components/Footer/Footer";
import useAuth from "../../Hooks/useAuth/useAuth";
import Spinner from "../../Components/Spinner/Spinner";


const AuthLayout = () => {
    const { loading } = useAuth();
    return (
        <div className="max-w-[1440px] mx-auto">
            <div className="bg-linear-to-br from-indigo-200 to-purple-200">
                <Logo></Logo>
            </div>
            {
                loading ? <Spinner></Spinner> : <>
                    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
                        <div className="order-2 lg:order-1 col-span-1 lg:col-span-2 flex items-center justify-center bg-white">
                            <img
                                src={authImg}
                                alt="Authentication Illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="order-1 lg:order-2 flex items-center justify-center p-6 md:p-12 col-span-1 bg-linear-to-br from-indigo-100 to-purple-100">
                            <div className="w-full max-w-md">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </>
            }
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;
