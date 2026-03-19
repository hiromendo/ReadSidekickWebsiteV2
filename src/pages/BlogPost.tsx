import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { getBlogPost, BlogSection } from "../data/blogPosts";
import { trackEvent } from "../utils/analytics";

const CHROME_STORE_URL =
    "https://chromewebstore.google.com/detail/read-sidekick/mdcekkbjfgpgobbgffmpjhpkpkgfmdpa";

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/<[^>]*>/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function renderSection(section: BlogSection, index: number) {
    switch (section.type) {
        case "heading": {
            const id = slugify(section.content || "");
            return section.html ? (
                <h2
                    key={index}
                    id={id}
                    className="font-serif text-display-sm text-ink-900 mt-12 mb-6 blog-html-content scroll-mt-24"
                    dangerouslySetInnerHTML={{ __html: section.content! }}
                />
            ) : (
                <h2
                    key={index}
                    id={id}
                    className="font-serif text-display-sm text-ink-900 mt-12 mb-6 scroll-mt-24"
                >
                    {section.content}
                </h2>
            );
        }
        case "subheading":
            return section.html ? (
                <h3
                    key={index}
                    className="font-serif text-xl text-ink-900 mt-8 mb-4 blog-html-content"
                    dangerouslySetInnerHTML={{ __html: section.content! }}
                />
            ) : (
                <h3
                    key={index}
                    className="font-serif text-xl text-ink-900 mt-8 mb-4"
                >
                    {section.content}
                </h3>
            );
        case "paragraph":
            return section.html ? (
                <p
                    key={index}
                    className="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6 blog-html-content"
                    dangerouslySetInnerHTML={{ __html: section.content! }}
                />
            ) : (
                <p
                    key={index}
                    className="font-mono text-body-md text-ink-700/80 leading-relaxed mb-6"
                >
                    {section.content}
                </p>
            );
        case "bold":
            return section.html ? (
                <p
                    key={index}
                    className="font-mono text-body-md text-ink-900 font-semibold leading-relaxed mb-6 blog-html-content"
                    dangerouslySetInnerHTML={{ __html: section.content! }}
                />
            ) : (
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
                    {section.html ? (
                        <p
                            className="font-serif text-lg text-ink-700 italic leading-relaxed blog-html-content"
                            dangerouslySetInnerHTML={{
                                __html: section.content!,
                            }}
                        />
                    ) : (
                        <p className="font-serif text-lg text-ink-700 italic leading-relaxed">
                            {section.content}
                        </p>
                    )}
                </blockquote>
            );
        case "list":
            return (
                <ul
                    key={index}
                    className="list-disc list-outside ml-6 mb-6 space-y-2"
                >
                    {section.items?.map((item, i) =>
                        section.html ? (
                            <li
                                key={i}
                                className="font-mono text-body-md text-ink-700/80 leading-relaxed blog-html-content"
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        ) : (
                            <li
                                key={i}
                                className="font-mono text-body-md text-ink-700/80 leading-relaxed"
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            );
        case "table":
            return (
                <div
                    key={index}
                    className="my-8 overflow-x-auto rounded-lg border border-ink-800/10"
                >
                    <table className="w-full min-w-[640px] border-collapse">
                        <thead>
                            <tr className="bg-ink-900 text-white">
                                {section.headers?.map((header, i) => (
                                    <th
                                        key={i}
                                        className="font-mono text-body-sm font-semibold px-4 py-3 text-left"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {section.rows?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={
                                        rowIndex % 2 === 0
                                            ? "bg-ivory-100"
                                            : "bg-ivory-50"
                                    }
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`font-mono text-body-sm px-4 py-3 text-ink-700/80 border-t border-ink-800/10 ${cellIndex === 0 ? "font-semibold text-ink-900" : ""}`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case "separator":
            return (
                <div
                    key={index}
                    className="flex items-center justify-center my-12"
                >
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
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const { ref: sectionRef, isInView: sectionInView } =
        useScrollReveal<HTMLElement>({
            threshold: 0.05,
        });

    const { ref: faqRef, isInView: faqInView } =
        useScrollReveal<HTMLDivElement>({
            threshold: 0.1,
        });

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const headings = post.content.filter((s) => s.type === "heading" && s.content);

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Read Sidekick",
            url: "https://www.readsidekick.com",
            logo: "https://www.readsidekick.com/logo.png",
        },
        url: `https://www.readsidekick.com/blog/${post.slug}`,
        keywords: post.tags.join(", "),
    };

    const faqSchema =
        post.faq && post.faq.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: post.faq.map((item) => ({
                      "@type": "Question",
                      name: item.question,
                      acceptedAnswer: {
                          "@type": "Answer",
                          text: item.answer,
                      },
                  })),
              }
            : null;

    return (
        <section
            ref={sectionRef}
            className="relative py-editorial bg-ivory-100 overflow-hidden min-h-screen"
        >
            <Helmet>
                <title>{post.title} | Read Sidekick Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogPostingSchema),
                }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}

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

                    {/* Table of Contents */}
                    {headings.length > 0 && (
                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: sectionInView ? 1 : 0,
                                y: sectionInView ? 0 : 20,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.22,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mb-12 p-6 md:p-8 bg-white rounded-xl border border-ink-800/10 shadow-sm"
                            aria-label="Table of contents"
                        >
                            <h2 className="font-serif text-lg text-ink-900 mb-4">
                                In This Article
                            </h2>
                            <ol className="space-y-2">
                                {headings.map((section, i) => {
                                    const plainText = (section.content || "").replace(/<[^>]*>/g, "");
                                    return (
                                        <li key={i}>
                                            <a
                                                href={`#${slugify(section.content || "")}`}
                                                className="font-mono text-body-sm text-ink-700/70 hover:text-coral-500 transition-colors duration-200 flex items-start gap-3"
                                            >
                                                <span className="text-coral-500/60 font-semibold flex-shrink-0">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                {plainText}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>
                        </motion.nav>
                    )}

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
                        className="mt-16 text-center bg-white rounded-xl p-10 md:p-14 shadow-sm border border-ink-800/10"
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
                                    location: "blog_post_cta",
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
                    {post.faq && post.faq.length > 0 && (
                        <div ref={faqRef} className="mt-16">
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
                                {post.faq.map((item, index) => (
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
                                                        ease: [
                                                            0.16, 1, 0.3, 1,
                                                        ],
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
                    )}

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
