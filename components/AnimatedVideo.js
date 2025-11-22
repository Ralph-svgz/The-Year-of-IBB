'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function AnimatedVideo({
    src,
    poster,
    caption,
    effect = 'fade',
    autoPlayOnScroll = true,
    className = ''
}) {
    const ref = useRef(null);
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
    const scale = useTransform(smoothProgress, [0, 0.3, 0.7], [0.9, 1, 1.03]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.3,
                rootMargin: '50px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (videoRef.current?.readyState >= 3) {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!autoPlayOnScroll || !videoRef.current || !isLoaded) return;

        if (isInView) {
            videoRef.current.play().catch(() => { });
        } else {
            videoRef.current.pause();
        }
    }, [isInView, isLoaded, autoPlayOnScroll]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    const getAnimationProps = () => {
        switch (effect) {
            case 'zoom':
                return {
                    style: { scale, opacity },
                    transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 30
                    }
                };
            case 'slide-left':
                return {
                    initial: { opacity: 0, x: 100 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: false, amount: 0.2 },
                    transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                };
            case 'slide-right':
                return {
                    initial: { opacity: 0, x: -100 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: false, amount: 0.2 },
                    transition: {
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                };
            case 'parallax':
                return {
                    style: { opacity },
                    initial: { y: 50 },
                    whileInView: { y: 0 },
                    viewport: { once: false, amount: 0.2 },
                    transition: { duration: 0.8 }
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
                className={`overflow-hidden rounded-2xl relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl group ${className}`}
                style={{
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}
            >
                <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={handleLoadedData}
                    onLoadedMetadata={handleLoadedData}
                    onCanPlay={handleLoadedData}
                    className="w-full h-full object-cover"
                    controls
                />
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {autoPlayOnScroll && isLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isInView ? 1 : 0.7 }}
                        className="absolute bottom-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-xs text-white font-medium shadow-lg"
                    >
                        {isInView ? '▶ Playing' : '⏸ Paused'}
                    </motion.div>
                )}
            </div>
            {caption && (
                <p className="mt-3 text-sm text-gray-400 text-center font-light tracking-wide">{caption}</p>
            )}
        </motion.div>
    );
}
