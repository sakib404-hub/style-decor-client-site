import React from "react";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">No user data available.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-100 to-purple-100 p-6">
            <h2 className="text-3xl font-bold text-indigo-700 mb-6">User Profile</h2>

            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center">
                <img
                    src={user.photoURL || "/defaultUser.png"}
                    alt={user.displayName || "User"}
                    className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                    {user.displayName || "Unnamed User"}
                </h3>
                <p className="text-gray-600 mb-4">{user.email}</p>
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-md transition">
                    <FaEdit /> Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
