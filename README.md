# 🌤️ WeatherPro - Advanced Weather Intelligence

Modern, responsive weather dashboard built with Next.js 14, featuring glass-morphism design, real-time weather data, and advanced analytics.



## ✨ Features

- 🎨 **Modern Glass-morphism Design** - Beautiful dark theme with glass effects
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🌍 **Multi-location Support** - Track weather for multiple cities
- 📊 **Advanced Analytics** - Interactive charts and weather trends
- 🚨 **Weather Alerts** - Real-time severe weather notifications
- ⚙️ **Customizable Settings** - Personalize your weather experience
- 🔄 **Auto-refresh** - Automatic data updates
- 🌙 **Dark Theme** - Eye-friendly dark interface

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Recharts** - Interactive charts and graphs

### Styling & UI
- **Glass-morphism Effects** - Modern translucent design
- **CSS Custom Properties** - Dynamic theming
- **Responsive Design** - Mobile-first approach
- **Smooth Animations** - Enhanced user experience

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (for cloning the repository)

### Check your versions:
\`\`\`bash
node --version
npm --version
git --version
\`\`\`

## 🚀 Quick Start

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/weatherpro-dashboard.git
cd weatherpro-dashboard
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

Or if you prefer yarn:
\`\`\`bash
yarn install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Or with yarn:
\`\`\`bash
yarn dev
\`\`\`

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Installation Guide

### Detailed Setup Steps

1. **Clone and Navigate**
   \`\`\`bash
   git clone https://github.com/your-username/weatherpro-dashboard.git
   cd weatherpro-dashboard
   \`\`\`

2. **Install All Dependencies**
   \`\`\`bash
   # Core dependencies
   npm install next@14.0.4 react@^18 react-dom@^18 typescript@^5

   # UI Components
   npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs

   # Styling
   npm install tailwindcss@^3.3.0 tailwindcss-animate@^1.0.7 class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.1.0

   # Icons and Charts
   npm install lucide-react@^0.294.0 recharts@^2.8.0

   # Development Dependencies
   npm install -D @types/node @types/react @types/react-dom autoprefixer postcss eslint eslint-config-next
   \`\`\`

3. **Verify Installation**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Configuration

### Environment Setup

Create a `.env.local` file in the root directory (optional for basic setup):
\`\`\`env
# Optional: Add your weather API keys here
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Glass-morphism utilities
- Custom color palette
- Responsive breakpoints
- Animation keyframes

### PostCSS Configuration

Automatically configured for:
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## 📁 Project Structure

\`\`\`
weatherpro-dashboard/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   └── ...
│   ├── alerts-sidebar.tsx       # Weather alerts panel
│   ├── current-weather-card.tsx # Main weather display
│   ├── forecast-grid.tsx        # Weather forecast
│   ├── location-search.tsx      # Location search
│   ├── profile-page.tsx         # User profile
│   ├── settings-page.tsx        # App settings
│   ├── weather-charts.tsx       # Analytics charts
│   └── weather-dashboard.tsx    # Main dashboard
├── lib/                         # Utility functions
│   └── utils.ts                 # Helper utilities
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
\`\`\`

## 🎨 Styling System

### Glass-morphism Classes
- `.glass` - Basic glass effect
- `.glass-strong` - Enhanced glass effect
- `.glass-subtle` - Subtle glass effect

### Color Palette
- **Background**: Dark gradient (`#0f172a` to `#334155`)
- **Glass Effects**: Semi-transparent white overlays
- **Accent Colors**: Blue, green, orange, purple variants
- **Text**: High contrast white/gray combinations

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox

## 🚨 Troubleshooting

### Common Issues

#### 1. Styles Not Loading
\`\`\`bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart development server
npm run dev
\`\`\`

#### 2. Glass Effects Not Working
- Ensure you're using a modern browser (Chrome 76+, Firefox 103+, Safari 14+)
- Check if backdrop-filter is supported in your browser

#### 3. TypeScript Errors
\`\`\`bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm install -D typescript@latest
\`\`\`

#### 4. Build Errors
\`\`\`bash
# Clean build
npm run build

# Check for ESLint issues
npm run lint
\`\`\`

### Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Backdrop Filter | 76+ | 103+ | 14+ | 79+ |
| CSS Grid | 57+ | 52+ | 10.1+ | 16+ |
| CSS Custom Properties | 49+ | 31+ | 9.1+ | 16+ |

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🔄 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Utility
npm run type-check   # Check TypeScript types
npm run clean        # Clean build artifacts
\`\`\`

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Railway**: Automatic deployment from GitHub
- **Docker**: Use the included Dockerfile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Radix UI** - For accessible component primitives
- **Lucide** - For beautiful icons
- **Recharts** - For interactive charts

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/your-username/weatherpro-dashboard/issues)
3. Create a new issue with detailed information

## 🔮 Roadmap

- [ ] Real weather API integration
- [ ] PWA support
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Weather maps
- [ ] Historical data
- [ ] Export functionality
- [ ] Multi-language support

---

**Made by [SalihEfehanDemir]**

*WeatherPro - Your Advanced Weather Intelligence Platform*
