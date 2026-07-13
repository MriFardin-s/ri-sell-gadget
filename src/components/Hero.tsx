"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    badge: string;
    ctaText: string;
    ctaLink: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Next-Gen Tech Essentials",
        subtitle: "Upgrade your workflow with our handpicked premium smart gadgets designed for absolute efficiency.",
        badge: "New Arrival",
        ctaText: "Explore Gadgets",
        ctaLink: "/gadgets"
    },
   {
        id: 2,
        title: "Curated Elite Collection",
        subtitle: "Uncompromising quality and performance. Find top-tier accessories vetted by tech experts.",
        badge: "Featured Premium",
        ctaText: "Manage Gadgets",
        ctaLink: "/manage-items"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight * 0.65,
            behavior: "smooth"
        });
    };

    return (
        <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-[var(--theme-bg)] transition-colors duration-300">
            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-theme-brown-primary)] blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#d9a066] blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 transition-all duration-700 ease-in-out flex flex-col items-center text-center ${
                            index === currentSlide
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                    >
                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[var(--color-theme-brown-primary)]/10 text-[var(--color-theme-brown-primary)] border border-[var(--color-theme-brown-primary)]/20 mb-4 shadow-xs">
                            {slide.badge}
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none max-w-4xl text-[var(--theme-text)]">
                            {slide.title.split(" ").map((word, i) => 
                                i === slide.title.split(" ").length - 1 ? (
                                    <span key={i} className="bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] bg-clip-text text-transparent"> {word}</span>
                                ) : ` ${word}`
                            )}
                        </h1>

                        <p className="mt-4 text-sm sm:text-base md:text-lg max-w-2xl text-[var(--theme-text)]/80 font-medium">
                            {slide.subtitle}
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <Link href={slide.ctaLink} className="btn-theme-brown px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg">
                                {slide.ctaText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? "w-8 bg-[var(--color-theme-brown-primary)]" 
                                : "w-2.5 bg-[var(--color-theme-brown-primary)]/30 hover:bg-[var(--color-theme-brown-primary)]/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <button
                    onClick={scrollToNextSection}
                    className="flex flex-col items-center gap-1 text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity text-[var(--theme-text)] group"
                >
                    <span className="group-hover:text-[var(--color-theme-brown-primary)] transition-colors">Scroll</span>
                    <svg
                        className="w-4 h-4 animate-bounce text-[var(--color-theme-brown-primary)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
        </section>
    );
}