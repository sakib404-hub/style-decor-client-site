import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm p-8 rounded-2xl shadow-xl space-y-4"
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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input input-bordered w-full bg-purple-100"
                        {...register("password", { required: "Password is required" })}
                    />
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
                <button className="btn btn-neutral w-full mt-2">Login</button>
                <div className="divider">OR</div>
                <SocialLogin />
                {/* Divider */}
                <div className="text-center text-sm text-gray-500 mt-2">
                    Don’t have an account?{" "}
                    <a className="link link-primary link-hover">Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
