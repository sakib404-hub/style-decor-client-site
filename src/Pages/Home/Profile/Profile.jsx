import React from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { FaEdit, FaEnvelope, FaUserTag, FaCalendarAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios/useAxios";
import Spinner from "../../../Components/Spinner/Spinner";

const Profile = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: dbUser = [], isLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstance.get(`/myUserInfo?email=${user.email}`);
            return res.data;
        },
    });

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">No user data available.</p>
            </div>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100 p-6">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

                {/* LEFT COLUMN – IMAGE */}
                <div className="flex flex-col items-center justify-center bg-indigo-50 p-8">
                    <img
                        src={dbUser?.userImage || user?.photoURL || "/defaultUser.png"}
                        alt={dbUser?.userName || "User"}
                        className="w-36 h-36 rounded-full border-4 border-indigo-500 object-cover mb-4"
                    />

                    <h3 className="text-2xl font-semibold text-indigo-700">
                        {dbUser?.userName || user?.displayName}
                    </h3>

                    <span className="mt-2 px-4 py-1 text-sm rounded-full bg-indigo-200 text-indigo-700 font-medium">
                        {dbUser?.userRole || "user"}
                    </span>
                </div>

                {/* RIGHT COLUMN – INFO */}
                <div className="p-8 flex flex-col justify-center gap-4">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4">
                        Profile Information
                    </h2>

                    <div className="flex items-center gap-3 text-gray-700">
                        <FaEnvelope className="text-indigo-500" />
                        <span>{dbUser?.userEmail}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                        <FaUserTag className="text-indigo-500" />
                        <span className="capitalize">{dbUser?.userRole}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700">
                        <FaCalendarAlt className="text-indigo-500" />
                        <span>
                            Joined:{" "}
                            {dbUser?.createdAt
                                ? new Date(dbUser.createdAt).toLocaleDateString()
                                : "N/A"}
                        </span>
                    </div>

                    <button className="mt-6 w-fit flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-md transition">
                        <FaEdit /> Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
