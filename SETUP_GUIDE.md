# 🚀 Setup Guide - Industrial OPT

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**

Check your versions:
```bash
node --version
npm --version
```

## 📥 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd /workspace
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18.2
- React DOM 18.2
- React Scripts 5.0.1
- Lucide React (icons)
- Recharts (charts)
- Tailwind CSS
- PostCSS & Autoprefixer

### Step 3: Start Development Server
```bash
npm start
```

The application will automatically open in your browser at:
```
http://localhost:3000
```

## 🏗️ Build for Production

Create an optimized production build:
```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## 📂 Project Structure Overview

```
/workspace/
├── public/              # Static files
├── src/
│   ├── components/      # React components (10 files)
│   ├── constants/       # App constants
│   ├── data/           # Sample data
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
├── package.json        # Dependencies
└── ...config files
```

## 🎯 First Run Checklist

After starting the app, you should see:

1. ✅ **Dashboard page** with statistics cards
2. ✅ **Sidebar** with navigation menu
3. ✅ **Blue gradient** theme
4. ✅ **No console errors**

## 🧪 Testing the Application

### Test Dashboard
1. Navigate to Dashboard (default page)
2. Verify stats cards display numbers
3. Check workshop status section

### Test Production Plans
1. Click "Quản lý Kế hoạch Sản xuất"
2. See list of 3 sample plans
3. Click on a plan to view details
4. Test "Tải lên" button (opens modal)

### Test Configurations
1. Click "Quản lý Cấu hình Ràng buộc"
2. See list of 3 configurations
3. Click on a config to view details
4. Test different workshop tabs (GA, Body, Paint, Calendar)

### Test Optimization
1. Click "Quản lý Kế hoạch Tối ưu"
2. See list of optimization jobs
3. Test "Tạo Job mới" button
4. Test "Tính Toán" button on a job
5. Wait 5 seconds for status to change to "Đã Tối Ưu"

### Test Results
1. Click "Đánh giá Kết quả"
2. Select a completed job from dropdown
3. Switch between tabs: Body, Paint, GA, Table, Summary
4. Test model filters on charts
5. Verify charts render correctly

### Test Account
1. Click "Tài khoản"
2. Verify form displays

## 🐛 Troubleshooting

### Issue: npm install fails
**Solution:** 
- Clear npm cache: `npm cache clean --force`
- Delete node_modules: `rm -rf node_modules`
- Retry: `npm install`

### Issue: Port 3000 is already in use
**Solution:**
- Kill the process: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)
- Or use a different port: `PORT=3001 npm start`

### Issue: Tailwind styles not working
**Solution:**
- Verify `tailwind.config.js` exists
- Check `index.css` has Tailwind imports
- Restart dev server

### Issue: Charts not displaying
**Solution:**
- Verify recharts is installed: `npm list recharts`
- Check browser console for errors
- Ensure chart data is not empty

### Issue: Icons not showing
**Solution:**
- Verify lucide-react is installed: `npm list lucide-react`
- Check import statements in components

## 📝 Development Tips

### Hot Reload
- The app supports hot module replacement
- Changes to .jsx files will auto-refresh the browser
- Changes to .css files will update without refresh

### Browser DevTools
- Open DevTools (F12 or Cmd+Option+I)
- Check Console tab for errors
- Use React DevTools extension for debugging

### Code Organization
- Keep components small and focused
- Use props for data passing
- Lift state up to App.jsx when needed
- Extract reusable logic to utils/

### Styling Guidelines
- Use Tailwind utility classes
- Follow existing color scheme:
  - Primary: Blue (#1e40af)
  - Success: Green (#16a34a)
  - Warning: Yellow (#eab308)
  - Danger: Red (#dc2626)

## 🔧 Configuration Files

### package.json
- Lists all dependencies
- Defines npm scripts
- Project metadata

### tailwind.config.js
- Tailwind CSS configuration
- Content paths for purging
- Theme customization

### postcss.config.js
- PostCSS plugins
- Tailwind & Autoprefixer

### .gitignore
- Excludes node_modules
- Excludes build folder
- Excludes environment files

## 📚 Learning Resources

### React
- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Examples](https://tailwindui.com)

### Recharts
- [Recharts Docs](https://recharts.org)
- [Recharts Examples](https://recharts.org/en-US/examples)

### Lucide Icons
- [Icon Search](https://lucide.dev/icons)

## 🚢 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop build folder to netlify.com
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/industrial-opt",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy:
npm run deploy
```

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] `npm install` completed without errors
- [ ] `npm start` launches app successfully
- [ ] Browser opens to http://localhost:3000
- [ ] No console errors in browser
- [ ] Dashboard displays correctly
- [ ] All navigation items work
- [ ] Modals open and close
- [ ] Charts render properly
- [ ] Filters and sorting work
- [ ] Responsive design works (test mobile view)

## 🎉 You're Ready!

The application is now running and ready for development or use.

### Next Steps:
1. Explore all pages and features
2. Review component code
3. Customize as needed
4. Add backend integration (future)
5. Deploy to production (when ready)

## 📞 Support

For issues or questions:
1. Check console for error messages
2. Review component code in `src/components/`
3. Check data in `src/data/sampleData.js`
4. Verify constants in `src/constants/index.js`

Happy coding! 🚀
