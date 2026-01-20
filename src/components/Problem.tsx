import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n";

export function Problem() {
    const { t } = useLanguage();

    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.1,
        });

    const { ref: headerRef, isInView: headerInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.3,
        });

    const { ref: comparisonRef, isInView: comparisonInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.3,
        });

    const { ref: learnModeRef, isInView: learnModeInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.2,
        });

    return (
        <section
            id="problem"
            ref={sectionRef}
            className="relative py-editorial bg-ivory-50 overflow-hidden"
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
                <span className="section-number">01</span>
            </motion.div>

            <div className="editorial-container">
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
                        {t.problem.sectionLabel}
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
                        {t.problem.title}
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
                        {t.problem.subtitle}
                    </motion.p>
                </div>

                {/* Before/After comparison */}
                <div ref={comparisonRef} className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                        {/* Before card */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{
                                opacity: comparisonInView ? 1 : 0,
                                x: comparisonInView ? 0 : -40,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-coral-500 shadow-sm"
                        >
                            <span className="inline-block font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full mb-4">
                                {t.problem.beforeAfter.beforeLabel}
                            </span>
                            <p className="font-mono text-body-sm text-ink-700/70 leading-relaxed">
                                {t.problem.beforeAfter.beforeText}
                            </p>
                        </motion.div>

                        {/* Arrow - visible on desktop between cards */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: comparisonInView ? 1 : 0,
                                scale: comparisonInView ? 1 : 0.8,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        >
                            <div className="bg-teal-500 rounded-full p-3 shadow-lg">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Arrow - visible on mobile between cards */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: comparisonInView ? 1 : 0,
                                scale: comparisonInView ? 1 : 0.8,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex lg:hidden justify-center -my-2"
                        >
                            <div className="bg-teal-500 rounded-full p-2">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 5v14m0 0l-6-6m6 6l6-6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </motion.div>

                        {/* After card */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{
                                opacity: comparisonInView ? 1 : 0,
                                x: comparisonInView ? 0 : 40,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white rounded-xl p-6 md:p-8 border-l-4 border-teal-500 shadow-sm"
                        >
                            <span className="inline-block font-mono text-caption uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4">
                                {t.problem.beforeAfter.afterLabel}
                            </span>
                            <p className="font-mono text-body-md text-ink-900 leading-relaxed font-medium">
                                {t.problem.beforeAfter.afterText}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Learn Mode Section */}
                <div ref={learnModeRef} className="mt-16 md:mt-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: learnModeInView ? 1 : 0,
                            y: learnModeInView ? 0 : 20,
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8"
                    >
                        <span className="editorial-label block mb-2">
                            {t.problem.learnMode.label}
                        </span>
                        <h3 className="font-serif text-display-sm md:text-display-md text-ink-900">
                            {t.problem.learnMode.subtitle}
                        </h3>
                    </motion.div>

                    {/* The Sentence */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: learnModeInView ? 1 : 0,
                            y: learnModeInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="bg-ink-900 text-white rounded-xl p-6 md:p-8 mb-8"
                    >
                        <p className="font-serif italic text-body-lg md:text-display-xs leading-relaxed">
                            "{t.problem.learnMode.sentence}"
                        </p>
                    </motion.div>

                    {/* Three breakdown cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Card 1: Actor & Action */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{
                                opacity: learnModeInView ? 1 : 0,
                                y: learnModeInView ? 0 : 40,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white rounded-xl p-6 border-t-4 border-coral-500 shadow-sm"
                        >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-coral-100 text-coral-600 font-mono text-body-sm font-semibold mb-4">
                                1
                            </span>
                            <h4 className="font-serif text-body-lg font-semibold text-ink-900 mb-4">
                                {t.problem.learnMode.actorAction.title}
                            </h4>
                            <blockquote className="font-mono text-body-sm text-ink-700 bg-ivory-100 px-3 py-2 rounded-lg mb-4 italic">
                                {t.problem.learnMode.actorAction.quote}
                            </blockquote>
                            <dl className="space-y-2 text-body-sm mb-4">
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-14">
                                        Who:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {t.problem.learnMode.actorAction.who}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-14">
                                        What:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {t.problem.learnMode.actorAction.what}
                                    </dd>
                                </div>
                            </dl>
                            <p className="font-mono text-caption text-ink-600 bg-coral-50 px-3 py-2 rounded-lg">
                                <span className="font-semibold">
                                    Grammar Note:
                                </span>{" "}
                                {t.problem.learnMode.actorAction.grammarNote}
                            </p>
                        </motion.div>

                        {/* Card 2: Hidden Meaning */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{
                                opacity: learnModeInView ? 1 : 0,
                                y: learnModeInView ? 0 : 40,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white rounded-xl p-6 border-t-4 border-amber-500 shadow-sm"
                        >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-mono text-body-sm font-semibold mb-4">
                                2
                            </span>
                            <h4 className="font-serif text-body-lg font-semibold text-ink-900 mb-4">
                                {t.problem.learnMode.hiddenMeaning.title}
                            </h4>
                            <blockquote className="font-mono text-body-sm text-ink-700 bg-ivory-100 px-3 py-2 rounded-lg mb-4 italic">
                                {t.problem.learnMode.hiddenMeaning.quote}
                            </blockquote>
                            <dl className="space-y-2 text-body-sm mb-4">
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-16">
                                        Literal:
                                    </dt>
                                    <dd className="font-mono text-ink-700 px-4">
                                        {
                                            t.problem.learnMode.hiddenMeaning
                                                .literalMeaning
                                        }
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-16">
                                        Actual:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {
                                            t.problem.learnMode.hiddenMeaning
                                                .actualMeaning
                                        }
                                    </dd>
                                </div>
                            </dl>
                            <p className="font-mono text-caption text-ink-600 bg-amber-50 px-3 py-2 rounded-lg">
                                <span className="font-semibold">Origin:</span>{" "}
                                {t.problem.learnMode.hiddenMeaning.explanation}
                            </p>
                        </motion.div>

                        {/* Card 3: Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{
                                opacity: learnModeInView ? 1 : 0,
                                y: learnModeInView ? 0 : 40,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="bg-white rounded-xl p-6 border-t-4 border-teal-500 shadow-sm"
                        >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-600 font-mono text-body-sm font-semibold mb-4">
                                3
                            </span>
                            <h4 className="font-serif text-body-lg font-semibold text-ink-900 mb-4">
                                {t.problem.learnMode.timeline.title}
                            </h4>
                            <blockquote className="font-mono text-body-sm text-ink-700 bg-ivory-100 px-3 py-2 rounded-lg mb-4 italic">
                                {t.problem.learnMode.timeline.quote}
                            </blockquote>
                            <dl className="space-y-2 text-body-sm mb-4">
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-20">
                                        Link word:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {t.problem.learnMode.timeline.linkWord}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-20">
                                        Event A:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {t.problem.learnMode.timeline.eventA}
                                    </dd>
                                </div>
                                <div className="flex">
                                    <dt className="font-mono font-semibold text-ink-900 w-20">
                                        Event B:
                                    </dt>
                                    <dd className="font-mono text-ink-700">
                                        {t.problem.learnMode.timeline.eventB}
                                    </dd>
                                </div>
                            </dl>
                            <p className="font-mono text-caption text-ink-600 bg-teal-50 px-3 py-2 rounded-lg">
                                <span className="font-semibold">Logic:</span>{" "}
                                {t.problem.learnMode.timeline.logic}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
