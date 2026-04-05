export const SITE = {
  title: 'dhqudcks0430 Notes',
  shortTitle: 'dhqudcks0430',
  description: 'dhqudcks0430의 정적 개발자 포트폴리오이자 시스템 해킹 글 아카이브로, 사이버보안 학습·익스플로잇 연습·기술 메모에 집중합니다.',
  author: 'dhqudcks0430',
  email: 'ddonggojin.gg@gmail.com',
  github: 'https://github.com/dhqudcks0430',
  linkedin: '',
  tagline: '사이버보안 학습자, 시스템 해킹 글 아카이브, 다크 미니멀 기술 블로그.',
  accent: '#73e2a7',
  nav: [
    { label: '홈', href: '/' },
    { label: '소개', href: '/about' },
    { label: '연락처', href: '/contact' },
    { label: '아카이브', href: '/archive' },
    { label: '태그', href: '/tags' },
    { label: '카테고리', href: '/categories' }
  ],
  tracks: [
    {
      label: '드림핵 시스템 해킹',
      shortLabel: '드림핵',
      href: '/dreamhack/system-hacking',
      trackKey: 'dreamhack-system-hacking',
      description: '바이너리 익스플로잇 진행 노트, 스택 제어, 셸코드 연습, 완화기법을 고려한 작업 흐름.'
    },
    {
      label: 'pwnable.kr',
      shortLabel: 'pwnable.kr',
      href: '/pwnable-kr',
      trackKey: 'pwnable-kr',
      description: '기초, 환경 제어, 익스플로잇 기법에 초점을 둔 pwnable.kr 문제 해설 모음.'
    }
  ],
  social: [
    { label: '깃허브', href: 'https://github.com/dhqudcks0430' },
    { label: '이메일', href: 'mailto:ddonggojin.gg@gmail.com' }
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
  'system-hacking': '시스템 해킹',
  pwn: '포너블',
  reversing: '리버싱',
  'web-security': '웹 보안',
  crypto: '크립토',
  forensics: '포렌식',
  misc: '기타',
  tooling: '도구'
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: '입문',
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
  insane: '매우 어려움',
  unknown: '알 수 없음'
};

export const STATUS_LABELS: Record<string, string> = {
  planned: '예정',
  'in-progress': '진행 중',
  solved: '해결',
  reviewed: '검토 완료'
};

export const PLATFORM_LABELS: Record<string, string> = {
  dreamhack: '드림핵',
  'pwnable-kr': 'pwnable.kr'
};
