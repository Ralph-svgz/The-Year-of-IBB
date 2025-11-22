'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function YearSection({ year, title, children, setYearInView }) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setYearInView(year);
                    }
                });
            },
            {
                threshold: [0.3, 0.5, 0.7],
                rootMargin: '-20% 0px -20% 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [year, setYearInView]);

    return (
        <section
            id={`year-${year}`}
            ref={ref}
            className="min-h-screen w-full flex flex-col justify-center items-center p-4 md:p-8 md:pl-32 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.1
                }}
                viewport={{ once: false, amount: 0.2 }}
                className="max-w-4xl w-full z-10"
            >
                <div className="mb-8 md:mb-12">
                    {/* Clean title with year badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.2
                        }}
                        viewport={{ once: false }}
                        className="flex items-center gap-4 md:gap-6 mb-4"
                    >
                        <span className="text-xl md:text-3xl font-bold text-white/40 backdrop-blur-sm bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
                            {year}
                        </span>
                    </motion.div>

                    <motion.h3
                        className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                            delay: 0.3
                        }}
                        viewport={{ once: false }}
                    >
                        {title}
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {children}
                </div>
            </motion.div>
        </section>
    );
}
