export const SITE = {
  title: 'dhqudcks0430 Notes',
  shortTitle: 'dhqudcks0430',
  description: 'A static developer portfolio and system-hacking writeup hub for dhqudcks0430, focused on cybersecurity learning, exploit practice, and technical notes.',
  author: 'dhqudcks0430',
  email: 'ddonggojin.gg@gmail.com',
  github: 'https://github.com/dhqudcks0430',
  linkedin: '',
  tagline: 'Cybersecurity learner, system-hacking writeup archive, and dark minimal technical blog.',
  accent: '#73e2a7',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Archive', href: '/archive' },
    { label: 'Tags', href: '/tags' },
    { label: 'Categories', href: '/categories' }
  ],
  tracks: [
    {
      label: 'DreamHack System Hacking',
      shortLabel: 'DreamHack',
      href: '/dreamhack/system-hacking',
      trackKey: 'dreamhack-system-hacking',
      description: 'Binary exploitation progress notes, stack discipline, shellcode drills, and mitigation-aware workflow.'
    },
    {
      label: 'pwnable.kr',
      shortLabel: 'pwnable.kr',
      href: '/pwnable-kr',
      trackKey: 'pwnable-kr',
      description: 'Classic pwnable.kr challenge writeups focused on fundamentals, environment control, and exploit craft.'
    }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/dhqudcks0430' },
    { label: 'Email', href: 'mailto:ddonggojin.gg@gmail.com' }
  ]
} as const;

export const SITE_BASE = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => {
  if (!path.startsWith('/')) {
    return path;
  }

  if (!SITE_BASE) {
    return path;
  }

  return path === '/' ? SITE_BASE || '/' : `${SITE_BASE}${path}`;
};

export const withoutBase = (pathname: string) => {
  if (!SITE_BASE || !pathname.startsWith(SITE_BASE)) {
    return pathname || '/';
  }

  return pathname.slice(SITE_BASE.length) || '/';
};

export const TOPIC_LABELS: Record<string, string> = {
  'system-hacking': 'System Hacking',
  pwn: 'Pwn',
  reversing: 'Reversing',
  'web-security': 'Web Security',
  crypto: 'Crypto',
  forensics: 'Forensics',
  misc: 'Misc',
  tooling: 'Tooling'
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  insane: 'Insane',
  unknown: 'Unknown'
};

export const STATUS_LABELS: Record<string, string> = {
  planned: 'Planned',
  'in-progress': 'In Progress',
  solved: 'Solved',
  reviewed: 'Reviewed'
};

export const PLATFORM_LABELS: Record<string, string> = {
  dreamhack: 'DreamHack',
  'pwnable-kr': 'pwnable.kr'
};
