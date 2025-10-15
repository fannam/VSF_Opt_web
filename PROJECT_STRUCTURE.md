# Project Structure Breakdown

## 📁 Directory Tree

```
industrial-opt/
│
├── 📂 public/
│   └── index.html                    # Main HTML template
│
├── 📂 src/
│   │
│   ├── 📂 components/               # All React Components
│   │   ├── Account.jsx              # User account management page
│   │   ├── CheckboxFilter.jsx       # Reusable checkbox filter for models
│   │   ├── Config.jsx               # Configuration management page
│   │   ├── CreateJobModal.jsx       # Modal for creating optimization jobs
│   │   ├── Dashboard.jsx            # Main dashboard overview
│   │   ├── Input.jsx                # Production plan (KHSX) management
│   │   ├── Optimize.jsx             # Optimization job management
│   │   ├── Results.jsx              # Results visualization with charts
│   │   ├── Sidebar.jsx              # Navigation sidebar
│   │   └── UploadModal.jsx          # Modal for uploading production plans
│   │
│   ├── 📂 constants/                # Application Constants
│   │   └── index.js                 # Vehicle models, colors, initial configs
│   │
│   ├── 📂 data/                     # Sample Data
│   │   └── sampleData.js            # All visualization data and job results
│   │
│   ├── 📂 utils/                    # Utility Functions
│   │   └── helpers.js               # Date formatting, status badges, legend renderer
│   │
│   ├── App.jsx                      # Main application component (state + routing)
│   ├── index.js                     # React entry point
│   └── index.css                    # Global styles + Tailwind imports
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── .gitignore                   # Git ignore rules
│
└── 📄 Documentation
    ├── README.md                    # Original README
    ├── README_PROJECT.md            # Detailed project documentation
    └── PROJECT_STRUCTURE.md         # This file
```

## 🔗 Component Relationships

```
App.jsx (Root)
│
├── Sidebar.jsx
│   └── Navigation to all pages
│
├── Dashboard.jsx
│   └── Stats & Overview
│
├── Input.jsx
│   ├── Production plan list
│   └── Plan editor table
│
├── Config.jsx
│   ├── Configuration list
│   ├── GA Workshop settings
│   ├── Body Workshop settings
│   ├── Paint Workshop settings
│   └── Calendar settings
│
├── Optimize.jsx
│   ├── Optimization overview
│   └── Job list & filters
│
├── Results.jsx
│   ├── Job selector
│   ├── Tab navigation
│   ├── Body Visualization
│   │   ├── CheckboxFilter
│   │   └── Recharts (Line, Bar)
│   ├── Paint Visualization
│   │   └── Recharts (Bar)
│   ├── GA Visualization
│   │   ├── CheckboxFilter
│   │   └── Recharts (Line, Bar, Pie)
│   ├── Results Table
│   └── Summary KPIs
│
├── Account.jsx
│   └── User settings form
│
├── UploadModal.jsx
│   └── File upload interface
│
└── CreateJobModal.jsx
    └── Job creation form
```

## 📊 Data Flow

```
Constants (constants/index.js)
    ↓
App.jsx (State Management)
    ↓
    ├── Production Plans State
    ├── Configurations State
    ├── Optimization Jobs State
    └── UI State
        ↓
    Props passed to child components
        ↓
    Components render UI
        ↓
    User interactions trigger handlers
        ↓
    Handlers update state in App.jsx
        ↓
    React re-renders affected components
```

## 🎯 Key Files Description

### Entry Points
- **`public/index.html`** - HTML template with root div
- **`src/index.js`** - React DOM rendering, wraps App with StrictMode
- **`src/App.jsx`** - Main component with all state and logic

### Styling
- **`src/index.css`** - Tailwind imports + global resets
- **`tailwind.config.js`** - Tailwind configuration
- **`postcss.config.js`** - PostCSS plugins

### Constants & Data
- **`src/constants/index.js`**
  - MODELS array
  - COLORS array
  - initialGaConfig object
  - initialBodyConfig object
  - initialCalendarDays array

- **`src/data/sampleData.js`**
  - bodyLineData, changeOverData, paintBarData, etc.
  - jobResultsData object with results for different jobs
  - sampleProductionData array

