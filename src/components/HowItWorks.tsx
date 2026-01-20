import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState } from "react";
import { useLanguage } from "../i18n";

type Mode = "easy" | "medium" | "hard";

export function HowItWorks() {
    const [activeMode, setActiveMode] = useState<Mode>("easy");
    const { t } = useLanguage();

    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.1,
        });

    const { ref: headerRef, isInView: headerInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.3,
        });

    const { ref: demoRef, isInView: demoInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.2,
        });

    const modes = {
        easy: {
            title: t.howItWorks.modes.easy.title,
            description: t.howItWorks.modes.easy.description,
            color: "bg-teal-500",
            sample: t.howItWorks.modes.easy.sample,
        },
        medium: {
            title: t.howItWorks.modes.medium.title,
            description: t.howItWorks.modes.medium.description,
            color: "bg-ochre-400",
            sample: t.howItWorks.modes.medium.sample,
        },
        hard: {
            title: t.howItWorks.modes.hard.title,
            description: t.howItWorks.modes.hard.description,
            color: "bg-coral-500",
            sample: t.howItWorks.modes.hard.sample,
        },
    };

    const comingSoon = t.howItWorks.comingSoon.features;

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden"
        >
            {/* Section number */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: sectionInView ? 1 : 0 }}
                transition={{
                    duration: 1,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-20 left-6 md:left-12 lg:left-20"
            >
                <span className="section-number">03</span>
            </motion.div>

            <div className="editorial-container relative z-10">
                {/* Section header */}
                <div ref={headerRef} className="mb-16 md:mb-24 max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: headerInView ? 1 : 0,
                            y: headerInView ? 0 : 20,
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="editorial-label block mb-6"
                    >
                        {t.howItWorks.sectionLabel}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: headerInView ? 1 : 0,
                            y: headerInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
                    >
                        {t.howItWorks.title}{" "}
                        <span className="italic">
                            {t.howItWorks.titleItalic}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: headerInView ? 1 : 0,
                            y: headerInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-mono text-body-lg text-ink-700/80 leading-relaxed"
                    >
                        {t.howItWorks.subtitle}
                    </motion.p>
                </div>

                {/* Interactive Demo */}
                <motion.div
                    ref={demoRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: demoInView ? 1 : 0,
                        y: demoInView ? 0 : 50,
                    }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-2xl shadow-xl border border-ink-800/10 overflow-hidden mb-16"
                >
                    {/* Mode selector tabs */}
                    <div className="flex border-b border-ink-800/10">
                        {(Object.keys(modes) as Mode[]).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setActiveMode(mode)}
                                className={`flex-1 px-6 py-4 font-mono text-body-sm transition-all duration-300 ${
                                    activeMode === mode
                                        ? "bg-ink-900 text-white"
                                        : "bg-transparent text-ink-700 hover:bg-ink-800/5"
                                }`}
                            >
                                {modes[mode].title}
                            </button>
                        ))}
                    </div>

                    {/* Mode content */}
                    <div className="p-6 md:p-8 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Mode description */}
                            <div>
                                <div
                                    className={`inline-block px-3 py-1 ${modes[activeMode].color} text-white text-xs font-mono rounded-full mb-4`}
                                >
                                    {modes[activeMode].title}
                                </div>
                                <p className="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6">
                                    {modes[activeMode].description}
                                </p>
                            </div>

                            {/* Sample output */}
                            <div className="bg-ivory-50 rounded-xl p-6 border border-ink-800/5">
                                <span className="editorial-label text-ink-700/50 block mb-3">
                                    {t.howItWorks.sampleOutput}
                                </span>
                                <p className="font-mono text-body-sm text-ink-800 leading-relaxed whitespace-pre-line">
                                    {modes[activeMode].sample}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {(Object.keys(modes) as Mode[]).map((mode, index) => (
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            viewport={{ once: true }}
                            className="relative bg-white p-6 rounded-xl border border-ink-800/10"
                        >
                            <div
                                className={`w-3 h-3 ${modes[mode].color} rounded-full mb-4`}
                            />
                            <h3 className="font-serif text-xl text-ink-900 mb-2">
                                {modes[mode].title}
                            </h3>
                            <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
                                {modes[mode].description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Coming Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="bg-ink-800/5 rounded-xl p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-700 text-xs font-mono rounded-full">
                            {t.howItWorks.comingSoon.label}
                        </span>
                    </div>

                    <ul className="space-y-3">
                        {comingSoon.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-start gap-3"
                            >
                                <svg
                                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="font-mono text-body-sm text-ink-700/80">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Background decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
