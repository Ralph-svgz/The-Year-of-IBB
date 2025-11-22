'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedImage({
    src,
    alt,
    caption,
    effect = 'fade',
    className = '',
    imageClassName = ''
}) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
    const scale = useTransform(smoothProgress, [0, 0.3, 0.7], [0.85, 1, 1.05]);
    const y = useTransform(smoothProgress, [0, 0.5, 1], [150, 0, -150]);
    const xLeft = useTransform(smoothProgress, [0, 0.3], [100, 0]);
    const xRight = useTransform(smoothProgress, [0, 0.3], [-100, 0]);

    const getAnimationProps = () => {
        switch (effect) {
            case 'zoom':
                return {
                    style: { scale, opacity },
                    transition: {
                        duration: 0.6,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }
                };

            case 'parallax':
                return {
                    style: { y, opacity },
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 30
                    }
                };

            case 'slide-left':
                return {
                    style: { x: xLeft, opacity },
                    transition: {
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }
                };

            case 'slide-right':
                return {
                    style: { x: xRight, opacity },
                    transition: {
                        duration: 0.7,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }
                };

            case 'fade':
            default:
                return {
                    initial: { opacity: 0, y: 60 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: false, amount: 0.2, margin: "0px 0px -100px 0px" },
                    transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                };
        }
    };

    return (
        <motion.div
            ref={ref}
            {...getAnimationProps()}
            className="will-change-transform"
        >
            <div
                className={`overflow-hidden rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative group ${className}`}
                style={{
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
            >
                <motion.img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${imageClassName}`}
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                />
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            {caption && (
                <p className="mt-3 text-sm text-gray-400 text-center font-light tracking-wide">{caption}</p>
            )}
        </motion.div>
    );
}
