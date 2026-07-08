# GUILDMASTER — Next.js Platform

The Guildmaster marketing site rebuilt as a **Next.js 15 (App Router) monolith** — a pixel-faithful port of the original seven static pages, plus a MongoDB-backed **Journal** (blog) and a password-protected **admin console** for managing it. GSAP animation, the custom flight cursor, the particle canvas, and every word of the original copy are preserved.

---

## Stack

| Layer        | Choice                                             |
| ------------ | -------------------------------------------------- |
| Framework    | Next.js 15.1.6 (App Router) · React 19             |
| Styling      | Tailwind CSS 3 (design tokens ported 1:1)          |
| Fonts        | `next/font` — Inter + Playfair Display             |
| Animation    | GSAP 3 + SplitType (centralised in one hook)       |
| Database     | MongoDB via Mongoose 8                              |
| Auth         | Signed JWT (`jose`, HS256) in an httpOnly cookie   |
| Runtime      | Node.js route handlers; Edge middleware for auth   |

---

## Getting started

### 1. Prerequisites
- **Node.js 18.18+** (or 20+ recommended)
- A **MongoDB** connection string (MongoDB Atlas free tier is fine)

### 2. Install
```bash
npm install
```

### 3. Environment
Copy the example file and fill in the values:
```bash
cp .env.example .env.local
```

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `MONGODB_URI`          | Full MongoDB connection string.                                         |
| `MONGODB_DB`           | Database name (optional if included in the URI).                        |
| `ADMIN_PASSWORD`       | The single password that unlocks `/admin`.                              |
| `AUTH_SECRET`          | Long random string used to sign session JWTs. Generate one (below).     |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin, e.g. `https://guildmaster.in` (used for SEO).    |

Generate a strong `AUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run
```bash
npm run dev      # http://localhost:3000
```

### 5. Build & start (production)
```bash
npm run build
npm start
```

---

## The admin console

- Visit **`/admin`**. If you're not signed in, middleware redirects you to **`/admin/login`**.
- Enter `ADMIN_PASSWORD`. A signed, httpOnly session cookie (`gm_session`, 7-day expiry) is set.
- From the console you can **create, edit, and delete** Journal posts. Changes appear on the public **`/blogs`** listing immediately.

### Post fields
- **Title** — headline.
- **Slug** — optional; auto-derived from the title when blank. A live URL preview is shown.
- **Cover image URL** — absolute (`https://…`) or public-relative (`/images/…`).
- **Summary** — an answer-first, ≤320-char blurb. It's reused as the meta description, the JSON-LD `description`, and the on-page AEO snippet, so write it to stand alone.
- **Content** — the article body as **HTML** (`h2`, `h3`, `p`, `ul`/`ol`, `blockquote`, `img`, `code`, `pre`, `hr`, links). Styling is handled by the scoped `.article-body` rules in `globals.css`.

---

## Project structure

```
app/
  layout.js              Root layout: fonts, global metadata, Organization JSON-LD, chrome
  page.js                Home (hero + particle canvas + tech slider + testimonials)
  about/ boon/ joey/     Aircraft & company pages (verbatim source copy)
  contact/ customer/ investors/
  blogs/                 Public Journal listing (Server Component)
  blogs/[slug]/          Article page (async params, Article JSON-LD, AEO summary)
  admin/                 Console (nested layout restores native cursor + noindex)
  admin/login/           Password gate
  api/blogs/             GET (list) · POST (create, admin)
  api/blogs/[id]/        GET · PUT · DELETE (admin)
  api/admin/login/       Sets the session cookie
  api/admin/logout/      Clears it
  sitemap.js robots.js   SEO route handlers (blog slugs included dynamically)
  globals.css            Ported source styles + a11y + .article-body + .admin-shell
components/
  SiteChrome.jsx         Cursor + preloader + nav + smooth-wrapper (skipped on /admin)
  Navbar.jsx Footer.jsx FlightCursor.jsx Preloader.jsx ParticleCanvas.jsx
  AnimationController.jsx
  admin/                 LoginForm · BlogForm · AdminDashboard
hooks/
  usePageAnimations.js   The whole GSAP engine (intro, cursor, scroll triggers)
lib/
  mongodb.js             Cached Mongoose connection (pooled)
  auth.js                jose JWT + password check (Edge-safe)
  session.js             Server-only session helpers (next/headers)
  blogs.js               Read-side data access for Server Components
  slug.js seo.js         Slugify + metadata / JSON-LD factories
models/Blog.js           Mongoose schema (unique slug, timestamps)
middleware.js            Protects /admin on the Edge
```

---

## Notes on the port

- **Zero design variance.** Colours, gradients, fonts, and markup mirror the source. Plain `<img>` is used throughout (not `next/image`) to guarantee pixel-for-pixel parity with the original layout.
- **Hero copy restored.** The live `index.html` shipped with empty hero text; the intended wording ("GUILDMASTER" / "Aviation Excellence" / the two CTAs) was recovered from the site's own `fix_hero.js` build script and restored.
- **ScrollSmoother.** The source referenced `#smooth-wrapper` / `#smooth-content` but never loaded the plugin. Those wrappers are kept (inert) so native scrolling behaves exactly as it did.
- **Dead buttons preserved faithfully.** Buttons that had no click behaviour in the source (e.g. "Download Brochure") remain non-interactive by design; wire them to real destinations whenever you're ready.
- **Preserved source quirk.** The Boon's spec panel lists a 450 kg payload while its comparison table shows 400 kg — reproduced as-is rather than silently "fixed".

---

## Deployment

Deploy anywhere that runs Node.js (Vercel recommended). Set the five environment variables in your host's dashboard, point `NEXT_PUBLIC_SITE_URL` at the production origin, and ensure your MongoDB instance allows connections from the deployment. `npm run build` then `npm start` (or the platform's managed build) is all that's required.

© 2026 Guildmaster — art of the aircraft.
