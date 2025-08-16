# 🔒 Security Guidelines for Finance Tracker

## Environment Variables

This project uses environment variables to store sensitive configuration data. **NEVER commit these files to Git:**

- `.env`
- `.env.local`
- `.env.production.local`
- Any file containing actual API keys or secrets

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to Settings → API
   - Copy the Project URL and anon/public key

3. **Update your .env file:**
   ```
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

## Security Checklist

- ✅ `.env` is listed in `.gitignore`
- ✅ Only `.env.example` is committed to Git
- ✅ No hardcoded secrets in source code
- ✅ Supabase Row Level Security (RLS) is enabled
- ✅ Environment variables use `VITE_` prefix for client-side access

## What's Safe to Commit

✅ **Safe:**
- `.env.example` (with placeholder values)
- Source code files
- Configuration files (without secrets)
- Documentation

❌ **NEVER Commit:**
- `.env` (actual environment variables)
- API keys or passwords
- Database connection strings
- Private keys or certificates

## If You Accidentally Commit Secrets

1. **Immediately rotate the exposed credentials**
2. **Remove the file from Git history:**
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch .env' --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push to remove from remote:**
   ```bash
   git push --force-with-lease origin main
   ```

## Production Deployment

For production deployments, set environment variables in your hosting platform:
- **Vercel:** Project Settings → Environment Variables
- **Netlify:** Site Settings → Environment Variables
- **Railway:** Project Settings → Variables
- **Heroku:** Settings → Config Vars
