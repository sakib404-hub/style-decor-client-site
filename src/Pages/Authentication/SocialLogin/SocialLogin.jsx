import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios/useAxios';

const SocialLogin = () => {
    const { handleGoogleSignIn } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const handleSocialOnClick = () => {
        handleGoogleSignIn()
            .then((res) => {
                const newUser = {
                    userName: res.user.displayName,
                    userEmail: res.user.email,
                    userImage: res.user.photoURL,
                    userRole: 'user'
                }
                axiosInstance.post('/users', newUser)
                    .then((res) => {
                        console.log('User saved successfully:', res.data);
                    })
                    .catch((error) => {
                        console.error(
                            'Failed to save user:',
                            error.response?.data || error.message
                        );
                    })
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: `Welcome, ${res.user.displayName || "User"}!`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: "#f0f9ff",
                    color: "#0f172a",
                    iconColor: "#22c55e",
                });
                navigate('/');
            })
            .catch((error) => {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Login failed",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "#fef2f2",
                    color: "#991b1b",
                    iconColor: "#dc2626",
                });
            })
    }
    return (
        <div>
            <button
                onClick={handleSocialOnClick}
                className="w-full mt-5 flex items-center justify-center gap-3 bg-white shadow-sm border border-gray-200 rounded-lg py-3 hover:bg-gray-100 transition-all duration-200">
                <FcGoogle className="text-2xl" />
                <span className="font-medium text-gray-700">Register with Google</span>
            </button>
        </div>
    );
};

export default SocialLogin;