import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
};

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const title = getArgValue('--title');
const platform = getArgValue('--platform');
const topic = getArgValue('--topic') ?? 'pwn';
const difficulty = getArgValue('--difficulty') ?? 'medium';

if (!title || !platform) {
  console.error('Usage: npm run new:writeup -- --title "Challenge Name" --platform dreamhack|pwnable-kr [--topic pwn] [--difficulty medium]');
  process.exit(1);
}

if (!['dreamhack', 'pwnable-kr'].includes(platform)) {
  console.error('`--platform` must be either `dreamhack` or `pwnable-kr`.');
  process.exit(1);
}

const learningTrack = platform === 'dreamhack' ? 'dreamhack-system-hacking' : 'pwnable-kr';
const slug = slugify(title);
const today = new Date().toISOString().slice(0, 10);
const canonicalPath = platform === 'dreamhack' ? `/dreamhack/system-hacking/${slug}` : `/pwnable-kr/${slug}`;

const templatePath = path.join(process.cwd(), 'templates', 'writeup-template.mdx');
const targetDir = path.join(process.cwd(), 'src', 'content', 'writeups', platform);
const targetFilePath = path.join(targetDir, `${slug}.mdx`);

const replacements = {
  '__TITLE__': title,
  '__SLUG__': slug,
  '__DATE__': today,
  '__PLATFORM__': platform,
  '__TRACK__': learningTrack,
  '__TOPIC__': topic,
  '__DIFFICULTY__': difficulty,
  '__CANONICAL_PATH__': canonicalPath,
  '__CHALLENGE_NAME__': title,
  '__TARGET_TYPE__': platform === 'dreamhack' ? 'ELF 64-bit Linux challenge binary' : 'Linux challenge binary',
  '__SUMMARY__': 'Replace this with a one-sentence summary of the solve path, the main primitive, and the final exploit idea.',
  '__DESCRIPTION__': 'Replace this with a concrete one-sentence description of the challenge, the exploit surface, and the skill being practiced.',
  '__SEO_TITLE__': `${title} Writeup`,
  '__SEO_DESCRIPTION__': 'Replace this with a search-friendly summary of the challenge, technique, and final outcome.',
  '__TAG_1__': platform === 'dreamhack' ? 'stack-overflow' : 'pwnable-kr',
  '__TAG_2__': topic === 'pwn' ? 'pwntools' : topic,
  '__TAG_3__': 'debugging',
  '__TECHNIQUE__': topic === 'reversing' ? 'function-tracing' : 'payload-construction',
  '__TOOL_1__': 'gdb',
  '__TOOL_2__': 'python'
};

const template = await fs.readFile(templatePath, 'utf8');
const content = Object.entries(replacements).reduce(
  (result, [token, value]) => result.replaceAll(token, value),
  template
);

await fs.mkdir(targetDir, { recursive: true });

try {
  await fs.access(targetFilePath);
  console.error(`File already exists: ${targetFilePath}`);
  process.exit(1);
} catch {
  await fs.writeFile(targetFilePath, content, 'utf8');
}

console.log(`Created ${path.relative(process.cwd(), targetFilePath)}`);
console.log(`Canonical path: ${canonicalPath}`);