### Utilities
- **`src/utils/helpers.js`**
  - formatDateTime() - Formats ISO date strings
  - getStatusBadge() - Returns colored status badges
  - renderCustomLegend() - Custom legend for Recharts

### Components Breakdown

#### Pages (6)
1. **Dashboard.jsx** - Overview with KPI cards
2. **Input.jsx** - Production plan CRUD
3. **Config.jsx** - Configuration management with tabs
4. **Optimize.jsx** - Job management with filters
5. **Results.jsx** - Visualization with multiple chart types
6. **Account.jsx** - User settings

#### Shared Components (4)
1. **Sidebar.jsx** - Navigation menu
2. **CheckboxFilter.jsx** - Model visibility toggle
3. **UploadModal.jsx** - File upload dialog
4. **CreateJobModal.jsx** - Job creation dialog

## 🔧 State Architecture

### App.jsx State Variables

**Global UI State:**
- `collapsed` - Sidebar collapsed state
- `currentPage` - Active page

**Production Plans:**
- `productionPlans` - Array of plans
- `selectedPlan` - Currently selected plan
- `showUploadModal` - Upload modal visibility
- `newPlanName` - New plan name input
- `planFilters` - Filter values
- `planSortOrder` - Sort direction

**Configurations:**
- `configurations` - Array of configs
- `selectedConfig` - Currently selected config
- `selectedWorkshop` - Active workshop tab
- `configFilters` - Filter values
- `configSortOrder` - Sort direction

**Optimization:**
- `optimizationPlans` - Array of jobs
- `showCreateJobModal` - Modal visibility
- `newJobPlanId` - Selected plan ID
- `newJobConfigId` - Selected config ID
- `filters` - Job filters

**Results:**
- `resultTab` - Active visualization tab
- `selectedJobId` - Job to display
- `bodyLineVisible` - Model visibility for body charts
- `changeOverVisible` - Model visibility for changeover
- `paintBarVisible` - Model visibility for paint
- `gaCapacityVisible` - Model visibility for GA

## 📦 Dependencies

### Production Dependencies
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-scripts` 5.0.1
- `lucide-react` ^0.292.0
- `recharts` ^2.10.0

### Dev Dependencies
- `tailwindcss` ^3.3.0
- `autoprefixer` ^10.4.16
- `postcss` ^8.4.31

## 🎨 Styling Approach

- **Tailwind CSS** for all styling
- Utility-first approach
- No custom CSS files (except Tailwind imports)
- Responsive design with breakpoint classes
- Color scheme: Blue (primary), Green (success), Red (danger), Yellow (warning)

## 🚀 Build & Deploy

```bash
# Development
npm start        # Runs on http://localhost:3000

# Production
npm run build    # Creates optimized build in /build folder
```

## 📝 Code Organization Principles

1. **Separation of Concerns**
   - Components in `/components`
   - Constants in `/constants`
   - Data in `/data`
   - Utilities in `/utils`

2. **Component Design**
   - Functional components with hooks
   - Props for data passing
   - Local state when needed
   - Lifted state in App.jsx for shared data

3. **File Naming**
   - PascalCase for components: `Dashboard.jsx`
   - camelCase for utilities: `helpers.js`
   - kebab-case for config files: `tailwind.config.js`

4. **Import Organization**
   - React imports first
   - Third-party libraries
   - Local imports (components, constants, utils)

## 🔍 Finding Things

**Need to modify...**
- **Vehicle models?** → `src/constants/index.js`
- **Sample data?** → `src/data/sampleData.js`
- **Date formatting?** → `src/utils/helpers.js`
- **Dashboard?** → `src/components/Dashboard.jsx`
- **Navigation?** → `src/components/Sidebar.jsx`
- **Charts?** → `src/components/Results.jsx`
- **Styling?** → Inline Tailwind classes in components
- **Global styles?** → `src/index.css`

## ✅ File Checklist

- ✅ HTML template
- ✅ React entry point
- ✅ Main App component
- ✅ 10 component files
- ✅ Constants file
- ✅ Sample data file
- ✅ Utilities file
- ✅ Global CSS
- ✅ Tailwind config
- ✅ PostCSS config
- ✅ Package.json
- ✅ .gitignore
- ✅ Documentation

**Total Files: 20+**
