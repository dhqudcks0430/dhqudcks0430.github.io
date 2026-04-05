# dhqudcks0430 Notes

Static Astro portfolio/blog for cybersecurity learning, system-hacking writeups, and pwnable practice.

## Stack

- Astro 5
- MDX content collections
- GitHub Pages deployment via GitHub Actions
- Static taxonomy/archive generation

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run check
npm run build
```

## Writeup workflow

Create a new draft writeup from the template:

```bash
npm run new:writeup -- --title "unlink practice" --platform pwnable-kr --topic pwn --difficulty hard
```

This creates a draft MDX file under:

- `src/content/writeups/dreamhack/`
- or `src/content/writeups/pwnable-kr/`

Then:

1. Fill the frontmatter with real tags, techniques, tools, and SEO text.
2. Replace template prose with your actual notes.
3. Keep `draft: true` until the post is ready to publish.
4. Switch `status` to `solved` or `reviewed` when the writeup is complete.

Template source:

- `templates/writeup-template.mdx`

## Content structure

- `src/content/pages/` → static top-level pages
- `src/content/writeups/dreamhack/` → DreamHack System Hacking posts
- `src/content/writeups/pwnable-kr/` → pwnable.kr posts
- `src/content/config.ts` → content collection schema

## GitHub Pages deployment

The workflow is already defined in:

- `.github/workflows/deploy.yml`

To deploy successfully on GitHub:

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Keep the default branch aligned with the workflow trigger (`master` or `main`).
4. The Astro config automatically computes `site` and `base` from `GITHUB_REPOSITORY` for project pages.

### Deployment notes

- User Pages repo (`username.github.io`) → base path resolves to `/`
- Project Pages repo (`repo-name`) → base path resolves to `/<repo-name>`
- `public/.nojekyll` is included for GitHub Pages compatibility

## Next recommended content work

- Replace the remaining sample-like DreamHack posts with your real writeups
- Add screenshots, debugger notes, or exploit snippets where useful
- Publish the current draft only after the solve path is stable and reproducible
