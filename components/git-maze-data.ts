export type CommitNode = {
  id: string;
  x: number;
  y: number;
  type: 'milestone' | 'skill' | 'project' | 'easter-egg' | 'merge-conflict';
  title: string;
  message: string;
  icon: string;
  branch: string;
  unlocksBadge?: string;
  projectUrl?: string;
  projectImage?: string;
  techStack?: string[];
  trivia?: {
    question: string;
    options: string[];
    correct: number;
    hint: string;
  };
};

export type Branch = {
  id: string;
  name: string;
  color: string;
  description: string;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredCommits: string[];
};

export const branches: Branch[] = [
  { id: 'main', name: 'main', color: '#2f81f7', description: 'My journey' },
  { id: 'frontend', name: 'feature/frontend', color: '#a855f7', description: 'React, Next.js, UI/UX' },
  { id: 'backend', name: 'feature/backend', color: '#22d3ee', description: 'Node.js, APIs, Databases' },
  { id: 'projects', name: 'feature/projects', color: '#4ade80', description: 'Real-world work' },
  { id: 'fun', name: 'feature/easter-eggs', color: '#f472b6', description: 'Hidden secrets' },
];

export const badges: Badge[] = [
  {
    id: 'react-pro',
    name: 'React Pro',
    icon: '⚛️',
    description: 'Mastered the React commits',
    requiredCommits: ['react-1', 'react-2', 'nextjs-1'],
  },
  {
    id: 'backend-hero',
    name: 'Backend Hero',
    icon: '🔧',
    description: 'Conquered the server side',
    requiredCommits: ['node-1', 'api-1', 'db-1'],
  },
  {
    id: 'coffee-lover',
    name: 'Coffee Enthusiast',
    icon: '☕',
    description: 'Found the coffee easter egg',
    requiredCommits: ['coffee-1'],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    icon: '🗺️',
    description: 'Visited all branches',
    requiredCommits: ['main-start', 'frontend-start', 'backend-start', 'projects-start'],
  },
  {
    id: 'completionist',
    name: 'Completionist',
    icon: '🏆',
    description: 'Collected all commits',
    requiredCommits: [],
  },
];

