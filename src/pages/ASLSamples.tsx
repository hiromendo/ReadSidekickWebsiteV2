import { useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

declare global {
    interface Window {
        Tally?: { loadEmbeds: () => void };
    }
}

const samples = [
    {
        video: "/video1Demo.mp4",
        sentence: "He attributes his success to hard work.",
    },
    { video: "/video2Demo.mp4", sentence: "Stay consistent each day." },
    { video: "/video3Demo.mp4", sentence: "The forecast predicts rain." },
    { video: "/video4Demo.mp4", sentence: "My expectation was high." },
    { video: "/video5Demo.mp4", sentence: "His presence calmed everyone." },
];

export function ASLSamples() {
    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.1,
        });

    const { ref: samplesRef, isInView: samplesInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.1,
        });

    const { ref: ctaRef, isInView: ctaInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.2,
        });

    useEffect(() => {
        window.Tally?.loadEmbeds();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
        >
            <div className="absolute top-1/2 -translate-y-1/2 -right-20 pointer-events-none select-none">
                <span className="font-serif text-[15vw] text-ink-800/[0.02] font-medium tracking-tight">
                    ASL
                </span>
            </div>

            <div className="editorial-container">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 20,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="editorial-label block mb-6"
                    >
                        ASL Translations
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
                    >
                        Get Early Access
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: sectionInView ? 1 : 0,
                        y: sectionInView ? 0 : 30,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="max-w-5xl mx-auto mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
                >
                    <video
                        controls
                        muted
                        className="w-full rounded-xl shadow-sm border border-ink-800/10"
                        src="/ReadSidekickIntro.mov"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="h-full">
                        <iframe
                            data-tally-src="https://tally.so/embed/RG05lP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                            loading="lazy"
                            width="100%"
                            height={387}
                            title="Request Early Access"
                            style={{ border: 0, margin: 0 }}
                        />
                    </div>
                </motion.div>

                <div className="max-w-5xl mx-auto mb-16 md:mb-24">
                    <div className="h-px bg-ink-800/10" />
                </div>

                <div ref={samplesRef} className="max-w-5xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: samplesInView ? 1 : 0,
                            y: samplesInView ? 0 : 20,
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="editorial-label block mb-4"
                    >
                        Sample Translations
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: samplesInView ? 1 : 0,
                            y: samplesInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif text-display-sm md:text-display-md text-ink-900"
                    >
                        See It in Action
                    </motion.h2>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col gap-8">
                    {samples.map((sample, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: samplesInView ? 1 : 0,
                                y: samplesInView ? 0 : 50,
                            }}
                            transition={{
                                duration: 1,
                                delay: 0.3 + index * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white rounded-xl p-6 md:p-8 border border-ink-800/10 border-l-4 border-l-coral-500 shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-coral-500/10 text-coral-500 font-mono text-body-sm font-semibold mr-3 flex-shrink-0">
                                    {index + 1}
                                </span>
                                <p className="font-mono text-body-lg text-ink-900">
                                    {sample.sentence}
                                </p>
                            </div>
                            <div>
                                <video
                                    controls
                                    muted
                                    className="w-full rounded-lg border border-ink-800/5"
                                    src={sample.video}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto mt-16 md:mt-24 mb-16 md:mb-24">
                    <div className="h-px bg-ink-800/10" />
                </div>

                <div ref={ctaRef} className="max-w-5xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 20,
                        }}
                        transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="editorial-label block mb-4"
                    >
                        Join the Program
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif text-display-sm md:text-display-md text-ink-900 mb-4"
                    >
                        Help Shape the Future of ASL Access
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: ctaInView ? 1 : 0,
                            y: ctaInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-mono text-body-lg text-ink-700/80 leading-relaxed max-w-2xl"
                    >
                        Your feedback will directly inform how Read Sidekick
                        serves the Deaf and hard-of-hearing community.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: ctaInView ? 1 : 0,
                        y: ctaInView ? 0 : 30,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
                >
                    <video
                        controls
                        muted
                        className="w-full rounded-xl shadow-sm border border-ink-800/10"
                        src="/FinalASLDemoPitch.mov"
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div className="h-full">
                        <iframe
                            data-tally-src="https://tally.so/embed/RG05lP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                            loading="lazy"
                            width="100%"
                            height={387}
                            title="Request Early Access"
                            style={{ border: 0, margin: 0 }}
                        />
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
