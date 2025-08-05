# AdBrandInsights - Advertising Analytics Dashboard

A comprehensive advertising analytics dashboard built with React, TypeScript, and Express. This application provides real-time insights into advertising campaigns, audience analytics, creative performance, and conversion tracking.

## 🚀 Features

### 📊 Dashboard Overview
- Real-time analytics and performance metrics
- Revenue, spend, and conversion tracking
- Active campaign monitoring
- AI-powered insights and recommendations

### 🎯 Campaign Management
- Campaign creation and management
- Performance tracking across platforms
- Budget and spend monitoring
- ROI and ROAS calculations

### 👥 Audience Intelligence
- Audience growth and demographic analysis
- Geographic distribution insights
- Device and platform analytics
- Engagement rate tracking

### 🎨 Creative Performance
- Creative asset management
- Performance analytics for images, videos, and carousels
- A/B testing insights
- Engagement and CTR tracking

### 💰 Conversion Tracking
- Conversion funnel analysis
- Revenue attribution
- Channel performance comparison
- Cost per conversion optimization

### 📤 Export Functionality
- **CSV Export**: Comma-separated values for spreadsheet compatibility
- **Excel Export**: Microsoft Excel format with proper formatting
- **PDF Export**: Professional PDF reports with tables and styling
- Sample data generation for all tabs
- Individual creative asset download

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Radix UI** - Accessible components

### Backend
- **Express.js** - Server framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database operations
- **Passport.js** - Authentication
- **WebSocket** - Real-time updates

### Export Libraries
- **file-saver** - File download handling
- **xlsx** - Excel file generation
- **jsPDF** - PDF report generation

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd AdBrandInsights
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
AdBrandInsights/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main application component
│   └── index.html         # HTML template
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite configuration
├── shared/                 # Shared types and schemas
├── package.json            # Project dependencies
└── README.md              # This file
```

## 🎯 How to Use

### Navigation
The application has 5 main sections:

1. **Overview** - Dashboard with key metrics
2. **Campaigns** - Campaign management and analytics
3. **Audience** - Audience insights and demographics
4. **Creative** - Creative asset performance
5. **Conversion** - Conversion tracking and funnel analysis

### Export Functionality

#### Exporting Data
1. Navigate to any tab (Overview, Campaigns, Audience, Creative, Conversion)
2. Click the **"Export Report"** button in the top-right corner
3. Choose your preferred format:
   - **CSV** - For spreadsheet compatibility
   - **Excel** - For Microsoft Excel
   - **PDF** - For professional reports
4. The file will download automatically with a descriptive filename

#### Creative Assets
In the Creative tab:
- **View** - Opens a modal with full-size preview and detailed metrics
- **Download** - Downloads the actual image/video file

### Sample Data
The application includes realistic sample data for testing:
- **Campaigns**: 5 sample campaigns with performance metrics
- **Audience**: Daily user growth and engagement data
- **Creative**: 5 sample creative assets with performance data
- **Conversion**: Daily conversion data with revenue tracking
- **Overview**: Dashboard metrics and KPIs

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run check

# Database operations
npm run db:push
```

## 🌐 API Endpoints

The backend provides the following API endpoints:

- `GET /api/overview` - Dashboard overview data
- `GET /api/campaigns` - Campaign list and analytics
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

## 📊 Export Features

### Supported Formats
- **CSV**: Comma-separated values for spreadsheet analysis
- **Excel (XLSX)**: Microsoft Excel format with proper formatting
- **PDF**: Professional PDF reports with tables and styling

### Export Data Types
- **Overview**: Dashboard metrics and performance data
- **Campaigns**: Campaign details with performance metrics
- **Audience**: Audience growth and demographic data
- **Creative**: Creative asset performance data
- **Conversion**: Conversion trends and funnel data

### File Naming
Exported files are automatically named with the current date:
- `overview-2024-01-15.csv`
- `campaigns-2024-01-15.xlsx`
- `audience-2024-01-15.pdf`

## 🎨 UI Components

The application uses a modern, responsive design with:
- **Dark/Light Mode** support
- **Responsive Layout** for all screen sizes
- **Smooth Animations** with Framer Motion
- **Interactive Charts** with Recharts
- **Accessible Components** with Radix UI

## 🔒 Security Features

- **Input Validation** with Zod schemas
- **SQL Injection Protection** with Drizzle ORM
- **XSS Protection** with proper data sanitization
- **CORS Configuration** for cross-origin requests

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify the server is running on port 5000
4. Check browser compatibility

## 🎯 Roadmap

- [ ] Real-time data synchronization
- [ ] Advanced filtering and search
- [ ] Custom dashboard widgets
- [ ] Multi-user support
- [ ] Advanced reporting features
- [ ] Mobile app development

---

**Built with ❤️ using React, TypeScript, and Express** 