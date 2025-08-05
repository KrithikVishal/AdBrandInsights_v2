# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

## ⚡ Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5000`

## 🎯 What You Can Do Right Now

### 📊 Explore the Dashboard
- **Overview Tab**: View real-time analytics and performance metrics
- **Campaigns Tab**: Manage and track advertising campaigns
- **Audience Tab**: Analyze audience demographics and growth
- **Creative Tab**: Monitor creative asset performance
- **Conversion Tab**: Track conversion funnels and revenue

### 📤 Test Export Functionality
1. Navigate to any tab
2. Click the **"Export Report"** button in the top-right corner
3. Choose your format: **CSV**, **Excel**, or **PDF**
4. Check your downloads folder for the exported file

### 🎨 Creative Assets (Creative Tab)
- Click **"View"** to see full-size previews with detailed metrics
- Click **"Download"** to download individual creative assets

## 📁 Sample Data Included
- **5 Sample Campaigns** with realistic performance metrics
- **Daily Audience Data** with growth and engagement rates
- **5 Creative Assets** with performance analytics
- **Conversion Data** with revenue and channel tracking
- **Dashboard Metrics** with KPIs and insights

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Utilities
npm run check        # Type checking
npm run db:push      # Database operations
```

## 🌐 Access Points
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api/*

## 🆘 Troubleshooting

### Server Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Export Not Working
- Check browser console for errors
- Ensure all export libraries are installed
- Try a different browser if issues persist

## 📞 Need Help?
- Check the main [README.md](README.md) for detailed documentation
- Review the console for error messages
- Ensure all prerequisites are met

---

**🎉 You're all set! The application is running at http://localhost:5000** 