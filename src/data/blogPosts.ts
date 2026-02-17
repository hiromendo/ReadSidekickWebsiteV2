export interface BlogSection {
    type:
        | "paragraph"
        | "heading"
        | "subheading"
        | "quote"
        | "list"
        | "separator"
        | "bold";
    content?: string;
    items?: string[];
}

export interface BlogPost {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    author: string;
    readingTime: number;
    excerpt: string;
    content: BlogSection[];
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "from-animorphs-to-ai",
        title: "From Animorphs to AI: How I Learned to Read English (And Why It Inspired Read Sidekick)",
        subtitle:
            "The unexpected journey from a 10-year-old Mexican kid with a dictionary to building an app that's transformed over 1.2 million words",
        date: "January 20, 2026",
        author: "Hiroshi",
        readingTime: 12,
        excerpt:
            "When I moved from Mexico City to the United States at age 10, I spoke exactly zero English. Then I discovered the Animorphs series, and everything changed.",
        tags: ["Language", "Personal Story", "Research", "Reading Tools"],
        content: [
            { type: "heading", content: "A Kid, A Dictionary, and Some Shape-Shifting Teenagers" },
            {
                type: "paragraph",
                content:
                    "When I moved from Mexico City to the United States at age 10, I spoke exactly zero English. Not \"a little.\" Not \"enough to get by.\" Zero.",
            },
            {
                type: "paragraph",
                content:
                    "School was a blur of sounds that might as well have been static. Homework was a puzzle with no picture on the box. And making friends? Well, that required words I didn't have.",
            },
            {
                type: "paragraph",
                content: "Then I discovered the Animorphs series.",
            },
            {
                type: "paragraph",
                content:
                    "If you're not familiar, it's about teenagers who can morph into animals to fight an alien invasion. Wild premise? Absolutely. But something about those covers—kids transforming into wolves and hawks and tigers—grabbed me in a way nothing else had.",
            },
            {
                type: "paragraph",
                content: "I wanted to know what happened next. Badly.",
            },
            {
                type: "paragraph",
                content:
                    "So I did what any determined kid would do: I grabbed a Spanish-English dictionary and started reading. Word by word. Page by page. It was slow. It was frustrating. Some nights I'd spend twenty minutes on a single paragraph.",
            },
            {
                type: "paragraph",
                content:
                    "But here's the thing—I was curious. The story pulled me forward. Each new word I learned wasn't just vocabulary; it was a key that unlocked more of a world I desperately wanted to explore.",
            },
            {
                type: "bold",
                content:
                    "Looking back, I realize something important: People learn through their curiosity. Not through worksheets. Not through drills. Through genuine interest in understanding something that matters to them.",
            },
            { type: "separator" },
            { type: "heading", content: "The ChatGPT Moment That Changed Everything" },
            {
                type: "paragraph",
                content:
                    "Fast forward a few decades. I'm watching my older brother tackle his college readings, and I notice something interesting: he's copying entire passages into ChatGPT and asking for summaries.",
            },
            {
                type: "paragraph",
                content: 'At first, I thought, "Smart kid. Working efficiently."',
            },
            { type: "paragraph", content: "But then I realized the problem." },
            {
                type: "paragraph",
                content:
                    "Those AI summaries were giving him the gist of things—a surface-level understanding he could regurgitate for a test. But they weren't helping him read better. They weren't building his capacity to wrestle with complex ideas on his own. They were a crutch, not a teacher.",
            },
            {
                type: "paragraph",
                content:
                    "It reminded me of something I'd read in research by Dr. Lily Wong Fillmore and Dr. Charles J. Fillmore from UC Berkeley. They argued that one of the biggest challenges readers face is that we keep giving them simplified texts as a safeguard against failure—but those simplified texts actually prevent them from learning how sophisticated language works.",
            },
            {
                type: "paragraph",
                content:
                    "The solution isn't to avoid complexity. It's to provide the right support while engaging with it.",
            },
            {
                type: "paragraph",
                content: "That's when the idea for Read Sidekick crystallized.",
            },
            { type: "separator" },
            {
                type: "heading",
                content: "Why 130 Million Adults Deserve Better Tools",
            },
            {
                type: "bold",
                content:
                    "Here's a statistic that still stops me cold: roughly 130 million adults in the U.S. could benefit from better tools for reading complex text.",
            },
            {
                type: "paragraph",
                content:
                    "That's not a niche audience—it includes professionals navigating complex documents, parents helping their kids with homework, and workers who need to process technical materials to advance.",
            },
            {
                type: "paragraph",
                content:
                    "And yet, most reading tools aren't designed with adults in mind. They feel remedial. Patronizing. Focused on deficiencies rather than building capacity.",
            },
            {
                type: "paragraph",
                content: "The Fillmores' research pointed to a better way.",
            },
            { type: "separator" },
            { type: "heading", content: "What the Research Actually Says" },
            {
                type: "paragraph",
                content:
                    "Dr. Lily Fillmore and Dr. Charles Fillmore spent years studying what makes academic texts so challenging—and more importantly, what actually works to help people navigate them.",
            },
            {
                type: "bold",
                content:
                    "Their key insight? The language used in complex texts is fundamentally different from everyday spoken language.",
            },
            {
                type: "paragraph",
                content:
                    "It's not just about vocabulary (though that matters). It's about how ideas are packed together, how sentences are structured, and how information is layered in ways that spoken language rarely does.",
            },
            {
                type: "paragraph",
                content:
                    "Consider this sentence from Martin Luther King Jr.'s Letter from Birmingham Jail:",
            },
            {
                type: "quote",
                content:
                    '"Begun on the margins of the newspaper in which the statement appeared while I was in jail, the letter was continued on scraps of writing paper supplied by a friendly Negro trusty, and concluded on a pad my attorneys were eventually permitted to leave me."',
            },
            {
                type: "paragraph",
                content: "On the surface, it's about what paper MLK wrote on. But look closer:",
            },
            {
                type: "list",
                items: [
                    '"Begun on the margins" → He was so restricted he had to write in the blank spaces of a newspaper',
                    '"A friendly Negro trusty" → A fellow prisoner had to sneak him scraps of paper',
                    '"Eventually permitted" → Even his lawyers needed permission to give him a writing pad',
                ],
            },
            {
                type: "paragraph",
                content:
                    "One sentence. Layered meanings. A whole world of injustice compressed into 50 words.",
            },
            {
                type: "paragraph",
                content:
                    'This is what the Fillmores call "informational density"—and it\'s everywhere in academic writing. If you don\'t learn to unpack it, complex texts remain locked doors.',
            },
            { type: "separator" },
            { type: "heading", content: 'The "Juicy Sentence" Strategy' },
            { type: "paragraph", content: "Here's where it gets practical." },
            {
                type: "paragraph",
                content:
                    'The Fillmores developed an approach they called the "Juicy Sentence" strategy. Instead of trying to teach grammar as a separate subject (boring and often useless), they had teachers select a single complex sentence from whatever text the class was reading. Then they\'d spend 15-20 minutes just... discussing it.',
            },
            {
                type: "list",
                items: [
                    "What does this phrase mean?",
                    "What information is packed into this part?",
                    "How does this structure work?",
                ],
            },
            {
                type: "paragraph",
                content:
                    "It sounds almost too simple. Fifteen minutes on one sentence?",
            },
            {
                type: "paragraph",
                content:
                    "But the results were remarkable. Students who participated started passing proficiency tests at higher rates. In some cases, English learners actually outperformed native speakers on standardized tests.",
            },
            {
                type: "paragraph",
                content:
                    "Why? Because once you understand how language works in complex texts—how information gets compressed, how ideas get connected, how writers signal relationships between concepts—you can apply that knowledge to anything you read.",
            },
            {
                type: "quote",
                content:
                    '"After participating in these instructional events for a time, the students behave as if they have been let in on a big secret—how to make sense of things that did not make much sense before."',
            },
            { type: "separator" },
            { type: "heading", content: "How Read Sidekick Brings This to Life" },
            {
                type: "paragraph",
                content:
                    "Read Sidekick takes the principles behind the Juicy Sentence strategy and makes them accessible to anyone, anywhere, reading anything.",
            },
            {
                type: "paragraph",
                content: "Our approach works on three levels:",
            },
            { type: "subheading", content: "1. Adaptive Reading Modes" },
            {
                type: "paragraph",
                content:
                    'Not everyone wants the same level of detail. Our Simple, Moderate, and Detailed modes let readers engage with content on their own terms. Unlike simple "summarization," we preserve meaning while transforming complexity.',
            },
            { type: "subheading", content: "2. Sentence-Level Exploration" },
            {
                type: "paragraph",
                content:
                    "Inspired directly by the Fillmores' research, our Explore mode breaks down individual sentences to help you understand how meaning is constructed. We don't just tell you what something means—we show you how the language works so you can figure it out yourself next time.",
            },
            { type: "subheading", content: "3. Any Content You Care About" },
            {
                type: "paragraph",
                content:
                    "Remember how I learned English through Animorphs? Curiosity is the engine. Read Sidekick works on whatever text you want to read—news articles, work documents, course materials, that novel you've been meaning to tackle. Understanding happens faster when you care about the content.",
            },
            { type: "separator" },
            {
                type: "heading",
                content: "The Difference Between Shortcuts and Real Understanding",
            },
            {
                type: "paragraph",
                content:
                    "My brother's ChatGPT summaries gave him information. But they didn't build his capacity to process information independently.",
            },
            {
                type: "paragraph",
                content:
                    'That\'s the trap of most "simplification" tools. They make things easier in the moment while making readers weaker in the long run.',
            },
            {
                type: "quote",
                content:
                    '"The easy texts schools give to struggling readers—given prophylactically as a safeguard against failure—actually prevent them from discovering how language works in academic discourse."',
            },
            {
                type: "paragraph",
                content:
                    "Read Sidekick takes the opposite approach. We meet you where you are, then help you grow. Every interaction with complex text, properly supported, becomes an opportunity to build the cognitive tools you'll need for the next challenge.",
            },
            { type: "separator" },
            { type: "heading", content: "It's Working" },
            {
                type: "bold",
                content:
                    "Since launching, Read Sidekick has been used over 18,000 times, processing more than 1.2 million words for people who just need the right kind of support to unlock complex content.",
            },
            {
                type: "paragraph",
                content:
                    "They're adults with jobs and families and ambitions who want a better way to engage with complex text than what traditional tools have offered.",
            },
            {
                type: "paragraph",
                content:
                    "They're the kid I was, twenty-something years ago, working through Animorphs with a dictionary in one hand.",
            },
            {
                type: "paragraph",
                content: "The difference is, now they don't have to do it alone.",
            },
            { type: "separator" },
            { type: "heading", content: "The Path Forward" },
            {
                type: "paragraph",
                content:
                    "We're not done. Read Sidekick is expanding to include ASL translation capabilities—because accessible reading means accessible to everyone, including the Deaf and hard-of-hearing community.",
            },
            {
                type: "paragraph",
                content:
                    "But the core philosophy stays the same: meet people where they are, respect their intelligence, make them stronger rather than dependent.",
            },
            {
                type: "paragraph",
                content:
                    "That's what Dr. Fillmore's research taught us. That's what my own experience confirmed. And that's what we're building.",
            },
            {
                type: "bold",
                content:
                    "Because everyone deserves to be let in on the secret of how language works.",
            },
            { type: "separator" },
            { type: "subheading", content: "References" },
            {
                type: "paragraph",
                content:
                    "Fillmore, L. W., & Fillmore, C. J. (2012). What Does Text Complexity Mean for English Learners and Language Minority Students? Stanford University, Understanding Language Initiative.",
            },
        ],
    },
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
