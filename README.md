# Abhinanth K K — Software Developer Portfolio

A premium, production-ready portfolio website built with modern technologies to showcase skills, projects, and professional experience.

![Portfolio Preview](public/og-image.png)

## ✨ Features

- **Modern Dark Theme** — Glassmorphism, gradient backgrounds, and blur effects
- **Animated Hero** — Typing effect, particle animation, and mouse movement parallax
- **Interactive Skills** — Categorized skills with filtering and hover animations
- **Project Showcase** — Search and filter projects by technology with beautiful cards
- **Experience Timeline** — Alternating timeline layout with animated entries
- **Resume Viewer** — Embedded PDF viewer with download option
- **Contact Form** — Ready-to-use contact form
- **Command Palette** — Keyboard navigation (⌘K / Ctrl+K)
- **Custom Cursor** — Interactive cursor with hover states
- **Loading Screen** — Animated intro sequence
- **Scroll Animations** — Reveal animations on scroll
- **Scroll Progress Bar** — Visual scroll progress indicator
- **404 Page** — Custom not-found page
- **Fully Responsive** — Mobile-first design
- **SEO Optimized** — OpenGraph, Twitter Cards, sitemap, robots.txt

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 18, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide Icons |
| UI Components | shadcn/ui primitives |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abhinanthkk/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the portfolio.

### Build

```bash
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── abhinanthCV.pdf
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Resume.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── CommandPalette.tsx
│   │       ├── CustomCursor.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── ScrollProgress.tsx
│   │       ├── ScrollToTop.tsx
│   │       └── SectionWrapper.tsx
│   ├── hooks/
│   │   ├── useCommandPalette.ts
│   │   ├── useMousePosition.ts
│   │   ├── useScrollReveal.ts
│   │   └── useTypingEffect.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── data/
│   │   └── resume.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── netlify.toml
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — no configuration needed
4. Deploy!

```bash
# Or via CLI
npm i -g vercel
vercel
```

### Netlify

1. Push to GitHub
2. Visit [netlify.com](https://netlify.com) and import the repository
3. Build settings are in `netlify.toml` — auto-detected
4. Deploy!

```bash
# Or via CLI
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

```bash
# Update vite.config.ts base path first
# vite.config.ts: base: '/portfolio/'

npm run build
npx gh-pages -d dist
```

Or use GitHub Actions:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🔧 Customization

### Update Personal Information

Edit `src/data/resume.ts` to update:
- Name, titles, summary
- Skills and categories
- Projects and descriptions
- Work experience
- Education
- Contact information
- Social links

### Change Colors

Edit `tailwind.config.js` to modify:
- `colors.primary` — Blue accent
- `colors.accent` — Purple accent
- `colors.background` — Dark background

### Add Projects

Add new entries to the `projects` array in `src/data/resume.ts`:

```typescript
{
  id: 'my-new-project',
  name: 'Project Name',
  description: 'Short description...',
  longDescription: 'Detailed description...',
  technologies: ['React', 'Node.js', 'PostgreSQL'],
  keyFeatures: ['Feature 1', 'Feature 2'],
  challenges: ['Challenge 1'],
  impact: 'Impact description',
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...',
}
```

### Add Certifications

Add entries to the `certifications` array in `src/data/resume.ts`:

```typescript
{
  id: 'cert-id',
  name: 'Certification Name',
  issuer: 'Issuing Organization',
  date: '2026',
  credentialUrl: 'https://...',
}
```

## 📄 License

MIT License — feel free to use this template for your own portfolio.

---

Built with ❤️ by Abhinanth K K
