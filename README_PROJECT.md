# Industrial OPT - VinFast Production Optimization Platform

A comprehensive React-based web application for managing and optimizing production planning for VinFast vehicle manufacturing.

## 🏗️ Project Structure

```
industrial-opt/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/            # React components
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── Dashboard.jsx      # Main dashboard view
│   │   ├── Input.jsx          # Production plan management
│   │   ├── Config.jsx         # Constraint configuration
│   │   ├── Optimize.jsx       # Optimization job management
│   │   ├── Results.jsx        # Results visualization
│   │   ├── Account.jsx        # User account settings
│   │   ├── CheckboxFilter.jsx # Model filter component
│   │   ├── UploadModal.jsx    # File upload modal
│   │   └── CreateJobModal.jsx # Job creation modal
│   ├── constants/
│   │   └── index.js           # Application constants
│   ├── data/
│   │   └── sampleData.js      # Sample data for visualization
│   ├── utils/
│   │   └── helpers.js         # Helper functions
│   ├── App.jsx                # Main application component
│   ├── index.js               # Application entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── .gitignore                 # Git ignore file
```

## 🚀 Features

### 1. Dashboard
- Overview of all optimization plans
- Real-time status tracking
- Workshop status monitoring

### 2. Production Plan Management (KHSX)
- Create and manage production plans
- Upload production schedules via Excel
- Edit and delete plans
- Filter and sort capabilities

### 3. Configuration Management
- Create constraint configurations for GA, Body, and Paint workshops
- Define capacity settings (JPH - Jobs Per Hour)
- Set production calendar
- Model-specific configurations

### 4. Optimization Management
- Create optimization jobs
- Start/stop optimization processes
- Track job status (Not Optimized, Running, Completed)
- Filter and search jobs

### 5. Results Visualization
- Body line visualization
- Paint process optimization
- GA capacity analysis
- Summary KPIs
- Detailed production tables
- Interactive charts with model filtering

### 6. User Account
- Profile management
- Password change functionality

## 🛠️ Technologies Used

- **React 18.2** - UI framework
- **Tailwind CSS 3.3** - Styling
- **Recharts 2.10** - Data visualization
- **Lucide React** - Icon library
- **React Scripts 5.0** - Build tooling

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd industrial-opt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 📊 Data Flow

1. **Production Plans** - Users upload/create production schedules
2. **Configurations** - Define constraints for optimization
3. **Optimization Jobs** - Combine plans and configurations
4. **Results** - View optimized schedules and performance metrics

## 🎨 Component Architecture

### Core Components
- `App.jsx` - Main application logic and state management
- `Sidebar.jsx` - Navigation and page routing

### Page Components
- `Dashboard.jsx` - Overview and statistics
- `Input.jsx` - Production plan CRUD operations
- `Config.jsx` - Configuration management
- `Optimize.jsx` - Job management
- `Results.jsx` - Visualization and analytics
- `Account.jsx` - User settings

### Utility Components
- `CheckboxFilter.jsx` - Reusable filter component
- `UploadModal.jsx` - File upload interface
- `CreateJobModal.jsx` - Job creation form

## 📝 Key Features by Module

### Constants (`src/constants/`)
- Vehicle models (VF3, VF5, VF6, VF7, VF8, VF9, VFe34)
- Chart colors
- Default configurations

### Sample Data (`src/data/`)
- Body line data
- Change over metrics
- Paint bar data
- GA capacity data
- Vehicle ratios
- Job results

### Utilities (`src/utils/`)
- Date/time formatting
- Status badge generation
- Custom chart legend rendering

## 🔄 State Management

The application uses React's built-in `useState` and `useEffect` hooks for state management:

- Production plans state
- Configuration state
- Optimization jobs state
- UI state (modals, filters, selected items)
- Chart visibility state

## 🎯 Optimization Process

1. User creates a production plan
2. User defines constraints via configuration
3. User creates an optimization job combining plan + config
4. System runs optimization algorithm (simulated with 5s delay)
5. Results are displayed with visualizations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Copyright © 2025 VinFast

## 👥 Credits

Developed for VinFast Manufacturing Planning Department

## 🔮 Future Enhancements

- Real backend integration
- Excel import/export functionality
- Advanced optimization algorithms
- Real-time collaboration
- Email notifications
- Report generation
- Multi-language support
