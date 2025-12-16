import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = () => {
    const [activeTab, setActiveTab] = useState("Our Story");
    const tabs = ["Our Story", "Our Mission", "Our Achievements", "Team & Values"];
    const content = {
        "Our Story": [
            "StyleDecor was born from a passion for transforming ordinary spaces into unforgettable experiences. What started as a small décor initiative quickly grew through creativity, dedication, and love for design.",
            "From intimate anniversaries to grand celebrations, our focus has always been on detail, elegance, and emotional impact.",
            "Today, StyleDecor is trusted by hundreds of clients to turn their special moments into beautifully styled memories."
        ],

        "Our Mission": [
            "Our mission is to bring creativity, elegance, and perfection to every celebration we design.",
            "We aim to make event décor stress-free by offering thoughtful planning, premium materials, and flawless execution.",
            "Every setup we create is designed to reflect our clients’ stories, emotions, and dreams."
        ],

        "Our Achievements": [
            "Successfully designed and executed 500+ decoration projects.",
            "Trusted by couples, families, and corporate clients across multiple cities.",
            "Maintained a 4.8★ average client satisfaction rating.",
            "Specialized in anniversaries, birthdays, housewarmings, and custom events."
        ],

        "Team & Values": [
            "Our team consists of passionate designers, decorators, planners, and support staff who love what they do.",
            "We believe in creativity, professionalism, and delivering beyond expectations.",
            "Behind every beautiful setup is a team working tirelessly to ensure your celebration feels truly special."
        ],
    };

    // ✨ Animation
    const fadeSlide = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
        exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center px-4 py-10">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-sm p-10">

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    About StyleDecor
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-3 text-gray-500 max-w-2xl"
                >
                    We specialize in creating elegant, stylish, and memorable décor experiences
                    for life’s most beautiful moments.
                </motion.p>

                <hr className="my-8 text-gray-300" />

                {/* Tabs */}
                <div className="flex flex-wrap gap-6 text-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 transition-all ${activeTab === tab
                                ? "text-pink-600 font-semibold border-b-2 border-pink-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Animated Content */}
                <div className="mt-8 text-gray-600 leading-relaxed text-[17px] min-h-[260px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={fadeSlide}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-6"
                        >
                            {content[activeTab].map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
