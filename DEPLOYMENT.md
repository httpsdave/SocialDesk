# SocialDesk - Deployment Guide

## 📋 Prerequisites

Before deploying, ensure you have:
- GitHub account
- Vercel account (free tier works great)
- Git installed on your machine

---

## 🚀 Part 1: Push to GitHub

### Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `SocialDesk` (or your preferred name)
   - **Description**: "Social media management platform"
   - **Visibility**: Public or Private (your choice)
   - **⚠️ DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

GitHub will show you a page with commands. Since we already initialized git, use these commands:

```powershell
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/SocialDesk.git

# Rename branch to main (if not already)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Example** (replace with your actual username):
```powershell
git remote add origin https://github.com/johndoe/SocialDesk.git
git branch -M main
git push -u origin main
```

You'll be prompted to authenticate with GitHub. Once done, your code will be pushed!

---

## 🌐 Part 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Sign Up"** or **"Log In"**
   - Choose **"Continue with GitHub"** for easy integration

2. **Import Your Repository**
   - Click **"Add New..."** → **"Project"**
   - Authorize Vercel to access your GitHub repositories
   - Find and select your **SocialDesk** repository
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Vercel should auto-detect **Vite**
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes for the build to complete
   - You'll get a live URL like: `https://social-desk-abc123.vercel.app`

5. **View Your Site**
   - Click **"Visit"** or the URL to see your deployed app!
   - Every push to `main` branch will auto-deploy

### Option B: Deploy via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - What's your project's name? SocialDesk
# - In which directory is your code located? ./
# - Auto-detected settings? Yes

# Production deployment
vercel --prod
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Login page loads at `/`
- [ ] You can click "Login" and navigate to dashboard at `/app`
- [ ] Sidebar navigation works (Dashboard, Schedule, Analytics)
- [ ] All charts render correctly
- [ ] Mobile responsive menu works
- [ ] All modals open and close properly
- [ ] Scheduled posts can be created and deleted
- [ ] Profile and Settings pages load

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your domain name
3. Follow Vercel's DNS configuration instructions
4. Once DNS propagates (up to 24 hours), your app will be live on your custom domain

**Example domains**:
- `socialdesk.com`
- `myapp.socialdesk.com`
- `app.yourdomain.com`

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes to your code
# Stage changes
git add .

# Commit changes
git commit -m "Your update message"

# Push to GitHub (triggers auto-deployment)
git push
```

Your site will rebuild and redeploy automatically in 1-2 minutes!

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Issue**: Build command fails  
**Solution**: Check that all dependencies are in `package.json`:
```powershell
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Routes Don't Work After Refresh

**Issue**: Refreshing `/app/schedule` shows 404  
**Solution**: Vercel handles this automatically for Vite, but if needed, add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Charts Don't Render

**Issue**: Recharts charts not displaying  
**Solution**: Ensure `recharts` is in dependencies, not devDependencies

### Styles Not Loading

**Issue**: Tailwind CSS not working  
**Solution**: Check that `postcss.config.js` and `tailwind.config.js` are in root

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard Features

- **Analytics**: View page views and performance
- **Deployments**: See history of all deployments
- **Logs**: Check build and runtime logs
- **Environment Variables**: Add API keys (for future backend)

### Performance

- Check your deployed site at [PageSpeed Insights](https://pagespeed.web.dev/)
- Vercel provides automatic performance optimization

---

## 🔐 Environment Variables (Future Use)

When you add backend functionality, you can add environment variables:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add variables like:
   - `VITE_API_URL`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_OAUTH_CLIENT_ID`

Variables prefixed with `VITE_` are exposed to the frontend.

---

## 📝 Quick Command Reference

```powershell
# Local development
npm install          # Install dependencies
npm run dev         # Start dev server (localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build

# Git commands
git status          # Check status
git add .           # Stage all changes
git commit -m "message"  # Commit changes
git push            # Push to GitHub (triggers Vercel deploy)

# Vercel CLI
vercel              # Deploy preview
vercel --prod       # Deploy to production
vercel logs         # View logs
```

---

## 🎉 Success!

Your SocialDesk app is now live! Share your deployment URL:

**Your Live URL**: `https://your-project.vercel.app`

---

## Next Steps

1. ✅ Test all routes and functionality
2. ✅ Share the link and get feedback
3. ⏭️ Plan backend integration (Firebase, Supabase, etc.)
4. ⏭️ Add real authentication
5. ⏭️ Integrate social media APIs
6. ⏭️ Add database for post persistence

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

Happy deploying! 🚀
