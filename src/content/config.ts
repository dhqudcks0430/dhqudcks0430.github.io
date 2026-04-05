import { defineCollection, z } from 'astro:content';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const normalizeTerm = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '-');

const hasUniqueNormalizedTerms = (values: string[]) => {
  const normalized = values.map(normalizeTerm);
  return new Set(normalized).size === normalized.length;
};

const tagSchema = z
  .array(z.string().regex(slugPattern, 'Use lower-kebab-case tags only.'))
  .min(3, 'Add at least three tags.')
  .max(8, 'Use at most eight tags.')
  .refine(hasUniqueNormalizedTerms, 'Tags must be unique after normalization.');

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(3),
    description: z.string().min(16),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    featuredWeight: z.number().int().positive().optional(),
    platform: z.enum(['dreamhack', 'pwnable-kr']),
    learningTrack: z.enum(['dreamhack-system-hacking', 'pwnable-kr']),
    topic: z.enum(['system-hacking', 'pwn', 'reversing', 'web-security', 'crypto', 'forensics', 'misc', 'tooling']),
    difficulty: z.enum(['beginner', 'easy', 'medium', 'hard', 'insane', 'unknown']),
    status: z.enum(['planned', 'in-progress', 'solved', 'reviewed']),
    challengeName: z.string().min(2),
    targetType: z.string().min(2),
    operatingSystem: z.string().min(2),
    tags: tagSchema,
    techniques: z.array(z.string().min(2)).min(1),
    tools: z.array(z.string().min(2)).min(1),
    summary: z.string().min(24),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalPath: z.string().regex(/^\//, 'canonicalPath must start with /.').optional()
  })
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(12),
    draft: z.boolean().default(false),
    pageKind: z.enum(['home', 'about', 'contact']),
    navLabel: z.string().min(2),
    navOrder: z.number().int().nonnegative(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalPath: z.string().regex(/^\//, 'canonicalPath must start with /.').optional()
  })
});

export const collections = {
  writeups,
  pages
};
