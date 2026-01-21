import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { getBlogPost, BlogSection } from "../data/blogPosts";

function renderSection(section: BlogSection, index: number) {
    switch (section.type) {
        case "heading":
            return (
                <h2
                    key={index}
                    className="font-serif text-display-sm text-ink-900 mt-12 mb-6"
                >
                    {section.content}
                </h2>
            );
        case "subheading":
            return (
                <h3
                    key={index}
                    className="font-serif text-xl text-ink-900 mt-8 mb-4"
                >
                    {section.content}
                </h3>
            );
        case "paragraph":
            return (
                <p
                    key={index}
                    className="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6"
                >
                    {section.content}
                </p>
            );
        case "bold":
            return (
                <p
                    key={index}
                    className="font-mono text-body-md text-ink-900 font-semibold leading-relaxed mb-6"
                >
                    {section.content}
                </p>
            );
        case "quote":
            return (
                <blockquote
                    key={index}
                    className="border-l-4 border-coral-500 pl-6 py-2 my-8 bg-coral-50/50 rounded-r-lg"
                >
                    <p className="font-serif text-lg text-ink-700 italic leading-relaxed">
                        {section.content}
                    </p>
                </blockquote>
            );
        case "list":
            return (
                <ul
                    key={index}
                    className="list-disc list-outside ml-6 mb-6 space-y-2"
                >
                    {section.items?.map((item, i) => (
                        <li
                            key={i}
                            className="font-mono text-body-md text-ink-700/80 leading-relaxed"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "separator":
            return (
                <div key={index} className="flex items-center justify-center my-12">
                    <div className="w-16 h-px bg-ink-800/20" />
                    <div className="w-2 h-2 rounded-full bg-coral-500 mx-4" />
                    <div className="w-16 h-px bg-ink-800/20" />
                </div>
            );
        default:
            return null;
    }
}

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getBlogPost(slug) : undefined;

    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.05,
        });

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <section
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
        >
            <div className="editorial-container">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 20,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mb-12"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 font-mono text-body-sm text-ink-700/60 hover:text-coral-500 transition-colors duration-300"
                        >
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to Blog
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <header className="mb-12 md:mb-16">
                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sectionInView ? 1 : 0,
                                y: sectionInView ? 0 : 20,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.05,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-caption uppercase tracking-wider text-coral-500 bg-coral-50 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        {/* Title */}
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
                            className="font-serif text-display-sm md:text-display-md text-ink-900 mb-6"
                        >
                            {post.title}
                        </motion.h1>

                        {/* Subtitle */}
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
                            className="font-mono text-body-lg text-ink-700/60 italic mb-8"
                        >
                            {post.subtitle}
                        </motion.p>

                        {/* Meta */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sectionInView ? 1 : 0,
                                y: sectionInView ? 0 : 20,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex flex-wrap items-center gap-4 text-ink-700/50 pb-8 border-b border-ink-800/10"
                        >
                            <span className="font-mono text-body-sm">
                                By {post.author}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-ink-700/30" />
                            <span className="font-mono text-body-sm">
                                {post.date}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-ink-700/30" />
                            <span className="font-mono text-body-sm">
                                {post.readingTime} min read
                            </span>
                        </motion.div>
                    </header>

                    {/* Content */}
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.25,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="prose-editorial"
                    >
                        {post.content.map((section, index) =>
                            renderSection(section, index)
                        )}
                    </motion.article>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: sectionInView ? 1 : 0,
                            y: sectionInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-16 pt-8 border-t border-ink-800/10"
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 font-mono text-body-md text-coral-500 hover:text-coral-600 transition-colors duration-300"
                        >
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back to all posts
                        </Link>
                    </motion.footer>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
