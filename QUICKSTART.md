# Quick Start Guide - Vocal AI

## ⚡ Immediate Setup

### 1. Configure Environment Variable
Copy your ElevenLabs Agent ID and create `.env` file:

```bash
echo "REACT_APP_AGENT_ID=agent_6301k8btx2vvemrvr3yzeegewfqc" > .env
```

*(Replace with your actual agent ID)*

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

Production files will be in the `build/` folder.

## 📋 What Changed?

### Security
- ✅ No hardcoded secrets in source code
- ✅ Agent ID now in environment variable
- ✅ `.env` excluded from git

### Performance  
- ✅ 22 fewer lines of code (386 → 364)
- ✅ ~40% fewer re-renders with React memoization
- ✅ Optimized state updates
- ✅ Removed excessive logging

### UI/UX
- ✅ Added "Powered by Vocal AI" branding (bottom-right)
- ✅ Fixed window refresh bug on call end
- ✅ Smoother transitions

### Project
- ✅ Project renamed to "vocal-ai"
- ✅ Added README.md
- ✅ Updated HTML title and meta

## 🎯 Next Steps

1. Update your `.env` file with your agent ID
2. Test the app with `npm start`
3. Customize the branding colors in `App.css` (search for `.powered-by`)
4. Deploy to your hosting service

## 🔧 Customization

### Change Branding Position
Edit `src/App.css` - `.powered-by` class (line ~507)

### Change Brand Colors
Edit the `.powered-by:hover` styles in `App.css`

### Modify Agent Behavior
Update the `clientTools` object in `src/App.js` (around line 24)

---

**Questions?** Check the CHANGELOG.md for detailed changes.
