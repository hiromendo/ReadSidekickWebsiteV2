import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const policyItems = [
    {
        title: "1. Introduction",
        content:
            'This page describes the Privacy Policy that applies to all information collected or submitted when you install or use Read Sidekick. Read Sidekick is owned and operated by Wabi (referred to herein as "we", "us", or "our"). We take the protection of your personal data very seriously and will always offer you Read Sidekick and its functionality with your privacy in mind.',
    },
    {
        title: "2. Handling user data with Read Sidekick",
        content:
            "To provide the reading functions, Read Sidekick retrieves the input/selected text and page URLs and sends the request to Google's Gemini API. Please refer to the privacy policy of Gemini. We do not access/collect any of this data.",
    },
    {
        title: "3. External service",
        content:
            "Read Sidekick includes links to external sites. When accessing external sites, the privacy policy of each site is applied.",
    },
    {
        title: "4. Contact us",
        content:
            "If you have questions about this Privacy Policy, please contact us at the address below: Email: hello@readsidekick.com",
    },
    {
        title: "5. Changes to Privacy Policy",
        content:
            'We may update this Privacy Policy and when we do, we will also revise the "Effective Date" at the top of the Privacy Policy.',
    },
];

export function PrivacyPolicy() {
    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.1,
        });

    return (
        <section
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
        >
            <div className="editorial-container">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sectionInView ? 1 : 0,
                                y: sectionInView ? 0 : 20,
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="editorial-label block mb-6"
                        >
                            Effective Date: January 20, 2026
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
                            Privacy Policy
                        </motion.h1>
                    </div>

                    {/* Policy Sections */}
                    <div className="space-y-10 md:space-y-12">
                        {policyItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: sectionInView ? 1 : 0,
                                    y: sectionInView ? 0 : 30,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="space-y-4"
                            >
                                <h2 className="font-serif text-display-sm text-ink-900">
                                    {item.title}
                                </h2>
                                <p className="font-mono text-body-md text-ink-700/80 leading-relaxed">
                                    {item.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
