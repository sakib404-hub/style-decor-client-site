import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import errorImg from "../../assets/image.png";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6"
            >
                <img src={errorImg} alt="Error" className="w-40 h-40 object-contain" />

                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Oops! Something went wrong
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-gray-600 text-center"
                >
                    The page you are looking for might have been removed or is temporarily unavailable.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-600 transition"
                >
                    Go Home
                </motion.button>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
