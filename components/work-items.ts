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
  facts?: { label: string; value: string }[];
  sections?: { title: string; description?: string; bullets?: string[] }[];
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
    facts: [
      { label: 'Type', value: 'AI-powered learning platform' },
      { label: 'Curriculum', value: 'CAPS (Grades 10–12)' },
      { label: 'Users', value: 'Students · Teachers · Admins' },
      { label: 'Core focus', value: 'Learning + practice + analytics at scale' },
    ],
    sections: [
      {
        title: 'Student experience',
        bullets: [
          'Personalized practice flow based on grade, subject, and weak areas',
          'AI tutor for step-by-step explanations and concept support',
          'Lesson hub that is searchable, structured, and easy to navigate',
          'Progress tracking showing mastery per topic and time spent',
          'Achievement-style motivation to keep learners engaged',
        ],
      },
      {
        title: 'Teacher & admin dashboards',
        bullets: [
          'View class/student progress and identify struggling topics quickly',
          'Manage lessons, practice questions, and subject availability',
          'Set weekly tasks and platform-wide announcements',
          'Export reporting for progress and engagement snapshots',
        ],
      },
      {
        title: 'Past papers & lesson creation workflow',
        bullets: [
          'Upload and manage Grade 12 past papers (Paper 1/2 + memos)',
          'Maintain authentic exam layouts and clear navigation between papers and memos',
          'Support structured formats (PDF and structured data) for reuse and consistency',
          'Processing tooling to extract content and handle diagrams/visual elements',
        ],
      },
      {
        title: 'AI + API usage',
        description:
          'AI is used to help learners get explanations and to support question generation and tutoring workflows. The platform integrates these features server-side to keep keys secure and to control/monitor usage.',
        bullets: [
          'Server-side API routes for validation, rate limiting foundations, and secure key usage',
          'Logging-ready structure for monitoring failures and improving reliability over time',
          'Designed so AI features can be expanded without rewriting the app architecture',
        ],
      },
      {
        title: 'News & blogs',
        bullets: [
          'Announcement-style updates for students and platform changes',
          'Evergreen content pages for SEO-friendly educational content',
          'Structured layout so content can grow without cluttering the learning UI',
        ],
      },
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
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Pet grooming + pet sitting' },
      { label: 'Location', value: 'George, Western Cape' },
      { label: 'Goal', value: 'Bookings + enquiries' },
    ],
    sections: [
      {
        title: 'What was delivered',
        bullets: [
          'Service-first site structure for clarity and local SEO',
          'Trust-building layout with clear calls-to-action',
          'Fast contact flow for mobile users',
        ],
      },
    ],
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
    facts: [
      { label: 'Platform', value: 'WordPress + WooCommerce' },
      { label: 'Type', value: 'Ecommerce' },
      { label: 'Location', value: 'George, South Africa' },
      { label: 'Focus', value: 'SEO + conversion' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Product catalog structure designed for SEO and discoverability',
          'Conversion-focused product presentation and calls-to-action',
          'Performance tuning for a smoother shopping experience',
        ],
      },
    ],
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
    facts: [
      { label: 'Platform', value: 'WordPress + WooCommerce' },
      { label: 'Type', value: 'Ecommerce' },
      { label: 'Location', value: 'George, South Africa' },
      { label: 'Goal', value: 'Sales + enquiries' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Brand-forward layout designed for credibility and conversion',
          'SEO-ready structure to support local discovery',
          'Performance tuning and cleanup for better user experience',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145427.png',
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145436.png',
      '/pixa_pics/vicbay/Screenshot 2026-01-10 145445.png',
    ],
  },
  {
    slug: 'illumi',
    name: 'Illumi',
    png: '/work/illumi.png',
    fallback: '/work/illumi.svg',
    meta: 'Next.js · Invoicing · Finance Dashboard',
    scope:
      'Illumi is a web-based invoicing + lightweight finance dashboard for small businesses. It helps you create, send, track, and get paid for invoices, with a dashboard that summarizes revenue, outstanding amounts, and key activity.',
    highlights: [
      'Create invoices with customizable templates (Classic/Minimal/Modern)',
      'Light/Dark invoice mode with logo support',
      'Public invoice payment page with payment provider integration (PayFast, Stripe)',
      'Email sending via Resend API with standardized sender',
      'Recurring & scheduled invoices with automated cron processing',
      'Dashboard overview showing revenue, pending invoices, and customer/product counts',
      'Workspace-based data separation for multi-tenant support',
      'Safe email sending: invoices revert to draft if email fails',
      'Marketing site with resources and calculators',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'React',
      'TailwindCSS',
      'shadcn/ui components',
      'Supabase (Postgres + Auth)',
      'Resend (email)',
      'framer-motion',
      'Tabler Icons',
      'Lucide Icons',
    ],
    facts: [
      { label: 'Type', value: 'Invoicing + finance platform' },
      { label: 'Users', value: 'Small businesses' },
      { label: 'Core features', value: 'Invoicing · Payments · Dashboard' },
      { label: 'Hosting', value: 'Vercel + Supabase' },
    ],
    sections: [
      {
        title: 'Invoicing features',
        bullets: [
          'Template-based invoice creation with preview',
          'Line items, tax calculations, and custom notes',
          'Logo upload with background handling',
          'Public payment pages for customer payments',
          'Email delivery with failure handling',
        ],
      },
      {
        title: 'Automation & scheduling',
        bullets: [
          'Recurring invoices processed via cron endpoints',
          'Scheduled invoices with automated sending',
          'Cron endpoints secured with CRON_SECRET header',
        ],
      },
      {
        title: 'Dashboard & workspace',
        bullets: [
          'Revenue tracking and outstanding invoice summaries',
          'Customer and product management',
          'Charts and summary widgets for key metrics',
          'Workspace-based data isolation',
        ],
      },
      {
        title: 'Payment integration',
        bullets: [
          'Payment provider workflow (PayFast, Stripe)',
          'Public payment links via /pay/[id] route',
          'Payment status tracking',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/illumi/screencapture-illumi-co-za-overview-2026-01-20-19_13_37.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-invoices-2026-01-20-19_13_42.png',
      '/pixa_pics/illumi/invoices.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-invoices-new-2026-01-20-19_14_11.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-expenses-2026-01-20-19_14_18.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-clients-2026-01-20-19_14_26.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-clients-new-2026-01-20-19_14_37.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-products-2026-01-20-19_14_44.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-products-new-2026-01-20-19_14_49 (1).png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-settings-2026-01-20-19_14_55.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-settings-billing-2026-01-20-19_15_03.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-settings-paygate-2026-01-20-19_15_09.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-settings-notifications-2026-01-20-19_15_23.png',
      '/pixa_pics/illumi/screencapture-illumi-co-za-settings-support-2026-01-20-19_15_32.png',
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
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Physiotherapy' },
      { label: 'Location', value: 'Port Elizabeth' },
      { label: 'Goal', value: 'Contact + credibility' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Services and company profile for patient trust',
          'Contact flow designed for quick enquiries',
          'SEO-ready structure for local discovery',
        ],
      },
    ],
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
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Pharmaceutical consulting' },
      { label: 'Goal', value: 'Education + enquiries' },
      { label: 'Focus', value: 'Clarity + trust' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Explain services clearly for a non-technical audience',
          'Build trust through structure and messaging',
          'Strong enquiry flow with easy contact actions',
        ],
      },
    ],
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
    facts: [
      { label: 'Type', value: 'Interactive map + admin platform' },
      { label: 'Region', value: 'Garden Route' },
      { label: 'Core features', value: 'Maps · Blog · Analytics' },
      { label: 'Audience', value: 'Users + admins' },
    ],
    sections: [
      {
        title: 'Key capabilities',
        bullets: [
          'Map-first discovery flow with smooth UI',
          'Admin panel with authentication and protected routes',
          'Analytics tracking for interactions and reporting foundation',
          'SEO-friendly blog system for content growth',
        ],
      },
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
    facts: [
      { label: 'Type', value: 'AI product (backend + integrations)' },
      { label: 'Focus', value: 'Reliability + scaling' },
      { label: 'Work', value: 'Backend services + API integrations' },
    ],
    sections: [
      {
        title: 'What I focused on',
        bullets: [
          'Stable integration layer with clear input validation',
          'Production-minded error handling and logging foundations',
          'Architecture that can scale as volume increases',
        ],
      },
    ],
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
    facts: [
      { label: 'Type', value: 'Internal platform + reporting' },
      { label: 'Focus', value: 'Repeatable testing workflows' },
      { label: 'Users', value: 'Internal teams + admins' },
    ],
    sections: [
      {
        title: 'Platform goals',
        bullets: [
          'Centralize test runs and results in one place',
          'Make trends and regressions visible to the team',
          'Keep review and reporting workflows simple and repeatable',
        ],
      },
    ],
    gallery: ['/pixa_pics/ai/Screenshot 2026-01-10 145507.png'],
  },
];
