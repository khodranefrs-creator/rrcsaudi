# Production Deployment Guide

## Prerequisites

- Node.js 20+
- A PostgreSQL database (recommended: [Supabase](https://supabase.com) free tier, [Neon](https://neon.tech), or [Aiven](https://aiven.io))
- A [Vercel](https://vercel.com) account (or any Node.js host)

---

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
# PostgreSQL connection string (Prisma format)
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# NextAuth v5 — generate with: openssl rand -base64 32
NEXTAUTH_SECRET="generate-a-strong-random-secret"

# Set to your production URL once deployed
NEXTAUTH_URL="https://rrcsaudi.vercel.app"
```

On Vercel, add these in **Settings > Environment Variables**.

---

## 2. Database Setup

### Option A: Supabase (recommended)

1. Create a Supabase project
2. Go to **Project Settings > Database > Connection string**
3. Copy the **URI** (under "Node.js" / Prisma format)
4. Use it as `DATABASE_URL` — if prompted for connection pooling, use the **Session** (not Transaction) pooler port (6543)

### Option B: Neon

1. Create a project
2. Copy the connection string from the dashboard
3. Use `?sslmode=require` at the end if required

---

## 3. Run Migrations

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Apply all pending migrations to create tables, enums, indexes, and FKs
npx prisma migrate deploy
```

> **Note:** `prisma migrate deploy` is safe for production (non-destructive).  
> If you're starting from scratch locally, use `npx prisma migrate dev` instead.

---

## 4. Seed Initial Data (Optional)

```bash
npm run db:seed
```

This creates sample content (projects, services, partners, blog posts) in **unpublished** state.  
You can publish items through the admin panel once logged in.

---

## 5. Create an Admin User

```bash
npm run create-admin
```

You will be prompted for:
- **Email** (will be validated)
- **Password** (min 8 characters, hashed with bcrypt cost 12)
- **Role** (defaults to `SUPER_ADMIN`)

The user is stored directly in the database and can log in via the `/en/admin/login` page using credentials (email + password) through NextAuth's Credentials provider.

---

## 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard.

**vercel.json** (already configured):
```json
{
  "version": 2,
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

After deploying, set all environment variables in the Vercel dashboard.

---

## 7. Post-Deployment Checklist

- [ ] **Admin login** — visit `/en/admin/login` and sign in with the admin credentials
- [ ] **Dashboard** — confirms all 4 API endpoints return data (projects, services, partners, inquiries)
- [ ] **Sitemap** — visit `/sitemap.xml`
- [ ] **Robots** — visit `/robots.txt`
- [ ] **JSON-LD structured data** — view page source on any locale route, search for `RealEstateBusiness`
- [ ] **OG image** — share any page in a social media debugger to verify `/images/og-default.svg` renders
- [ ] **Favicon** — verify `/favicon.svg` shows in browser tab
- [ ] **Image uploads** — configure Supabase Storage, S3, or Cloudinary and update image URLs in admin forms
- [ ] **Lighthouse** — run Lighthouse audit on `/en`, `/en/about`, `/en/projects`, `/en/contact`

---

## 8. Image Management

The site uses SVG placeholders and CSS fallbacks for images. For production:

1. Set up a file storage bucket (Supabase Storage, AWS S3, or Cloudinary)
2. Replace placeholder SVGs in `public/images/projects/` and `public/images/partners/` with real images
3. For dynamic uploads, add a file upload field to the admin forms (currently disabled — marked with `disabled` prop)

---

## 9. Maintenance

```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Create additional admin users
npm run create-admin

# View current migration status
npx prisma migrate status
```

---

## 10. Troubleshooting

| Problem | Solution |
|---------|----------|
| `prisma: No database found` | Verify `DATABASE_URL` is set and the database exists |
| NextAuth sign-in fails | Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL` match |
| Admin login returns 401 | Run `npm run create-admin` to ensure a user exists |
| Images not loading | Placeholder SVGs are at `public/images/` — replace with real files |
| Build fails on Vercel | Ensure `postinstall: prisma generate` is in `package.json` (it is) |
