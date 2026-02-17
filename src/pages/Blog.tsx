import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { blogPosts } from "../data/blogPosts";
import { trackEvent } from "../utils/analytics";

export function Blog() {
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
                            Blog
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
                                    onClick={() => trackEvent('blog_post_click', { slug: post.slug, title: post.title })}
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
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-800/10" />
        </section>
    );
}