export const commits: CommitNode[] = [
  // Main branch - personal milestones
  {
    id: 'main-start',
    x: 50,
    y: 90,
    type: 'milestone',
    title: 'init: cameron-falck',
    message: "Hi! I'm Cameron Falck, a full-stack developer from George, Western Cape.",
    icon: '👋',
    branch: 'main',
  },
  {
    id: 'main-location',
    x: 50,
    y: 75,
    type: 'milestone',
    title: 'feat: add location',
    message: 'Based in George, Western Cape, South Africa. Love the ocean and mountains!',
    icon: '📍',
    branch: 'main',
  },
  {
    id: 'main-experience',
    x: 50,
    y: 60,
    type: 'milestone',
    title: 'feat: 5+ years experience',
    message: 'Been coding professionally for over 5 years. Started with PHP, now love TypeScript.',
    icon: '💼',
    branch: 'main',
  },
  {
    id: 'merge-1',
    x: 50,
    y: 45,
    type: 'merge-conflict',
    title: 'MERGE CONFLICT',
    message: 'Resolve the conflict to continue!',
    icon: '⚠️',
    branch: 'main',
    trivia: {
      question: 'What framework do I love most?',
      options: ['Angular', 'React/Next.js', 'Vue', 'Svelte'],
      correct: 1,
      hint: "Check my tech stack badges... it's blue and has a ⚛️",
    },
  },
  {
    id: 'main-passion',
    x: 50,
    y: 30,
    type: 'milestone',
    title: 'feat: add passion',
    message: 'I love building products that solve real problems. Clean code is my therapy.',
    icon: '❤️',
    branch: 'main',
  },
  {
    id: 'main-end',
    x: 50,
    y: 15,
    type: 'milestone',
    title: 'chore: ready for hire',
    message: "Let's build something amazing together! Contact me to start a project.",
    icon: '🚀',
    branch: 'main',
    unlocksBadge: 'explorer',
  },

  // Frontend branch
  {
    id: 'frontend-start',
    x: 25,
    y: 70,
    type: 'skill',
    title: 'feat: branch frontend',
    message: 'Welcome to my frontend skills! React, Next.js, and modern UI.',
    icon: '🎨',
    branch: 'frontend',
  },
  {
    id: 'react-1',
    x: 15,
    y: 60,
    type: 'skill',
    title: 'feat: master React',
    message: 'React is my bread and butter. Hooks, context, custom hooks - love it all.',
    icon: '⚛️',
    branch: 'frontend',
  },
  {
    id: 'react-2',
    x: 20,
    y: 50,
    type: 'skill',
    title: 'feat: add state management',
    message: 'Redux, Zustand, Jotai - pick your poison. I prefer keeping it simple.',
    icon: '🔄',
    branch: 'frontend',
  },
  {
    id: 'nextjs-1',
    x: 25,
    y: 40,
    type: 'skill',
    title: 'feat: embrace Next.js',
    message: 'SSR, SSG, ISR - Next.js is the future. App Router is chef\'s kiss.',
    icon: '▲',
    branch: 'frontend',
    unlocksBadge: 'react-pro',
  },
  {
    id: 'tailwind-1',
    x: 30,
    y: 30,
    type: 'skill',
    title: 'style: add Tailwind',
    message: 'Utility-first CSS changed my life. No more naming nightmares.',
    icon: '💨',
    branch: 'frontend',
  },

  // Backend branch
  {
    id: 'backend-start',
    x: 75,
    y: 70,
    type: 'skill',
    title: 'feat: branch backend',
    message: 'Server-side is where the magic happens. Node.js all the way.',
    icon: '⚙️',
    branch: 'backend',
  },
  {
    id: 'node-1',
    x: 85,
    y: 60,
    type: 'skill',
    title: 'feat: Node.js mastery',
    message: 'Express, Fastify, NestJS - built APIs that handle millions of requests.',
    icon: '💚',
    branch: 'backend',
  },
  {
    id: 'api-1',
    x: 80,
    y: 50,
    type: 'skill',
    title: 'feat: REST & GraphQL',
    message: 'REST for simplicity, GraphQL for flexibility. Both in my toolkit.',
    icon: '🔗',
    branch: 'backend',
  },
  {
    id: 'db-1',
    x: 75,
    y: 40,
    type: 'skill',
    title: 'feat: database design',
    message: 'PostgreSQL, MongoDB, Prisma ORM. Data modeling is an art.',
    icon: '🗄️',
    branch: 'backend',
    unlocksBadge: 'backend-hero',
  },
  {
    id: 'merge-2',
    x: 80,
    y: 30,
    type: 'merge-conflict',
    title: 'MERGE CONFLICT',
    message: 'Another conflict! Prove your worth.',
    icon: '⚠️',
    branch: 'backend',
    trivia: {
      question: 'What\'s my favorite database?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
      correct: 1,
      hint: 'The elephant never forgets... 🐘',
    },
  },

  // Projects branch
  {
    id: 'projects-start',
    x: 35,
    y: 55,
    type: 'project',
    title: 'feat: branch projects',
    message: 'Real work I\'ve shipped. Click to explore!',
    icon: '📦',
    branch: 'projects',
  },
  {
    id: 'project-caps',
    x: 25,
    y: 45,
    type: 'project',
    title: 'feat: CAPS Tutor',
    message: 'Educational platform for South African curriculum. 10k+ students.',
    icon: '📚',
    branch: 'projects',
    projectUrl: '/work/caps-tutor',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
  },
  {
    id: 'project-pixaloom',
    x: 40,
    y: 35,
    type: 'project',
    title: 'feat: Pixaloom',
    message: 'This very portfolio! Built with Next.js 14 and lots of love.',
    icon: '🎯',
    branch: 'projects',
    projectUrl: '/',
    techStack: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
  },

  // Easter eggs branch
  {
    id: 'coffee-1',
    x: 65,
    y: 55,
    type: 'easter-egg',
    title: 'fix: coffee levels critical',
    message: '☕ Achievement unlocked: Coffee Enthusiast! I run on caffeine.',
    icon: '☕',
    branch: 'fun',
    unlocksBadge: 'coffee-lover',
  },
  {
    id: 'bug-1',
    x: 70,
    y: 45,
    type: 'easter-egg',
    title: 'fix: it works on my machine',
    message: '🐛 Classic developer excuse. But seriously, Docker helps.',
    icon: '🐛',
    branch: 'fun',
  },
  {
    id: 'sleep-1',
    x: 60,
    y: 35,
    type: 'easter-egg',
    title: 'fix: sleep schedule',
    message: '😴 404: Sleep not found. Will fix in next sprint (probably not).',
    icon: '😴',
    branch: 'fun',
  },
  {
    id: 'secret-1',
    x: 90,
    y: 20,
    type: 'easter-egg',
    title: 'feat: hidden message',
    message: '🎉 You found the secret! You\'re clearly someone who explores. I like that.',
    icon: '🎉',
    branch: 'fun',
  },
];

export const connections: [string, string][] = [
  // Main branch
  ['main-start', 'main-location'],
  ['main-location', 'main-experience'],
  ['main-experience', 'merge-1'],
  ['merge-1', 'main-passion'],
  ['main-passion', 'main-end'],
  
  // Frontend branch (splits from main)
  ['main-location', 'frontend-start'],
  ['frontend-start', 'react-1'],
  ['react-1', 'react-2'],
  ['react-2', 'nextjs-1'],
  ['nextjs-1', 'tailwind-1'],
  ['tailwind-1', 'main-passion'],
  
  // Backend branch (splits from main)
  ['main-location', 'backend-start'],
  ['backend-start', 'node-1'],
  ['node-1', 'api-1'],
  ['api-1', 'db-1'],
  ['db-1', 'merge-2'],
  ['merge-2', 'main-passion'],
  
  // Projects branch
  ['main-experience', 'projects-start'],
  ['projects-start', 'project-caps'],
  ['project-caps', 'project-pixaloom'],
  ['project-pixaloom', 'merge-1'],
  
  // Easter eggs
  ['main-experience', 'coffee-1'],
  ['coffee-1', 'bug-1'],
  ['bug-1', 'sleep-1'],
  ['db-1', 'secret-1'],
];
