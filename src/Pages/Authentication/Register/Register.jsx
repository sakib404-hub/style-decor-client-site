import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link } from 'react-router';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth/useAuth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../Firebase/firebase.config';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, setLoading } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const profile = {};
        try {
            const profileImage = data.photo[0];
            const formData = new FormData();
            formData.append('image', profileImage);
            const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
            const res = await axios.post(url, formData);
            profile.photoURL = res.data.data.url;
            console.log(profile.photoURL);
        } catch (error) {
            console.log(error.message)
        }

        const newUser = {
            displayName: data.name,
            email: data.email,
            photoURL: profile.photoURL,
        }
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        console.log(newUser);

        //here creating the user
        createUser(email, password)
            .then((res) => {
                console.log(res.user);
                updateProfile(auth.currentUser, { displayName: newUser.displayName, photoURL: newUser.photoURL })
                    .then(() => {
                        Swal.fire({
                            title: "Account Created!",
                            text: `Welcome, ${newUser.displayName}!`,
                            icon: "success",
                            background: "#f0f5ff",
                            color: "#2b2d42",
                            confirmButtonText: "Continue",
                            confirmButtonColor: "#6366F1",
                            showClass: {
                                popup: "animate__animated animate__fadeInDown"
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp"
                            }
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Profile Update Failed",
                            text: error.message,
                            icon: "error",
                            background: "#ffecec",
                            color: "#b91c1c",
                            confirmButtonColor: "#ef4444",
                        });
                    })
            })
            .catch((error) => {
                Swal.fire({
                    title: "Registration Failed",
                    text: error.message,
                    icon: "error",
                    background: "#ffecec",
                    color: "#7f1d1d",
                    confirmButtonColor: "#dc2626",
                });
            })
            .finally(() => {

                setLoading(false);
            })

    };
    return (
        <div className="lg:min-h-screen flex items-center justify-center px-4">
            <div className='w-full max-w-sm p-8 rounded-2xl shadow-2xl'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-1"
                >
                    <h2 className="text-2xl font-bold text-center">Register</h2>
                    {/* Name field  */}
                    <div className="form-control">
                        <label
                            htmlFor='name'
                            className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name='name'
                            id='name'
                            placeholder="Enter your name"
                            className="input input-bordered w-full bg-purple-100"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email field  */}
                    <div
                        htmlFor='email'
                        className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            placeholder="Enter your email"
                            className="input input-bordered w-full bg-purple-100"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* image taking field  */}
                    <div className='form-control'>
                        <label
                            className='label'
                            htmlFor="photo">
                            <span>Image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-neutral bg-purple-100"
                            {...register('photo', { required: 'Image is required!' })} />
                        {
                            errors.photo && <p className="text-red-500 text-sm mt-1">
                                {errors.photo.message}
                            </p>
                        }
                    </div>

                    {/* Password Field */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPass ? 'text' : "password"}
                            placeholder="Enter your password"
                            className="input input-bordered w-full bg-purple-100"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: 'Password must be six Characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                                    message: "Must include one uppercase and one lowercase letter"
                                }
                            })}
                        />
                        <div className="absolute right-3 top-9 z-10">
                            {
                                showPass ? <IoMdEyeOff onClick={() => setShowPass(!showPass)} /> : <FaEye onClick={() => setShowPass(!showPass)} />
                            }
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type='submit'
                        className="btn btn-neutral w-full my-5">Register</button>
                </form>
                <div className="divider">OR</div>
                <SocialLogin />
                {/* Divider */}
                <div className="text-center text-sm text-gray-500 mt-2">
                    Already have an account?{" "}
                    <Link to={'/login'} className="link link-primary link-hover">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;


