import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-10 bg-linear-to-br from-indigo-100 to-purple-100">

            {/* SPINNER WITH FRAMER MOTION */}
            <motion.div
                className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
            />

            {/* ANIMATED LOADING TEXT */}
            <motion.p
                className="mt-4 text-xl font-semibold text-indigo-600"
                animate={{
                    opacity: [0.4, 1, 0.4],
                    y: [0, -6, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Loading...
            </motion.p>

        </div>
    );
};

export default Spinner;
