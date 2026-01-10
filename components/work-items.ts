export type WorkItem = {
  slug: string;
  name: string;
  png: string;
  fallback: string;
  meta: string;
  scope: string;
  stack: string[];
  highlights: string[];
  gallery?: string[];
};

export const workItems: WorkItem[] = [
  {
    slug: 'caps-tutor',
    name: 'CAPS Tutor',
    png: '/work/capstutor.png',
    fallback: '/work/caps-tutor.svg',
    meta: 'EdTech · AI Tutor · Web App',
    scope:
      `CAPS Tutor is an AI-powered educational platform built around the South African Curriculum and Assessment Policy Statement (CAPS) for Grades 10–12. The goal was to deliver a full learning ecosystem: a student experience that feels like a personal tutor, plus teacher/admin tooling that makes it practical to manage content at scale.

The platform combines structured CAPS-aligned content, interactive lessons, practice, and authentic past papers—with live-style analytics and an admin workflow for creating/managing learning resources and reporting across subjects.`,
    highlights: [
      'Student dashboard with progress tracking: lessons completed, mastery by topic, time spent, and historical performance',
      'Interactive AI tutor that provides step-by-step explanations and personalized support 24/7',
      'Adaptive practice questions tailored to grade, subject, and weak areas',
      'Searchable lessons hub with embedded practice questions and quizzes',
      'Grade 12 CAPS past papers (Paper 1, Paper 2, memos) with authentic exam-style layouts',
      'Past paper creation/management workflow (PDF or structured formats) with processing tooling',
      'Admin dashboard to manage subjects, lesson content, practice questions, and weekly tasks',
      'Student management: view progress, spot problem topics, and export reporting',
      'Live-style analytics for engagement and mastery trends across topics and subjects',
      'System-wide settings and announcements for platform-wide communication',
      'News + blog pages for updates, announcements, and SEO-friendly educational content',
      'Achievement-style progression for motivation and retention',
      'Multi-language-ready foundation (11 official SA languages)',
      'Subjects supported include Mathematics, Physical Sciences, Life Sciences, Accounting, Business Studies, Economics, Geography, History, IT, CAT, English, Afrikaans',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'shadcn/ui (Radix UI primitives)',
      'Recharts (analytics + reporting visualizations)',
      'Lucide React (icons)',
      'Appwrite (auth, DB, file storage)',
      'AI integrations (tutoring + question generation)',
      'Groq API (AI workflows)',
      'Next.js API routes (server-side logic)',
      'PDF + exam paper processing pipeline (Python tooling)',
      'PyMuPDF (fitz) (PDF extraction)',
      'OpenCV (diagram detection / image processing)',
    ],
    gallery: [
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145539.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145544.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145607.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145614.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145620.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145628.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145640.png',
      '/pixa_pics/capstutor/Screenshot 2026-01-10 145646.png',
    ],
  },
  {
    slug: 'paws-on-route',
    name: 'Paws On Route',
    png: '/work/pawsonroute.png',
    fallback: '/work/paws-on-route.svg',
    meta: 'WordPress · Local Services · SEO',
    scope:
      'A WordPress website for a George-based pet grooming and pet sitting business, built to drive bookings and enquiries with a clear service structure and strong trust signals.',
    highlights: [
      'Service pages structured for local search intent',
      'Fast contact flow (call/WhatsApp/contact form)',
      'Clean design for credibility and trust',
      'SEO-focused headings, content structure, and performance basics',
    ],
    stack: ['WordPress', 'SEO setup', 'Performance tuning', 'Lead/contact flows'],
    gallery: [
      '/pixa_pics/pawsonroute/Screenshot 2026-01-10 145253.png',
      '/pixa_pics/pawsonroute/Screenshot 2026-01-10 145307.png',
      '/pixa_pics/pawsonroute/Screenshot 2026-01-10 145314.png',
    ],
  },
  {
    slug: 'team-colours',
    name: 'Team Colours',
    png: '/work/teamcolours.png',
    fallback: '/work/team-colours.svg',
    meta: 'WordPress · Ecommerce · SEO',
    scope:
      'A George-based South African ecommerce website focused on product discovery, SEO, and conversion. Built to scale product catalog content while keeping the shopping experience simple.',
    highlights: [
      'Ecommerce-ready site structure with product/category hierarchy',
      'SEO-focused pages and metadata baseline',
      'Conversion-first layout and product presentation',
      'Performance improvements for faster browsing',
    ],
    stack: ['WordPress', 'WooCommerce', 'SEO', 'Performance optimization'],
    gallery: [
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145124.png',
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145155.png',
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145224.png',
    ],
  },
  {
    slug: 'vicbay',
    name: 'VicBay',
    png: '/work/vicbay.png',
    fallback: '/work/vicbay.svg',
    meta: 'WordPress · Ecommerce · SEO',
    scope:
      'An ecommerce-focused WordPress build with SEO and conversion-oriented landing sections, designed to represent a strong brand presence and push enquiries/sales.',
    highlights: [
      'Brand-forward layout with clear calls-to-action',
      'SEO-friendly page structure and content flow',
      'Performance-focused tweaks for a smoother experience',
    ],
    stack: ['WordPress', 'WooCommerce', 'SEO setup', 'Performance tuning'],
    gallery: [
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145427.png',
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145436.png',
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145445.png',
    ],
  },
  {
    slug: 'key-masters',
    name: 'Key Masters',
    png: '/work/keymasters.png',
    fallback: '/work/key-masters.svg',
    meta: 'WordPress · Lead Gen · SEO',
    scope:
      'A WordPress lead-generation website designed to rank locally and capture enquiries quickly. Built around high-intent service pages and simple contact actions.',
    highlights: [
      'SEO-oriented service pages for local intent',
      'Lead capture flow optimized for quick contact',
      'Clean, credible layout to improve conversion rate',
    ],
    stack: ['WordPress', 'SEO', 'Lead forms', 'Conversion optimization'],
    gallery: [
      '/pixa_pics/keymasters/Screenshot 2026-01-10 145829.png',
      '/pixa_pics/keymasters/Screenshot 2026-01-10 145833.png',
      '/pixa_pics/keymasters/Screenshot 2026-01-10 145839.png',
    ],
  },
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    png: '/work/physiope.png',
    fallback: '/work/physiotherapy.svg',
    meta: 'WordPress · Healthcare · Contact Flow',
    scope:
      'A Port Elizabeth-based physiotherapy website combining services, company background, and a strong contact flow—built to help patients quickly understand offerings and reach out.',
    highlights: [
      'Clear services + about structure for trust and clarity',
      'Contact-first UX with prominent enquiry actions',
      'SEO-ready content structure for local discovery',
    ],
    stack: ['WordPress', 'SEO', 'Contact forms', 'Content/portfolio sections'],
    gallery: [
      '/pixa_pics/physiope/Screenshot 2026-01-10 145341.png',
      '/pixa_pics/physiope/Screenshot 2026-01-10 145349.png',
      '/pixa_pics/physiope/Screenshot 2026-01-10 145410.png',
    ],
  },
  {
    slug: 'kikay-pharma',
    name: 'Kikay Pharma Consultants',
    png: '/work/kikay.png',
    fallback: '/work/kikay.svg',
    meta: 'WordPress · Corporate · Enquiries',
    scope:
      'An informational site for a pharmaceutical consultant, focused on explaining services clearly to the public and creating a smooth path to contact and enquiries.',
    highlights: [
      'Content structure for clarity and credibility',
      'Contact CTAs placed where users need them',
      'SEO foundation for visibility',
    ],
    stack: ['WordPress', 'SEO', 'Lead generation forms'],
    gallery: [
      '/pixa_pics/kikay/Screenshot 2026-01-10 145852.png',
      '/pixa_pics/kikay/Screenshot 2026-01-10 145858.png',
      '/pixa_pics/kikay/Screenshot 2026-01-10 145911.png',
    ],
  },
  {
    slug: 'spotlight',
    name: 'Spotlight',
    png: '/work/spotlight.png',
    fallback: '/work/spotlight.svg',
    meta: 'Next.js · Maps · Admin · Analytics',
    scope:
      'A Garden Route business discovery platform with an interactive map experience, SEO blog system, admin dashboard, authentication, and analytics tracking.',
    highlights: [
      'Interactive map exploration with smooth animations',
      'SEO blog system with content workflows',
      'Admin panel with authentication and role-safe access',
      'Analytics and automated reporting foundation',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Supabase (Postgres)',
      'NextAuth.js',
      'Mapbox GL JS',
      'Resend',
    ],
  },
  {
    slug: 'nexai',
    name: 'NexAI',
    png: '/work/nexai.png',
    fallback: '/work/nexai.svg',
    meta: 'AI · Backend · Integrations',
    scope:
      'Draft portfolio copy: An AI calling product for a US-based client. The build focused on reliable backend integrations, clean data flow, and a stable foundation for scaling call volume.',
    highlights: [
      'API integrations and backend endpoints for product workflows',
      'Structured logging + error handling to keep production stable',
      'Foundational security and validation around inbound requests',
      'Performance-minded approach to keep response times fast',
    ],
    stack: ['Backend services', 'API integrations', 'TypeScript/Node.js', 'Database + queue-ready architecture'],
    gallery: [
      '/pixa_pics/nexai/Screenshot 2026-01-10 150029.png',
      '/pixa_pics/nexai/Screenshot 2026-01-10 150043.png',
      '/pixa_pics/nexai/Screenshot 2026-01-10 150051.png',
    ],
  },
  {
    slug: 'ai-testing',
    name: 'AI Testing',
    png: '/work/ai.png',
    fallback: '/work/ai-testing.svg',
    meta: 'Robotics · QA · Platforms',
    scope:
      'Draft portfolio copy: A European robotics QA team needed a web platform to manage AI test runs, results, and review workflows. The focus was on repeatable testing and clean reporting.',
    highlights: [
      'Dashboard-style UI for test results and trend tracking',
      'Backend endpoints for storing and querying test runs',
      'Role-based admin access for internal workflows',
      'Exportable reporting foundations for stakeholders',
    ],
    stack: ['Web app', 'API routes', 'Database-backed storage', 'Auth-ready admin tooling'],
    gallery: ['/pixa_pics/ai/Screenshot 2026-01-10 145507.png'],
  },
];
