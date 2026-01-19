import { motion } from "framer-motion";
import { useMousePosition } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n";

export function Hero() {
    const mouse = useMousePosition();
    const { t } = useLanguage();

    const wordVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.2,
                delay: 0.8 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-ivory-100">
            {/* Literacy-themed decorative elements - "Pages & Light" concept */}

            {/* Floating Page Stack (top-right) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 1.5,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                    x: mouse.x * 20,
                    y: mouse.y * 20,
                }}
                className="absolute top-[12%] right-[6%] pointer-events-none animate-float"
            >
                {/* Bottom page */}
                <div className="absolute w-24 h-32 md:w-36 md:h-48 bg-coral-500/20 rounded-sm transform rotate-6 translate-x-2 translate-y-2" />
                {/* Middle page */}
                <div className="absolute w-24 h-32 md:w-36 md:h-48 bg-coral-500/40 rounded-sm transform rotate-3 translate-x-1 translate-y-1" />
                {/* Top page with text lines */}
                <div className="relative w-24 h-32 md:w-36 md:h-48 bg-coral-500/60 rounded-sm overflow-hidden">
                    <div className="absolute inset-3 md:inset-4 space-y-2">
                        <div className="h-1.5 md:h-2 bg-white/30 rounded-full w-full" />
                        <div className="h-1.5 md:h-2 bg-white/20 rounded-full w-4/5" />
                        <div className="h-1.5 md:h-2 bg-white/20 rounded-full w-5/6" />
                        <div className="h-1.5 md:h-2 bg-white/15 rounded-full w-3/4" />
                        <div className="h-1.5 md:h-2 bg-white/15 rounded-full w-full" />
                        <div className="h-1.5 md:h-2 bg-white/10 rounded-full w-2/3" />
                    </div>
                </div>
            </motion.div>

            {/* Knowledge Glow (left side) - warm marigold illumination */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                    x: mouse.x * -15,
                    y: mouse.y * -15,
                }}
                className="absolute top-[30%] left-[3%] w-32 h-32 md:w-48 md:h-48 pointer-events-none"
            >
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-radial from-teal-400/40 via-teal-400/10 to-transparent blur-xl" />
                {/* Inner core */}
                <div className="absolute inset-[25%] rounded-full bg-gradient-radial from-teal-300/60 via-teal-400/20 to-transparent blur-md" />
            </motion.div>

            {/* Curved Page-Turn Line (left) - SVG path */}
            <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-[8%] top-[5%] w-16 h-48 md:w-24 md:h-64 pointer-events-none"
                viewBox="0 0 60 200"
                fill="none"
            >
                <motion.path
                    d="M50 0 Q20 50, 30 100 Q40 150, 10 200"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="text-coral-500/30"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        duration: 2,
                        delay: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
            </motion.svg>

            {/* Reading Flow Dots (right) - sequential fade animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute right-[3%] top-[42%] flex items-center gap-2 pointer-events-none"
            >
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 - i * 0.15 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.4 + i * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-coral-500"
                    />
                ))}
                {/* Trailing gradient line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 1.9,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-coral-500/40 to-transparent origin-left"
                />
            </motion.div>

            {/* Main content */}
            <div className="editorial-container relative z-10 py-20 md:py-32">
                {/* Main title */}
                <div className="overflow-hidden mb-6 md:mb-8">
                    <h1 className="font-serif font-medium text-ink-950">
                        <span className="flex flex-wrap gap-x-6">
                            {["Read", "Sidekick"].map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-[14vw] md:text-[12vw] lg:text-[10vw] leading-[0.9] tracking-tighter"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                    </h1>
                </div>

                {/* Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1.2,
                        delay: 1.3,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="max-w-3xl mb-8 md:mb-12"
                >
                    <p className="font-mono text-body-lg md:text-xl text-ink-700 leading-relaxed">
                        {t.hero.tagline}
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 1.6,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                    <a
                        href="https://chrome.google.com/webstore"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-coral-500 text-white font-mono text-body-md tracking-wide hover:bg-coral-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.229-9.105zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
                        </svg>
                        <span>{t.hero.cta}</span>
                    </a>
                    <span className="text-ink-700/60 font-mono text-body-sm">
                        {t.hero.installs}
                    </span>
                </motion.div>

                {/* Hero visual placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1.2,
                        delay: 1.8,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-16 md:mt-24 relative"
                >
                    <div className="relative bg-white rounded-2xl shadow-2xl border border-ink-800/10 overflow-hidden">
                        {/* Browser chrome mockup */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-ink-800/5 border-b border-ink-800/10">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="flex-1 mx-4">
                                <div className="bg-ink-800/5 rounded px-3 py-1.5 text-ink-700/50 font-mono text-xs">
                                    news-article.com/article/understanding-economics
                                </div>
                            </div>
                        </div>

                        {/* Content area */}
                        <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-6">
                            {/* Article content */}
                            <div className="flex-1 space-y-4">
                                <div className="h-6 bg-ink-800/10 rounded w-3/4" />
                                <div className="h-4 bg-ink-800/5 rounded w-full" />
                                <div className="h-4 bg-ink-800/5 rounded w-5/6" />
                                <div className="h-4 bg-ink-800/5 rounded w-4/5" />
                                <div className="h-4 bg-ink-800/5 rounded w-full" />
                                <div className="h-4 bg-ink-800/5 rounded w-3/4" />
                            </div>

                            {/* Extension panel mockup */}
                            <div className="w-full lg:w-72 bg-ivory-50 rounded-xl border border-ink-800/10 p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <img
                                        src="/logo.png"
                                        alt="Read Sidekick"
                                        className="w-6 h-6 rounded"
                                    />
                                    <span className="font-mono text-sm text-ink-900 font-medium">
                                        {t.hero.extensionPanel}
                                    </span>
                                </div>

                                {/* Mode toggles */}
                                <div className="flex gap-2 mb-4">
                                    <button className="px-3 py-1.5 bg-teal-500 text-white text-xs font-mono rounded">
                                        {t.hero.easy}
                                    </button>
                                    <button className="px-3 py-1.5 bg-ink-800/10 text-ink-700 text-xs font-mono rounded">
                                        {t.hero.medium}
                                    </button>
                                    <button className="px-3 py-1.5 bg-ink-800/10 text-ink-700 text-xs font-mono rounded">
                                        {t.hero.hard}
                                    </button>
                                </div>

                                {/* Simplified text preview */}
                                <div className="space-y-2 p-3 bg-white rounded-lg border border-ink-800/5">
                                    <div className="h-3 bg-teal-500/20 rounded w-full" />
                                    <div className="h-3 bg-teal-500/20 rounded w-4/5" />
                                    <div className="h-3 bg-teal-500/20 rounded w-3/4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1,
                        delay: 2.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute bottom-8 right-6 md:right-12 lg:right-20 flex flex-col items-center gap-3"
                >
                    <span className="editorial-label text-ink-700/50 [writing-mode:vertical-lr]">
                        {t.hero.scrollToExplore}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-px h-12 bg-gradient-to-b from-ink-800/50 to-transparent"
                    />
                </motion.div>
            </div>

            {/* Bottom border */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                    duration: 1.5,
                    delay: 2,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/20 origin-left"
            />
        </section>
    );
}
