import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { blogPosts } from "../data/blogPosts";
import { trackEvent } from "../utils/analytics";

const CHROME_STORE_URL =
    "https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa";

const blogFaqItems = [
    {
        question: "What topics does the Read Sidekick blog cover?",
        answer: "Our blog covers reading comprehension strategies, AI-powered reading tools, text simplification techniques, educational technology, and tips for understanding complex articles, legal documents, and academic papers.",
    },
    {
        question: "How can Read Sidekick help me understand complex articles?",
        answer: "Read Sidekick is a free Chrome extension that simplifies dense text in one click. It rewrites confusing sentences, explains jargon, and breaks down complex paragraphs so you can understand any article, document, or webpage.",
    },
    {
        question: "Is Read Sidekick free to use?",
        answer: "Yes! Read Sidekick is completely free. You can install it from the Chrome Web Store and start simplifying text immediately — no account or payment required.",
    },
    {
        question: "How do I get started with Read Sidekick?",
        answer: "Simply visit the Chrome Web Store, click \"Add to Chrome,\" and the extension will be ready to use. Highlight any text on a webpage and click the Read Sidekick icon to get a simplified version instantly.",
    },
];

export function Blog() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.1,
        });

    const { ref: faqRef, isInView: faqInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.1,
        });

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Read Sidekick Blog",
        description:
            "Tips on reading comprehension, AI-powered reading tools, and guides to understanding complex text.",
        url: "https://www.readsidekick.com/blog",
        publisher: {
            "@type": "Organization",
            name: "Read Sidekick",
            url: "https://www.readsidekick.com",
            logo: "https://www.readsidekick.com/logo.png",
        },
        blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
                "@type": "Person",
                name: post.author,
            },
            url: `https://www.readsidekick.com/blog/${post.slug}`,
        })),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blogFaqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
        >
            <Helmet>
                <title>
                    Read Sidekick Blog | Reading Tips, AI Tools &amp;
                    Comprehension Guides
                </title>
                <meta
                    name="description"
                    content="Explore the Read Sidekick blog for reading comprehension tips, AI-powered reading tools, and guides to understanding complex text."
                />
            </Helmet>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <div className="editorial-container">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 md:mb-20">
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
                            Stories & Insights
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
                            Reading Tips & Insights from{" "}
                            <span className="italic">Read Sidekick</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                                opacity: sectionInView ? 1 : 0,
                                y: sectionInView ? 0 : 30,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.15,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="font-mono text-body-md text-ink-700/70 max-w-2xl mx-auto"
                        >
                            Thoughts on language, reading, and building tools
                            that make complex text clear.
                        </motion.p>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{
                                    opacity: sectionInView ? 1 : 0,
                                    y: sectionInView ? 0 : 40,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2 + index * 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <Link
                                    to={`/blog/${post.slug}`}
                                    onClick={() =>
                                        trackEvent("blog_post_click", {
                                            slug: post.slug,
                                            title: post.title,
                                        })
                                    }
                                    className="block bg-white rounded-xl p-8 md:p-10 border-l-4 border-coral-500 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                                >
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h2 className="font-serif text-display-sm md:text-2xl text-ink-900 mb-4 group-hover:text-coral-500 transition-colors duration-300">
                                        {post.title}
                                    </h2>

                                    {/* Subtitle */}
                                    <p className="font-mono text-body-md text-ink-700/60 italic mb-6">
                                        {post.subtitle}
                                    </p>

                                    {/* Excerpt */}
                                    <p className="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-4 text-ink-700/50">
                                        <span className="font-mono text-body-sm">
                                            {post.author}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-ink-700/30" />
                                        <span className="font-mono text-body-sm">
                                            {post.date}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-ink-700/30" />
                                        <span className="font-mono text-body-sm">
                                            {post.readingTime} min read
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* Empty State (for when no posts) */}
                    {blogPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: sectionInView ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center py-20"
                        >
                            <p className="font-mono text-body-md text-ink-700/60">
                                No blog posts yet. Check back soon!
                            </p>
                        </motion.div>
                    )}

                    {/* Branded CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 40,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-16 md:mt-20 text-center bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10"
                    >
                        <h2 className="font-serif text-display-sm md:text-display-md text-ink-900 mb-4">
                            Get Read Sidekick{" "}
                            <span className="italic">Free</span>
                        </h2>
                        <p className="font-mono text-body-md text-ink-700/70 max-w-xl mx-auto mb-8">
                            Turn dense articles, legal jargon, and confusing
                            content into clear, simple language — in one click.
                        </p>
                        <a
                            href={CHROME_STORE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                trackEvent("chrome_store_click", {
                                    location: "blog_cta",
                                })
                            }
                            className="inline-flex items-center gap-2 bg-coral-500 text-white font-mono text-body-md font-medium px-8 py-3 rounded-full hover:bg-coral-600 transition-colors duration-300"
                        >
                            Add to Chrome — It's Free
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </a>
                    </motion.div>

                    {/* FAQ Section */}
                    <div ref={faqRef} className="mt-16 md:mt-20">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{
                                opacity: faqInView ? 1 : 0,
                                y: faqInView ? 0 : 40,
                            }}
                            transition={{
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mb-10"
                        >
                            <span className="editorial-label block mb-4">
                                Common Questions
                            </span>
                            <h2 className="font-serif text-display-sm md:text-display-md text-ink-900">
                                Frequently Asked{" "}
                                <span className="italic">Questions</span>
                            </h2>
                        </motion.div>

                        <div className="max-w-3xl">
                            {blogFaqItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: faqInView ? 1 : 0,
                                        y: faqInView ? 0 : 30,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.1,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="border-b border-ink-800/10"
                                >
                                    <button
                                        onClick={() =>
                                            setOpenFaqIndex(
                                                openFaqIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="w-full flex items-center justify-between py-6 text-left group"
                                    >
                                        <span className="font-mono text-body-md md:text-body-lg text-ink-900 pr-8 group-hover:text-coral-500 transition-colors duration-200">
                                            {item.question}
                                        </span>
                                        <motion.span
                                            animate={{
                                                rotate:
                                                    openFaqIndex === index
                                                        ? 45
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-ink-700/50 group-hover:text-coral-500 transition-colors duration-200"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            >
                                                <line
                                                    x1="8"
                                                    y1="2"
                                                    x2="8"
                                                    y2="14"
                                                />
                                                <line
                                                    x1="2"
                                                    y1="8"
                                                    x2="14"
                                                    y2="8"
                                                />
                                            </svg>
                                        </motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaqIndex === index && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="font-mono text-body-sm md:text-body-md text-ink-700/70 leading-relaxed pb-6">
                                                    {item.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
