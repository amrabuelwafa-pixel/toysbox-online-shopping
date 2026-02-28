# 🔒 Private Deployment - Quick Setup

Your ToyBox Egypt website is now configured for private access with password protection!

## ✅ What's Been Set Up

1. **Password-protected login page** (`public/auth.html`)
2. **Authentication check** in main app
3. **Session management** (24-hour validity)
4. **Beautiful login UI** with animations

## 🔐 Change Your Password

**IMPORTANT:** Change the default password before deploying!

1. Open `public/auth.html`
2. Find this line (around line 127):
   ```javascript
   const correctPassword = 'toybox2024';
   ```
3. Change `'toybox2024'` to your own password:
   ```javascript
   const correctPassword = 'YOUR_SECURE_PASSWORD';
   ```

## 🚀 Deploy Options

### Option 1: Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Private deployment ready"
git push

# 2. Go to vercel.com
# 3. Import your repository
# 4. Deploy!
```

Your site will be at: `https://your-project.vercel.app`

### Option 2: Deploy to Netlify

```bash
# 1. Push to GitHub
git add .
git commit -m "Private deployment ready"
git push

# 2. Go to netlify.com
# 3. Import your repository
# 4. Deploy!
```

Your site will be at: `https://your-project.netlify.app`

### Option 3: Run Locally (Most Private)

```bash
# Build the project
npm run build

# Run it
npm run preview
```

Access at: `http://localhost:4173`

## 📱 How It Works

1. **User visits your site** → Redirected to `/auth.html`
2. **Enters password** → If correct, authenticated for 24 hours
3. **Can browse freely** → No need to re-enter password
4. **Session expires** → After 24 hours, must log in again

## 🔒 Security Features

- ✅ Password protection on all pages
- ✅ Session expires after 24 hours
- ✅ Beautiful, mobile-friendly login page
- ✅ Automatic redirect if not authenticated
- ✅ Session stored securely in browser

## ⚠️ Security Notes

**This is basic password protection suitable for:**
- Personal projects
- Sharing with friends/family
- Internal testing
- Portfolio previews

**NOT suitable for:**
- Sensitive data
- Financial information
- User accounts with personal data

For enterprise-level security, see `PRIVATE-DEPLOYMENT.md` for advanced options.

## 🎨 Customize Login Page

Edit `public/auth.html` to customize:
- Colors (line 18-19: gradient colors)
- Logo (line 103: emoji or image)
- Title (line 104: "ToyBox Egypt")
- Subtitle (line 105: description)

## 📤 Share Access

1. Deploy your site
2. Share the URL with authorized users
3. Share the password separately (via WhatsApp, email, etc.)

Example:
```
URL: https://toybox-egypt.vercel.app
Password: [your password]
```

## 🧪 Test Before Deploying

```bash
# Build
npm run build

# Test locally
npm run preview

# Visit http://localhost:4173
# Try logging in with your password
```

## 🔄 Remove Password Protection

If you want to make it public later:

1. Delete `public/auth.html`
2. Restore `src/App.tsx` to original (remove authentication check)
3. Redeploy

## 💡 Tips

- Use a strong password (mix of letters, numbers, symbols)
- Don't share password in public channels
- Change password periodically
- Keep a backup of your password
- Test login before sharing with others

## 🆘 Troubleshooting

**Can't log in:**
- Check password is correct (case-sensitive)
- Clear browser cache and try again
- Check browser console for errors

**Redirects to auth page repeatedly:**
- Check sessionStorage is enabled in browser
- Try incognito/private mode
- Check if 24 hours have passed

**Need help?**
See `PRIVATE-DEPLOYMENT.md` for more options and advanced security.

---

## ✅ Ready to Deploy!

Your private ToyBox Egypt website is ready. Just:
1. Change the password in `public/auth.html`
2. Deploy to Vercel or Netlify
3. Share URL and password with authorized users

🎉 Enjoy your private toy store!
