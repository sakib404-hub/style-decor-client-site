import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="lg:min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm p-8 rounded-2xl shadow-2xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
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

                    {/* Password Field */}
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type={showPass ? 'text' : "password"}
                            placeholder="Enter your password"
                            className="input input-bordered w-full bg-purple-100"
                            {...register("password", { required: "Password is required" })}
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
                        <label className="label">
                            <a className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn btn-neutral w-full mt-2">Login</button>
                </form>
                <div className="divider">OR</div>
                <SocialLogin />
                {/* Divider */}
                <div className="text-center text-sm text-gray-500 mt-2">
                    Don’t have an account?{" "}
                    <Link to={'/register'} className="link link-primary link-hover">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
