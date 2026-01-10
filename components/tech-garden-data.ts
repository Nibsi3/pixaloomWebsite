export type GardenPlant = {
  id: string;
  x: number;
  y: number;
  kind: 'skill' | 'project' | 'fun';
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  facts: string[];
  tech?: string[];
  href?: string;
};

export type GardenBug = {
  id: string;
  title: string;
  message: string;
};

export const gardenPlants: GardenPlant[] = [
  {
    id: 'react-flower',
    x: 18,
    y: 62,
    kind: 'skill',
    name: 'React Flower',
    subtitle: 'Components that bloom fast',
    color: '#a855f7',
    icon: '⚛️',
    facts: [
      'Hooks + custom hooks are my go-to pattern',
      'I build reusable UI systems, not one-off pages',
      'State stays boring: predictable + testable',
    ],
    tech: ['React', 'TypeScript'],
  },
  {
    id: 'next-tree',
    x: 38,
    y: 52,
    kind: 'skill',
    name: 'Next.js Tree',
    subtitle: 'SSR roots, SEO canopy',
    color: '#2f81f7',
    icon: '▲',
    facts: [
      'I ship App Router projects with clean server/client boundaries',
      'I care about Core Web Vitals and real-world UX',
      'Routing, caching, metadata: all handled cleanly',
    ],
    tech: ['Next.js', 'React', 'Tailwind'],
  },
  {
    id: 'node-tree',
    x: 62,
    y: 58,
    kind: 'skill',
    name: 'Node Tree',
    subtitle: 'APIs that don’t fall over',
    color: '#22d3ee',
    icon: '🟢',
    facts: [
      'REST APIs, auth, rate limiting, background jobs',
      'Pragmatic architecture: simple first, scale when needed',
      'Observability matters: logs + metrics + useful errors',
    ],
    tech: ['Node.js', 'APIs'],
  },
  {
    id: 'caps-tutor',
    x: 78,
    y: 44,
    kind: 'project',
    name: 'CAPS Tutor',
    subtitle: 'Learning platform',
    color: '#4ade80',
    icon: '📚',
    facts: [
      'Built for real teachers + learners',
      'Dashboards, content workflows, and analytics',
      'Designed for fast iteration and reliability',
    ],
    tech: ['Next.js', 'TypeScript', 'Postgres'],
    href: '/work/caps-tutor',
  },
  {
    id: 'ui-rock',
    x: 26,
    y: 78,
    kind: 'skill',
    name: 'UI/UX Rock',
    subtitle: 'Solid layout foundations',
    color: '#f472b6',
    icon: '🪨',
    facts: [
      'Design systems > random components',
      'Motion should help, not distract',
      'Clarity wins: hierarchy, spacing, and intent',
    ],
    tech: ['UI', 'UX'],
  },
  {
    id: 'easter-mushroom',
    x: 52,
    y: 78,
    kind: 'fun',
    name: 'Mystery Mushroom',
    subtitle: 'Do not deploy on Friday',
    color: '#fbbf24',
    icon: '🍄',
    facts: [
      'feat: coffee consumption tracker (WIP)',
      'fix: typo in my life story',
      'chore: touched grass (rare)',
    ],
  },
];

export const gardenBugs: GardenBug[] = [
  {
    id: 'bug-1',
    title: '🐛 Bug spawned',
    message: 'It works on my machine. Did you try turning it off and on again?',
  },
  {
    id: 'bug-2',
    title: '⚠️ Merge conflict',
    message: 'Hint: I love JavaScript more than CSS (but Tailwind helps).',
  },
  {
    id: 'bug-3',
    title: '🧠 Memory leak',
    message: 'I forgot what I was doing. Probably because I opened 37 tabs.',
  },
  {
    id: 'bug-4',
    title: '🔥 Hot reload',
    message: 'Saved. Refreshed. Broke. Fixed. Repeat.',
  },
  {
    id: 'bug-5',
    title: '⏳ Awaiting coffee',
    message: 'Promise pending… resolving after caffeine.',
  },
];
