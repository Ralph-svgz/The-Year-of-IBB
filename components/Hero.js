'use client';

import { motion } from 'framer-motion';

export default function Hero({ scrollToStart }) {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="z-10 text-center"
            >
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 tracking-tighter px-4">
                    My University Years <span role="img" aria-label="celebration">💯😁</span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 font-light tracking-wide px-4">
                    2021 — 2025
                </p>

                <motion.button
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 25px rgba(255, 255, 255, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToStart}
                    className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                    Start the Journey
                </motion.button>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 md:bottom-12 w-full flex flex-col items-center gap-2 text-gray-500 z-20 pointer-events-none"
            >
                <span className="text-xs md:text-sm uppercase tracking-[0.2em]">Scroll to explore</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </motion.div>
        </section>
    );
}
