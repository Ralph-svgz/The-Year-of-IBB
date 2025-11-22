'use client';

import { useState } from 'react';
import Hero from '../components/Hero';
import TimelineNav from '../components/TimelineNav';
import YearSection from '../components/YearSection';
import Scene from '../components/Scene';
import AnimatedImage from '../components/AnimatedImage';
import AnimatedVideo from '../components/AnimatedVideo';
import { motion } from 'framer-motion';

export default function Home() {
    const [activeYear, setActiveYear] = useState(2021);

    const scrollToYear = (year) => {
        const element = document.getElementById(`year-${year}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToStart = () => {
        scrollToYear(2021);
    };

    return (
        <main className="min-h-screen text-white selection:bg-white selection:text-black relative">
            <Scene />
            <TimelineNav activeYear={activeYear} scrollToYear={scrollToYear} />

            <Hero scrollToStart={scrollToStart} />

            {/* 2021 - 4 media items */}
            <YearSection
                year={2021}
                title="The Beginning"
                setYearInView={setActiveYear}
            >
                <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Freshman year. The start of a new chapter. Everything was new, exciting, and a little bit scary.
                        Meeting new people, navigating the campus, and the first taste of independence.
                    </p>
                    <AnimatedImage
                        src="/images/img1.jpg?refresh=1"
                        alt="First Day"
                        caption="First Day"
                        effect="fade"
                        className="h-64 w-full"
                    />
                    <AnimatedVideo
                        key="vid1"
                        src="/videos/vid1.mp4"
                        poster=""
                        caption="Campus Life"
                        effect="zoom"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                        controls
                    />
                </div>
                <div className="space-y-6">
                    <AnimatedVideo
                        key="vid3"
                        src="/videos/vid3.mp4"
                        poster=""
                        caption="Dorm Room"
                        effect="slide-left"
                        autoPlayOnScroll={true}
                        className="h-80 w-full"
                    />
                    <AnimatedImage
                        src="/images/img3.jpg?refresh=1"
                        alt="First Friends"
                        caption="First Friends"
                        effect="slide-right"
                        imageClassName="object-top"
                        className="h-64 w-full"
                    />
                </div>
            </YearSection>

            {/* 2022 - 5 media items (1 video) */}
            <YearSection
                year={2022}
                title="Exploration"
                setYearInView={setActiveYear}
            >
                <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Settling in. Finding my crowd and my passion. This year was about exploring different subjects,
                        joining clubs, and making memories that would last a lifetime.
                    </p>
                    <AnimatedVideo
                        key="vid2"
                        src="/videos/vid2.mp4"
                        poster=""
                        caption="Study Group"
                        effect="zoom"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                    />
                    <AnimatedImage
                        src="/images/img5.jpg?refresh=1"
                        alt="Study Group"
                        caption="Studying"
                        effect="parallax"
                        className="h-64 w-full"
                    />
                </div>
                <div className="space-y-6">
                    <AnimatedImage
                        src="/images/img4.jpg?refresh=1"
                        alt="Weekend Trip"
                        caption="Weekend Trip"
                        effect="fade"
                        className="h-64 w-full"
                    />
                    <AnimatedVideo
                        key="vid-club"
                        src="/videos/vid5.mp4"
                        poster=""
                        caption="Club Activities"
                        effect="zoom"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                        controls
                    />
                    <AnimatedVideo
                        key="vid-campus"
                        src="/videos/vid4.mp4?refresh=1"
                        poster=""
                        caption="Campus Events"
                        effect="slide-left"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                        controls
                    />
                </div>
            </YearSection>

            {/* 2023 - 5 media items (1 video) */}
            <YearSection
                year={2023}
                title="Growth"
                setYearInView={setActiveYear}
            >
                <div className="space-y-6">
                    <AnimatedImage
                        src="/images/img7.jpg?refresh=1"
                        alt="Internship"
                        caption="Internship"
                        effect="parallax"
                        className="h-96 w-full"
                    />
                    <AnimatedImage
                        src="/images/img8.jpg?refresh=1"
                        alt="Team Project"
                        caption="Team Project"
                        effect="zoom"
                        className="h-64 w-full"
                    />
                    <AnimatedVideo
                        key="vid7"
                        src="/videos/vid7.mp4"
                        poster=""
                        caption="Research"
                        effect="fade"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                        controls
                    />
                </div>
                <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Things got serious. Deeper into the major, taking on more responsibility.
                        Challenges were faced and overcome. A year of significant personal and academic growth.
                    </p>
                    <AnimatedVideo
                        src="/videos/vid6.mp4"
                        poster=""
                        caption="Growth"
                        effect="fade"
                        autoPlayOnScroll={true}
                        className="h-64 w-full"
                        controls
                    />
                    <AnimatedImage
                        src="/images/img6.jpg?refresh=1"
                        alt="Conference"
                        caption="Conference"
                        effect="slide-right"
                        imageClassName="!h-auto"
                        className="w-full"
                    />
                </div>
            </YearSection>

            {/* 2024 - 4 media items */}
            <YearSection
                year={2024}
                title="Mastery"
                setYearInView={setActiveYear}
            >
                <div className="space-y-6 md:col-span-2">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Senior projects, leadership roles, and preparing for the next step.
                        Looking back at how far I've come while focusing on the finish line.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AnimatedImage
                            src="/images/img9.jpg?refresh=1"
                            alt="Project 1"
                            caption="Project 1"
                            effect="fade"
                            className="h-56 w-full"
                        />
                        <AnimatedImage
                            src="/images/img10.jpg?refresh=1"
                            alt="Project 2"
                            caption="Project 2"
                            effect="zoom"
                            className="h-56 w-full"
                        />
                        <AnimatedImage
                            src="/images/img11.jpg?refresh=1"
                            alt="Project 3"
                            caption="Project 3"
                            effect="fade"
                            className="h-56 w-full"
                        />
                        <AnimatedImage
                            src="/images/img12.jpg?refresh=1"
                            alt="Project 4"
                            caption="Project 4"
                            effect="zoom"
                            className="h-56 w-full"
                        />
                    </div>
                </div>
            </YearSection>

            {/* 2025 - 2 media items (1 video) */}
            <YearSection
                year={2025}
                title="Graduation"
                setYearInView={setActiveYear}
            >
                <div className="md:col-span-2 space-y-8">
                    <div className="text-center">
                        <AnimatedImage
                            src="/images/img13.jpg?refresh=1"
                            alt="Graduation Day"
                            caption="Class of 2025"
                            effect="zoom"
                            className="h-96 w-full mb-8 mx-auto"
                        />
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                            The culmination of four incredible years. Ready for whatever comes next.
                        </p>
                    </div>
                </div>
            </YearSection>

            <footer className="py-12 text-center text-gray-600 text-sm relative z-10">
                <p>© 2025 Ibrahim Badamasi Babangida University</p>
            </footer>
        </main>
    );
}
