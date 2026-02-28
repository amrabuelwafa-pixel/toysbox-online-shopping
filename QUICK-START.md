# 🚀 Quick Start - Deploy in 5 Minutes

## Option 1: Deploy to Vercel (Easiest)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select your repository
   - Click "Deploy"

3. **Done!** 🎉
   - Your site will be live in ~2 minutes
   - You'll get a URL like: `toybox-egypt.vercel.app`

## Option 2: Deploy to Netlify

1. **Push to GitHub** (if not already done)

2. **Go to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build settings are auto-detected
   - Click "Deploy"

3. **Done!** 🎉
   - Your site will be live in ~2 minutes
   - You'll get a URL like: `toybox-egypt.netlify.app`

## Test Before Deploying

```bash
# Build for production
npm run build

# Test the production build
npm run preview
```

Visit http://localhost:4173 to test.

## What's Already Configured

✅ Build scripts
✅ SPA routing (vercel.json & _redirects)
✅ SEO meta tags
✅ Mobile responsive
✅ No errors

## After Deployment

1. Test your live site
2. (Optional) Add custom domain in platform settings
3. Share your site! 🎉

## Need Help?

See `DEPLOYMENT.md` for detailed instructions.
