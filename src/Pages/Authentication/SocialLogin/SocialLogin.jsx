import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin = () => {
    return (
        <div>
            <button
                className="w-full mt-5 flex items-center justify-center gap-3 bg-white shadow-sm border border-gray-200 rounded-lg py-3 hover:bg-gray-100 transition-all duration-200">
                <FcGoogle className="text-2xl" />
                <span className="font-medium text-gray-700">Register with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;