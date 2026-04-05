import { getCollection, type CollectionEntry } from 'astro:content';
import { DIFFICULTY_LABELS, PLATFORM_LABELS, SITE, STATUS_LABELS, TOPIC_LABELS } from '@/lib/site';

export type WriteupEntry = CollectionEntry<'writeups'>;
export type PageEntry = CollectionEntry<'pages'>;

export const formatDate = (value: Date) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(value);

export const sortWriteups = (items: WriteupEntry[]) =>
  [...items].sort((left, right) => right.data.publishedAt.getTime() - left.data.publishedAt.getTime());

export const sortFeaturedWriteups = (items: WriteupEntry[]) =>
  [...items].sort((left, right) => {
    const leftWeight = left.data.featuredWeight ?? Number.MAX_SAFE_INTEGER;
    const rightWeight = right.data.featuredWeight ?? Number.MAX_SAFE_INTEGER;
    if (leftWeight !== rightWeight) {
      return leftWeight - rightWeight;
    }

    return right.data.publishedAt.getTime() - left.data.publishedAt.getTime();
  });

export const getPublishedWriteups = async () => sortWriteups(await getCollection('writeups', ({ data }) => !data.draft));

export const getPublishedPages = async () =>
  [...(await getCollection('pages', ({ data }) => !data.draft))].sort((left, right) => left.data.navOrder - right.data.navOrder);

export const getPageByKind = async (pageKind: PageEntry['data']['pageKind']) => {
  const pages = await getPublishedPages();
  return pages.find((page) => page.data.pageKind === pageKind);
};

export const getFeaturedWriteups = (items: WriteupEntry[], limit = 4) =>
  sortFeaturedWriteups(items.filter((item) => item.data.featured)).slice(0, limit);

export const getTrackWriteups = (items: WriteupEntry[], learningTrack: WriteupEntry['data']['learningTrack']) =>
  sortWriteups(items.filter((item) => item.data.learningTrack === learningTrack));

export const getWriteupPath = (entry: WriteupEntry) =>
  entry.data.learningTrack === 'dreamhack-system-hacking'
    ? `/dreamhack/system-hacking/${entry.slug}`
    : `/pwnable-kr/${entry.slug}`;

export const getCategoryValue = (entry: WriteupEntry) => entry.data.topic;
export const getCategoryLabel = (value: string) => TOPIC_LABELS[value] ?? value;
export const getPlatformLabel = (value: string) => PLATFORM_LABELS[value] ?? value;
export const getDifficultyLabel = (value: string) => DIFFICULTY_LABELS[value] ?? value;
export const getStatusLabel = (value: string) => STATUS_LABELS[value] ?? value;

export const getTaxonomyMap = (items: WriteupEntry[], extractor: (item: WriteupEntry) => string[]) => {
  const map = new Map<string, WriteupEntry[]>();

  for (const item of items) {
    for (const term of extractor(item)) {
      const current = map.get(term) ?? [];
      current.push(item);
      map.set(term, current);
    }
  }

  return [...map.entries()]
    .map(([term, writeups]) => ({ term, writeups: sortWriteups(writeups) }))
    .sort((left, right) => left.term.localeCompare(right.term));
};

export const getTagMap = (items: WriteupEntry[]) => getTaxonomyMap(items, (item) => item.data.tags);
export const getCategoryMap = (items: WriteupEntry[]) => getTaxonomyMap(items, (item) => [getCategoryValue(item)]);

export const getArchiveGroups = (items: WriteupEntry[]) => {
  const groups = new Map<number, WriteupEntry[]>();

  for (const item of sortWriteups(items)) {
    const year = item.data.publishedAt.getFullYear();
    const current = groups.get(year) ?? [];
    current.push(item);
    groups.set(year, current);
  }

  return [...groups.entries()].map(([year, writeups]) => ({ year, writeups }));
};

export const getTrackMeta = (learningTrack: WriteupEntry['data']['learningTrack']) =>
  SITE.tracks.find((track) => track.trackKey === learningTrack);
