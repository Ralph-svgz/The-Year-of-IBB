'use client';

import { motion } from 'framer-motion';

const years = [2021, 2022, 2023, 2024, 2025];

export default function TimelineNav({ activeYear, scrollToYear }) {
    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
            {years.map((year) => (
                <motion.button
                    key={year}
                    onClick={() => scrollToYear(year)}
                    className="group flex items-center gap-4 focus:outline-none"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: activeYear === year ? 1 : 0.5,
                                opacity: activeYear === year ? 1 : 0.5,
                                backgroundColor: activeYear === year ? '#ffffff' : '#666666'
                            }}
                            whileHover={{ scale: 0.8 }}
                            className="w-3 h-3 rounded-full transition-colors duration-300"
                        />
                        {activeYear === year && (
                            <motion.div
                                layoutId="outline"
                                className="absolute w-6 h-6 rounded-full border border-white"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                    <motion.span
                        className={`text-sm font-medium transition-colors duration-300 ${activeYear === year ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                            }`}
                        whileHover={{ scale: 1.1 }}
                    >
                        {year}
                    </motion.span>
                </motion.button>
            ))}
            <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-gray-800 -z-10" />
        </nav>
    );
}
