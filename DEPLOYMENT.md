# ToyBox Egypt - Deployment Guide

## Pre-Deployment Checklist

✅ All features implemented and tested
✅ Mobile responsive design
✅ SEO meta tags configured
✅ Routing configuration for SPA
✅ Build script working
✅ No TypeScript errors
✅ Environment variables documented

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Test Production Build Locally

```bash
npm run preview
```

Visit http://localhost:4173 to test the production build.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel will auto-detect Vite and deploy

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

The `vercel.json` file is already configured for SPA routing.

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

The `public/_redirects` file is already configured for SPA routing.

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Update vite.config.ts base path:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Custom Server (VPS/Cloud)

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your server

3. Configure your web server (Nginx example):
```nginx
server {
    listen 80;
    server_name toyboxegypt.com;
    root /var/www/toybox/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

If you need environment variables in production:

1. Create `.env.production` file (don't commit this!)
2. Add your production values
3. In your deployment platform, add environment variables in their dashboard

Example variables:
- `VITE_API_KEY` - API keys
- `VITE_GA_TRACKING_ID` - Google Analytics
- `VITE_CONTACT_EMAIL` - Contact email

## Post-Deployment

### 1. Test All Features
- [ ] Homepage loads correctly
- [ ] Navigation works (all pages)
- [ ] Product browsing and filtering
- [ ] AI Recommendations chat
- [ ] Cart functionality
- [ ] Checkout flow
- [ ] Mobile responsiveness
- [ ] Language switching (EN/AR)

### 2. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags are working
- [ ] Test Open Graph tags (Facebook debugger)
- [ ] Test Twitter cards

### 3. Performance
- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify images are optimized
- [ ] Test on slow connections

### 4. Analytics (Optional)
- [ ] Set up Google Analytics
- [ ] Configure conversion tracking
- [ ] Set up error monitoring (Sentry)

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records as instructed

## SSL Certificate

Both Vercel and Netlify provide free SSL certificates automatically.

For custom servers, use [Let's Encrypt](https://letsencrypt.org/).

## Monitoring

Consider setting up:
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Analytics**: Google Analytics, Plausible

## Troubleshooting

### Routes not working (404 errors)
- Verify `_redirects` (Netlify) or `vercel.json` (Vercel) is present
- Check server configuration for SPA routing

### Build fails
- Run `npm run build` locally to debug
- Check for TypeScript errors: `npm run lint`
- Verify all dependencies are in package.json

### Images not loading
- Ensure images are in `public` folder or imported correctly
- Check image paths are relative

## Support

For deployment issues, check:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
