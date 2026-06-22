// Central content store for the PragnyX site.
// Keeping copy + structured data here means pages stay declarative
// and the same source of truth can back API validation.

export const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  // { href: "/learning", label: "Learning" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const PRODUCTS = [
  {
    slug: "atlas",
    name: "Atlas",
    tag: "Reasoning Infrastructure",
    summary:
      "A reasoning layer that sits between your data and your decisions — built for teams who need explainable, auditable logic at scale.",
    bullets: [
      "Composable reasoning graphs, not black-box outputs",
      "Native audit trail for every inference",
      "Deploys on your cloud or ours",
    ],
    color: "blue",
  },
  {
    slug: "lumen",
    name: "Lumen",
    tag: "Knowledge Engine",
    summary:
      "Turns scattered institutional knowledge — docs, tickets, calls, code — into a single searchable, continuously-updating brain for your org.",
    bullets: [
      "Connects to 40+ sources out of the box",
      "Cites everything it tells you",
      "Live sync, not a quarterly re-index",
    ],
    color: "violet",
  },
  {
    slug: "forge",
    name: "Forge",
    tag: "Builder Platform",
    summary:
      "The fastest path from a rough idea to a working internal tool. Describe the workflow, Forge assembles the app, your team owns the code.",
    bullets: [
      "Generates real, exportable source — no lock-in",
      "Plugs into your existing auth and data",
      "From prompt to staging in under an hour",
    ],
    color: "blue",
  },
  {
    slug: "signal",
    name: "Signal",
    tag: "Decision Monitoring",
    summary:
      "Watches the metrics that matter and tells you why they moved — before the weekly meeting, not during the postmortem.",
    bullets: [
      "Anomaly detection tuned to your baseline",
      "Plain-language root-cause summaries",
      "Slack, email, and on-call ready",
    ],
    color: "violet",
  },
];

export const STATS = [
  { value: 4, suffix: "", label: "Products in market" },
  { value: 120, suffix: "+", label: "Teams onboarded" },
  { value: 98, suffix: "%", label: "Mentor satisfaction" },
  { value: 24, suffix: "/7", label: "Always engineering" },
];

export const PILLARS = [
  {
    key: "innovation",
    title: "Innovation",
    copy: "We treat the default as a draft, not a destination. Every boundary is an invitation to ask what could replace it.",
  },
  {
    key: "creativity",
    title: "Creativity",
    copy: "The ideas worth building start where strict logic loosens its grip. That's the frontier where PragnyX begins its work.",
  },
  {
    key: "intelligence",
    title: "Intelligent Thinking",
    copy: "Wisdom for the next frontier means reasoning that's deliberate and considered — built to outlast the moment it solves.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    role: "Head of Data, Northwind Retail",
    quote:
      "Atlas gave our risk team something they'd never had before: a reasoning trail they could actually defend in front of regulators.",
  },
  {
    name: "Marcus Webb",
    role: "VP Engineering, Caldera Health",
    quote:
      "We replaced four internal tools with one Forge workflow in a week. Our own engineers own the code now, which is the part that sold us.",
  },
  {
    name: "Priya Nair",
    role: "1:1 Learning student, Systems Design track",
    quote:
      "My mentor restructured how I think about distributed systems, not just what to memorize for an interview. Worth every session.",
  },
  {
    name: "Daniel Osei",
    role: "COO, Ferrow Logistics",
    quote:
      "Signal caught a fulfillment anomaly nine days before it would've shown up in our quarterly numbers. It paid for itself in that one alert.",
  },
];

export const FAQS = [
  {
    q: "Is PragnyX a product company, a consultancy, or a school?",
    a: "All three, by design. We build software products (Atlas, Lumen, Forge, Signal), we work hands-on with teams who need custom builds, and we run PragnyX Learning, our 1:1 mentorship program. The thread connecting them is the same: deliberate, explainable thinking applied to hard problems.",
  },
  {
    q: "Can I try a product before committing?",
    a: "Yes. Every product page links to a scoped pilot — typically 2-4 weeks, run against a real workflow on your side, with a clear go/no-go at the end.",
  },
  {
    q: "How does PragnyX Learning matching work?",
    a: "You tell us what you're trying to get better at and how you learn. We match you with a mentor whose track matches that goal, you do a free intro call, and you decide from there. No long-term lock-in — sessions are booked as you go.",
  },
  {
    q: "Do you work with early-stage startups or only larger teams?",
    a: "Both. Our products scale down to a single founder testing an idea and up to multi-team enterprise rollouts. Tell us where you are in the contact form and we'll point you to the right starting size.",
  },
  {
    q: "Where are you based, and do you work remotely?",
    a: "PragnyX is remote-first with a distributed team. We work across time zones for both client engagements and learning sessions.",
  },
];

