# 📦 GitHub Repository Setup Guide

## Step 1: Create GitHub Repository (2 minutes)

### On GitHub.com:

1. Go to **[github.com](https://github.com)** and log in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in the details:
   - **Repository name**: `toybox-egypt` (or any name you prefer)
   - **Description**: `ToyBox Egypt - Kids Toy Store with AI Recommendations`
   - **Visibility**: Choose **Private** (recommended for private deployment)
   - **DO NOT** check "Initialize with README" (we already have files)
   - **DO NOT** add .gitignore or license (we already have them)
4. Click **"Create repository"**
5. **Copy the repository URL** shown (looks like: `https://github.com/YOUR_USERNAME/toybox-egypt.git`)

---

## Step 2: Initialize Git Locally (1 minute)

Open your terminal in the project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - ToyBox Egypt ready for deployment"

# Rename branch to main
git branch -M main
```

---

## Step 3: Connect to GitHub (1 minute)

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:

```bash
# Add GitHub remote (use the URL you copied from Step 1)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/john/toybox-egypt.git
git push -u origin main
```

---

## Step 4: Verify Upload

1. Go back to your GitHub repository page
2. Refresh the page
3. You should see all your files uploaded!

---

## 🎉 Done! Now Deploy to Vercel

Once your code is on GitHub, follow these steps:

1. Go to **[vercel.com](https://vercel.com)**
2. Sign in with your GitHub account
3. Click **"Add New"** → **"Project"**
4. Select your `toybox-egypt` repository
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment

---

## 🔐 After Deployment - Change Password!

**IMPORTANT**: Change the default password before sharing:

1. Edit `public/auth.html` line 127
2. Change `'toybox2024'` to your secure password
3. Commit and push:
   ```bash
   git add public/auth.html
   git commit -m "Update password"
   git push
   ```
4. Vercel will auto-redeploy with new password

---

## Troubleshooting

### "Permission denied" error when pushing?
You may need to authenticate with GitHub:
- Use GitHub Desktop app (easier)
- Or set up SSH keys: [docs.github.com/authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Or use Personal Access Token: [docs.github.com/authentication/tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

### "Repository not found" error?
- Double-check the repository URL
- Make sure you're logged into the correct GitHub account
- Verify the repository exists on GitHub

### Files not showing on GitHub?
- Check if `.gitignore` is blocking important files
- Run `git status` to see what's being tracked
- Make sure you ran `git add .` before committing

---

## Quick Command Reference

```bash
# Check git status
git status

# See what will be committed
git diff

# Add specific files
git add filename.txt

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull
```

---

## What Gets Uploaded

✅ All source code (`src/` folder)  
✅ Public assets (`public/` folder)  
✅ Configuration files  
✅ Documentation files  
✅ Package files  

❌ `node_modules/` (excluded by .gitignore)  
❌ `dist/` (excluded by .gitignore)  
❌ `.env` files (excluded by .gitignore)  

---

## Ready to Start?

Follow the steps above in order:
1. ✅ Create GitHub repository
2. ✅ Initialize git locally
3. ✅ Connect to GitHub
4. ✅ Push code
5. ✅ Deploy on Vercel
6. ✅ Change password
7. ✅ Share with users!

Good luck! 🚀
