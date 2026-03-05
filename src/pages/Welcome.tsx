import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Pin } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { trackEvent } from "../utils/analytics";
import { setCookie, getCookie } from "../utils/cookies";
import { initPostHog } from "../utils/posthog";

export function Welcome() {
    const location = useLocation();

    const { ref: heroRef, isInView: heroInView } = useScrollReveal<HTMLElement>(
        { threshold: 0.1 },
    );

    const { ref: pinRef, isInView: pinInView } =
        useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

    // Read anonId, set cookie, init PostHog, fire events
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const anonId = params.get("anonId");

        async function setup() {
            // 1. Set first-party cookie
            if (anonId) {
                setCookie("rs_anon_id", anonId, {
                    path: "/",
                    maxAge: 31536000,
                    sameSite: "Lax",
                    secure: true,
                });
            }

            // 2. Initialize PostHog
            const posthog = await initPostHog();

            if (posthog) {
                // 3. Identify with anonId (from param or previously-set cookie)
                const id = anonId || getCookie("rs_anon_id");
                if (id) {
                    posthog.identify(id);
                }

                // 4. Fire welcome_page_viewed
                posthog.capture("welcome_page_viewed", {
                    anon_id: id || "unknown",
                });
            }

            // Also track in GA4
            trackEvent("welcome_page_viewed", {
                anon_id: anonId || "",
            });
        }

        setup();
    }, [location.search]);

    return (
        <section
            ref={heroRef}
            className="relative py-24 md:py-32 bg-ivory-100 overflow-hidden min-h-[80vh]"
        >
            <div className="editorial-container">
                {/* Welcome Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: heroInView ? 1 : 0,
                            scale: heroInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mx-auto mb-6 w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center"
                    >
                        <CheckCircle className="w-8 h-8 text-teal-600" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: heroInView ? 1 : 0,
                            y: heroInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-serif text-display-md md:text-display-lg text-ink-900 mb-6"
                    >
                        You're All Set
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: heroInView ? 1 : 0,
                            y: heroInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="font-mono text-body-lg text-ink-700/80 leading-relaxed"
                    >
                        Read Sidekick has been added to Chrome. One more step to
                        make it easy to access.
                    </motion.p>
                </div>

                {/* Pin Instructions Card */}
                <motion.div
                    ref={pinRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                        opacity: pinInView ? 1 : 0,
                        y: pinInView ? 0 : 50,
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="max-w-2xl mx-auto mb-16 md:mb-24"
                >
                    <div className="bg-white rounded-2xl shadow-xl border border-ink-800/10 overflow-hidden p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-coral-500/10 flex items-center justify-center">
                                <Pin className="w-5 h-5 text-coral-500" />
                            </div>
                            <h2 className="font-serif text-display-sm text-ink-900">
                                Pin to Toolbar
                            </h2>
                        </div>

                        {/* Step-by-step instructions */}
                        <ol className="space-y-4 mb-6">
                            <li className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-coral-500/10 text-coral-500 font-mono text-body-sm font-semibold flex-shrink-0 mt-0.5">
                                    1
                                </span>
                                <p className="font-mono text-body-md text-ink-700">
                                    Click the puzzle piece icon{" "}
                                    <img
                                        src="/chrome-puzzle-icon.png"
                                        alt="puzzle piece icon"
                                        className="inline w-8 h-8"
                                    />{" "}
                                    in your Chrome toolbar
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-coral-500/10 text-coral-500 font-mono text-body-sm font-semibold flex-shrink-0 mt-0.5">
                                    2
                                </span>
                                <p className="font-mono text-body-md text-ink-700">
                                    Find <strong>Read Sidekick</strong> in the
                                    list
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-coral-500/10 text-coral-500 font-mono text-body-sm font-semibold flex-shrink-0 mt-0.5">
                                    3
                                </span>
                                <p className="font-mono text-body-md text-ink-700">
                                    Click the <strong>pin icon</strong> to keep
                                    it visible
                                </p>
                            </li>
                        </ol>

                        {/* Screenshot / GIF placeholder */}
                        <div className="rounded-xl overflow-hidden border border-ink-800/10 bg-ivory-50">
                            <img
                                src="/pin-extension.png"
                                alt="How to pin Read Sidekick to your Chrome toolbar"
                                className="w-full h-auto"
                                onError={(e) => {
                                    (
                                        e.target as HTMLImageElement
                                    ).style.display = "none";
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
