# ADmyBRAND Insights - AI-Powered Advertising Analytics Dashboard

A modern, responsive advertising analytics dashboard built with React, TypeScript, and Express.js. This application provides comprehensive campaign management, performance tracking, and AI-powered insights for digital advertising professionals.

## 🚀 Features

### Core Analytics
- **Real-time Performance Tracking**: Live metrics with automatic updates
- **Multi-Platform Campaign Management**: Support for Google Ads, Facebook, LinkedIn, Twitter, and TikTok
- **Advanced Data Visualization**: Interactive charts using Recharts library
- **AI-Powered Insights**: Intelligent recommendations and performance optimization suggestions

### User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Automatic theme switching with user preferences
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Intuitive Navigation**: Collapsible sidebar with visual indicators

### Export & Reporting
- **PDF Export**: Generate comprehensive reports with charts and metrics
- **CSV Export**: Raw data export for further analysis
- **Custom Reports**: Template-based report generation
- **Real-time Data Sync**: Live updates across all dashboard components

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components built on Radix UI
- **Framer Motion** for animations
- **TanStack Query** for data fetching and caching
- **Recharts** for data visualization
- **Wouter** for lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Drizzle ORM** with PostgreSQL
- **Zod** for schema validation
- **Session management** with PostgreSQL store

### Development & Deployment
- **Vercel** for deployment
- **PostgreSQL** with Neon serverless
- **ESBuild** for server bundling
- **Cross-env** for environment management

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── main.tsx       # Application entry point
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data layer abstraction
│   └── vite.ts           # Vite development server
├── shared/               # Shared types and schemas
│   └── schema.ts        # Database schema and validation
├── vercel.json          # Vercel deployment configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admybrand-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   # Add your PostgreSQL connection string if using database
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 🔧 Configuration

### Environment Variables
- `NODE_ENV`: Development/production environment
- `PORT`: Server port (default: 5000)
- `DATABASE_URL`: PostgreSQL connection string (optional)

### Vercel Deployment

The project is pre-configured for Vercel deployment:

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

The `vercel.json` configuration handles:
- Static frontend build
- Serverless API functions
- Proper routing for SPA

## 📊 Data Architecture

### Storage Options
- **In-Memory Storage**: Default for development and testing
- **PostgreSQL**: Production-ready with session management
- **Neon Serverless**: Cloud PostgreSQL for scalable deployment

### Schema Design
- **Campaigns**: Multi-platform campaign management
- **Metrics**: Performance tracking and analytics
- **Audiences**: Demographic and behavioral data
- **Creatives**: Asset performance monitoring
- **Reports**: Custom report configurations

## 🎨 UI/UX Features

### Animation System
- **Page Transitions**: Smooth navigation between routes
- **Component Animations**: Staggered loading and hover effects
- **Loading States**: Skeleton screens and progress indicators
- **Micro-interactions**: Button states and visual feedback

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Adaptive Layout**: Flexible grid system
- **Touch Interactions**: Mobile-friendly controls
- **Progressive Enhancement**: Works across all devices

## 🔐 Security

### Data Protection
- **Client-Server Separation**: Secure API boundaries
- **Input Validation**: Zod schema validation
- **Session Management**: Secure session handling
- **Environment Variables**: Sensitive data protection

### Best Practices
- **TypeScript**: Type safety throughout the application
- **Error Boundaries**: Graceful error handling
- **Sanitized Inputs**: XSS prevention
- **CORS Configuration**: Secure cross-origin requests

## 📈 Performance

### Optimization Features
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Efficient asset loading
- **Caching Strategy**: TanStack Query for data caching
- **Bundle Analysis**: Optimized build sizes

### Monitoring
- **Real-time Metrics**: Live performance tracking
- **Error Tracking**: Comprehensive error logging
- **Analytics**: User interaction monitoring
- **Performance Metrics**: Core Web Vitals tracking

## 🤖 AI Integration

### Intelligent Features
- **Performance Insights**: Automated optimization recommendations
- **Trend Analysis**: Pattern recognition in campaign data
- **Predictive Analytics**: Forecast modeling
- **Automated Alerts**: Smart notifications for anomalies

### Data Processing
- **Real-time Analysis**: Live data processing
- **Pattern Recognition**: Machine learning insights
- **Recommendation Engine**: Personalized suggestions
- **Confidence Scoring**: Reliability metrics for AI insights

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Production Considerations
- **Environment Configuration**: Production environment variables
- **Database Migration**: Drizzle kit for schema updates
- **Static Assets**: Optimized bundle generation
- **Health Checks**: Application monitoring

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Framer Motion** for smooth animations
- **TanStack Query** for powerful data management
- **Tailwind CSS** for utility-first styling