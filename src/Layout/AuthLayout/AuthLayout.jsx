import React from "react";
import { Outlet } from "react-router";
import authImg from "../../assets/authImg.png";

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-3">
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
    );
};

export default AuthLayout;