export const MENTORS = [
  {
    id: "mentor-arjun",
    name: "Arjun Mehta",
    title: "Systems Design & Backend Architecture",
    bio: "Ex-infrastructure lead who has scaled backend systems past a billion requests a day. Teaches by making you design the system on a whiteboard before you write a line of code.",
    tracks: ["Systems Design", "Backend Engineering", "Interview Prep"],
    rating: 4.9,
    sessions: 412,
    color: "blue",
  },
  {
    id: "mentor-sara",
    name: "Sara Lindqvist",
    title: "Machine Learning & Applied AI",
    bio: "Builds production ML pipelines for a living and teaches the gap between Kaggle notebooks and shipped models — the part most courses skip.",
    tracks: ["Machine Learning", "MLOps", "Applied AI"],
    rating: 5.0,
    sessions: 289,
    color: "violet",
  },
  {
    id: "mentor-devansh",
    name: "Devansh Kapoor",
    title: "Product Strategy & 0-to-1",
    bio: "Took two products from idea to acquisition. Works with founders and PMs on sharpening a vague idea into something a team can actually build.",
    tracks: ["Product Strategy", "Founder Coaching", "Roadmapping"],
    rating: 4.8,
    sessions: 201,
    color: "blue",
  },
  {
    id: "mentor-lena",
    name: "Lena Osei",
    title: "Frontend Engineering & Design Systems",
    bio: "Built and maintained design systems used by teams of 80+ engineers. Teaches frontend the way it actually gets used at scale, not toy examples.",
    tracks: ["Frontend Engineering", "Design Systems", "React"],
    rating: 4.9,
    sessions: 356,
    color: "violet",
  },
  {
    id: "mentor-victor",
    name: "Victor Chen",
    title: "Data Engineering & Analytics",
    bio: "Spent a decade making messy data pipelines reliable. Mentors on architecture decisions that hold up two years later, not just this sprint.",
    tracks: ["Data Engineering", "SQL & Warehousing", "Analytics"],
    rating: 4.7,
    sessions: 178,
    color: "blue",
  },
  {
    id: "mentor-imani",
    name: "Imani Walker",
    title: "Career Growth & Technical Leadership",
    bio: "Former engineering manager who now focuses entirely on helping ICs become the senior engineers and leads their teams actually need.",
    tracks: ["Career Growth", "Tech Leadership", "Mentorship for Mentors"],
    rating: 5.0,
    sessions: 244,
    color: "violet",
  },
];

export const LEARNING_TRACKS = [
  "Systems Design",
  "Machine Learning",
  "Frontend Engineering",
  "Product Strategy",
  "Data Engineering",
  "Career Growth",
  "Interview Prep",
  "Something else",
];

export const LEARNING_PLANS = [
  {
    name: "Single Session",
    price: "$45",
    period: "/ session",
    description: "Try a session with no commitment. Good for a specific question or a second opinion on a decision.",
    features: ["1 hour, 1:1", "Pick any mentor", "Session notes included", "Pay as you go"],
    featured: false,
  },
  {
    name: "Growth Track",
    price: "$160",
    period: "/ month",
    description: "For steady progress on a specific skill. The default choice for most learners.",
    features: [
      "4 sessions / month",
      "Dedicated mentor match",
      "Async Q&A between sessions",
      "Progress check-ins",
    ],
    featured: true,
  },
  {
    name: "Intensive",
    price: "$420",
    period: "/ month",
    description: "For a focused sprint — interview prep, a launch deadline, or a fast skill ramp.",
    features: [
      "12 sessions / month",
      "Priority scheduling",
      "Mock interviews / reviews",
      "Direct mentor messaging",
    ],
    featured: false,
  },
];

export const JOBS = [
  {
    id: "job-1",
    title: "Senior Backend Engineer — Atlas",
    location: "Remote",
    type: "Full-time",
    summary: "Own core reasoning-graph infrastructure that decisions at client companies run on top of.",
  },
  {
    id: "job-2",
    title: "Applied AI Engineer — Lumen",
    location: "Remote",
    type: "Full-time",
    summary: "Build retrieval and citation systems that make institutional knowledge searchable and trustworthy.",
  },
  {
    id: "job-3",
    title: "Mentor — Frontend & Design Systems",
    location: "Remote, part-time",
    type: "Contract",
    summary: "Teach 1:1 inside PragnyX Learning. Flexible hours, you set your own availability.",
  },
  {
    id: "job-4",
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    summary: "Shape the interface layer across Atlas, Lumen, Forge, and Signal.",
  },
];
