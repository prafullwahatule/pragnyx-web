// Central content store for the PragnyX site.
// Keeping copy + structured data here means pages stay declarative
// and the same source of truth can back API validation.

export const NAV_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/eduos", label: "EduOS" },
  // { href: "/learning", label: "Learning" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const PRODUCTS = [
  {
    slug: "business-intelligence",
    name: "Business Intelligence Solution",
    tag: "BI & Reporting",
    summary:
      "Turn scattered spreadsheets and disconnected dashboards into one clear, decision-ready view of how your business is actually performing.",
    bullets: [
      "Live dashboards pulled from every source you already use",
      "KPI tracking built around your business, not a generic template",
      "Self-serve reporting your team can use without asking IT",
    ],
    color: "blue",
  },
  {
    slug: "software-solutions",
    name: "Software Solutions",
    tag: "Custom Engineering",
    summary:
      "Custom software built around how your team actually works — from internal tools and web platforms to full product builds, designed to last.",
    bullets: [
      "Web, mobile, and internal tools built end-to-end",
      "Architecture that scales with you, not against you",
      "Your team owns the code — no lock-in, ever",
    ],
    color: "violet",
  },
  {
    slug: "data-intelligence",
    name: "Data Intelligence",
    tag: "Data Engineering & Analytics",
    summary:
      "We turn raw, messy data into a single source of truth — clean pipelines, reliable warehousing, and analytics your team can actually trust.",
    bullets: [
      "End-to-end pipelines from raw data to clean insight",
      "Warehousing and modeling built to hold up at scale",
      "Analytics that explain the 'why', not just the 'what'",
    ],
    color: "blue",
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    tag: "Applied AI",
    summary:
      "We design and ship AI-driven automation that removes the repetitive work slowing your team down — reasoned through, not bolted on as a gimmick.",
    bullets: [
      "Workflow automation for the tasks eating your team's time",
      "Applied AI features grounded in your real data",
      "Explainable outputs — built to be trusted, not just fast",
    ],
    color: "violet",
  },
  {
    slug: "pragnyx-eduos",
    name: "PragnyX EduOS",
    tag: "Education ERP + AI OS",
    summary:
      "The AI operating system for modern colleges and schools — one product, every department, from admissions to alumni, replacing clunky legacy ERPs with real-time dashboards and role-based portals.",
    bullets: [
      "Role-based dashboards for Admin, Principal, HOD, Faculty, Student, Parent, Accountant, Librarian, Hostel Warden & Placement Officer",
      "No-code Workflow, Dashboard, Form & Report Builders, plus an EduOS AI Copilot for instant search across the system",
      "Full academic lifecycle — admissions & CRM, academics, attendance, exams, hostel, transport, HR & payroll, placements — secured with role-based access, audit logging & encryption",
    ],
    color: "violet",
    href: "/eduos",
  },
];

export const FOUNDER = {
  name: "Founder Name",
  title: "Founder & CEO, PragnyX",
  bio: "Started PragnyX on a simple frustration: most software ships fast and gets patched forever, instead of being reasoned through once. Now leads the studio's product, engineering, and learning lines with that same standard.",
  quote:
    "We don't ship the first idea that works. We ship the idea we can explain, defend, and stand behind a year from now.",
};

export const TEAM = [
  {
    id: "team-1",
    name: "Team Member One",
    role: "Engineering Lead",
    bio: "Leads core product engineering across the platform, with a focus on systems that stay reliable as they scale.",
  },
  {
    id: "team-2",
    name: "Team Member Two",
    role: "Data & AI Lead",
    bio: "Builds the data pipelines and applied-AI features that power Data Intelligence and AI & Automation.",
  },
  {
    id: "team-3",
    name: "Team Member Three",
    role: "Design Lead",
    bio: "Shapes the interface layer across every PragnyX product, custom build, and client engagement.",
  },
  {
    id: "team-4",
    name: "Team Member Four",
    role: "Client Solutions Lead",
    bio: "Works directly with client teams to scope, build, and ship Software Solutions and BI engagements.",
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
    title: "Full-Stack Developer — Website & Platform",
    location: "Remote",
    type: "Full-time",
    summary:
      "Build, maintain, and scale the PragnyX website and internal platform end-to-end — frontend, backend, deployments, and everything in between.",
  },
  {
    id: "job-2",
    title: "Senior Backend Engineer — Data Intelligence",
    location: "Remote",
    type: "Full-time",
    summary: "Own the core data pipelines and infrastructure that client Data Intelligence engagements run on top of.",
  },
  {
    id: "job-3",
    title: "Applied AI Engineer — AI & Automation",
    location: "Remote",
    type: "Full-time",
    summary: "Build the automation and applied-AI systems that make client workflows faster and more reliable.",
  },
  {
    id: "job-4",
    title: "Mentor — Frontend & Design Systems",
    location: "Remote, part-time",
    type: "Contract",
    summary: "Teach 1:1 inside PragnyX Learning. Flexible hours, you set your own availability.",
  },
  {
    id: "job-5",
    title: "Product Designer",
    location: "Remote",
    type: "Full-time",
    summary: "Shape the interface layer across Business Intelligence, Software Solutions, Data Intelligence, and AI & Automation.",
  },
];