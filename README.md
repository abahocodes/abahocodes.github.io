# Abaho Katabarwa — Portfolio (Astro + Tailwind)

## Setup

```bash
npm install
npm run dev       # compiles resume PDF, then starts dev server → http://localhost:4321
npm run build     # compiles resume PDF, then builds static site → ./dist/
npm run preview   # preview the production build locally
```

## Resume PDF Build

`resume/main.tex` is the LaTeX source for your resume. It is automatically compiled
to `public/resume.pdf` before every `dev` and `build` via the `pre*` lifecycle hooks.

```
resume/main.tex   ← edit your resume here
      ↓  (pdflatex, run by scripts/build-resume.mjs)
public/resume.pdf ← served at /resume.pdf and linked from the Download button
```

**Requires pdflatex** on your PATH. If it's missing the build script warns and
continues gracefully — the rest of the site still builds fine.

```bash
brew install --cask basictex   # macOS
sudo apt install texlive-latex-base  # Ubuntu/Debian
```

To compile the resume without running the full build:
```bash
npm run build:resume
```

## Project Structure

```
portfolio/
├── resume/
│   └── main.tex                  # ← LaTeX resume source
├── scripts/
│   └── build-resume.mjs          # Compiles main.tex → public/resume.pdf
├── public/
│   ├── photo.jpg                 # Drop your profile photo here
│   ├── resume.pdf                # Auto-generated — do not edit manually
│   └── favicon.ico
└── src/
    ├── layouts/
    │   └── Layout.astro          # HTML shell, imports global CSS
    ├── pages/
    │   └── index.astro           # Page structure only — no hardcoded content
    ├── components/
    │   ├── Nav.astro
    │   ├── SectionHeader.astro
    │   ├── ExperienceItem.astro
    │   ├── ProjectCard.astro
│   ├── ResumeViewer.astro
│   ├── ObfuscatedEmail.astro
│   └── ObfuscatedPhone.astro
    ├── data/                     # ← ALL content lives here
    │   ├── person.json           # Name, tagline, location, email, bio paragraphs
    │   ├── socials.json          # Social/contact links (used in 4 places automatically)
    │   ├── hero-stats.json       # Right-column stats in the hero section
    │   ├── about-facts.json      # Key/value rows in the About section
    │   ├── education.json        # Education entries
    │   ├── experience.json       # Work history
    │   ├── projects.json         # Projects
    │   └── skills.json           # Skill groups and tags
    └── styles/
        └── global.css            # Font import + fade-in animation only
```

## Updating Content

| What to change              | File to edit                    |
|-----------------------------|---------------------------------|
| Add a social media link     | `src/data/socials.json`         |
| Update name / bio / email   | `src/data/person.json`          |
| Add/edit a job              | `src/data/experience.json`      |
| Add/edit a project          | `src/data/projects.json`        |
| Edit skills                 | `src/data/skills.json`          |
| Edit education              | `src/data/education.json`       |
| Edit hero sidebar stats     | `src/data/hero-stats.json`      |
| Edit about facts            | `src/data/about-facts.json`     |
| Edit resume content         | `resume/main.tex`               |

**Adding a social link** is one JSON object in `socials.json` — it automatically
appears in the About facts panel, the Contact section buttons, and the footer.

## Design Tokens (tailwind.config.mjs)

| Token           | Value     | Usage              |
|-----------------|-----------|--------------------|
| `site-bg`       | `#0e0e0e` | Page background    |
| `site-bg2`      | `#141414` | Card backgrounds   |
| `site-bg3`      | `#1a1a1a` | Tag backgrounds    |
| `site-border`   | `#2a2a2a` | All borders        |
| `site-text`     | `#e8e4dc` | Primary text       |
| `site-muted`    | `#7a7570` | Secondary text     |
| `site-accent`   | `#c9a96e` | Gold accent        |
| `site-accent2`  | `#8fb8a0` | Green accent       |

## Deploying

- **GitHub Pages**: use the official Astro GitHub Actions workflow
- **Netlify / Vercel**: build command `npm run build`, output dir `dist`
