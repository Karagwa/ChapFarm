# 🌱 ChapFarm Frontend

**ChapFarm Frontend** is a modern React-based web application that provides a comprehensive dashboard and management interface for the ChapFarm agricultural platform. Built with React, TypeScript, and Tailwind CSS, it offers role-based interfaces for administrators, agricultural authorities, transport providers, and system management.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager
- ChapFarm Backend API running (see backend README)

### Installation

```bash
# Clone the repository
git clone https://github.com/Karagwa/ChapFarm
cd ChapFarm/frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── layouts/         # Layout components for different user roles
│   ├── AuthoritySidebar.tsx    # Agricultural authority navigation
│   ├── ChapFarmLogo.tsx        # Brand logo component
│   ├── FeatureCard.tsx         # Feature showcase cards
│   ├── Footer.tsx              # Site footer
│   ├── Navbar.tsx              # Main navigation bar
│   ├── Sidebar.tsx             # Admin sidebar navigation
│   └── StatCard.tsx            # Statistics display cards
│
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication state management
│
├── pages/              # Page components (route handlers)
│   ├── HomePage.tsx            # Landing page
│   ├── AboutPage.tsx           # About/company information
│   ├── ContactPage.tsx         # Contact form and information
│   ├── LogInPage.tsx           # User authentication
│   ├── RegisterPage.tsx        # User registration
│   │
│   ├── AdminDashboard.tsx      # Admin overview dashboard
│   ├── RegisterAdmin.tsx       # Admin user registration
│   ├── RegisterOfficer.tsx     # Agricultural officer registration
│   ├── RegisterTransportProvider.tsx  # Transport provider registration
│   ├── MessagingPage.tsx       # Admin messaging interface
│   ├── FarmerReports.tsx       # Farmer issue reports management
│   ├── TransportRequest.tsx    # Transport request management
│   │
│   ├── AuthorityDashboard.tsx  # Agricultural authority dashboard
│   ├── AuthMessagesPage.tsx    # Authority messaging system
│   ├── AnalysisDashboard.tsx   # Data analysis and reporting
│   ├── AlertsPage.tsx          # Weather and agricultural alerts
│   │
│   └── TransportDashboard.tsx  # Transport provider dashboard
│
├── services/           # API service functions
│   ├── auth.ts         # Authentication services
│   ├── api.ts          # Generic API utilities
│   └── adminService.ts # Admin-specific API calls
│
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared type definitions
│
├── config/             # Configuration files
│   └── api_config.ts   # API endpoints and configuration
│
├── index.css           # Global styles and Tailwind imports
└── main.tsx           # Application entry point and routing
```

---

## 🎨 Design System

### Color Palette
The application uses a custom ChapFarm color scheme:

```css
chapfarm: {
  50: '#f5f9ee',   /* Very light green */
  100: '#e6f2d8',  /* Light green */
  200: '#cfe5b5',  /* Pale green */
  300: '#b0d487',  /* Light green */
  400: '#94c25f',  /* Medium green */
  500: '#72aa3a',  /* Primary green */
  600: '#5a8a2a',  /* Dark green */
  700: '#446923',  /* Darker green */
  800: '#375421',  /* Very dark green */
  900: '#2f461f',  /* Darkest green */
  950: '#172610',  /* Almost black green */
}
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)
- **Emphasis**: Medium weight (500)

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Primary (ChapFarm green), Secondary (outline), Destructive (red)
- **Forms**: Consistent padding, focus states, and validation styling
- **Navigation**: Role-based sidebars with consistent iconography

---

## 🔐 User Roles & Interfaces

### 1. Public Interface
- **Landing Page** (`/`): Marketing site with feature highlights
- **About Page** (`/about`): Company mission and service details
- **Contact Page** (`/contact`): Contact form and information
- **Authentication** (`/login`, `/register`): User login and registration

### 2. Admin Interface (`/admin/*`)
- **Dashboard**: System overview with key metrics
- **User Management**: Register and manage all user types
- **Farmer Reports**: View and manage farmer-submitted issues
- **Transport Requests**: Oversee transport coordination
- **Messaging**: Send messages to farmers via USSD
- **System Analytics**: Platform usage and performance metrics

### 3. Agricultural Authority Interface (`/authority/*`)
- **Dashboard**: Authority-specific overview
- **Reports Management**: View and resolve farmer reports
- **Messaging**: Direct communication with farmers
- **Analysis Dashboard**: Regional agricultural data analysis
- **Alerts Management**: Create and manage weather/agricultural alerts

### 4. Transport Provider Interface (`/transport/*`)
- **Dashboard**: Transport provider overview
- **Request Management**: View and accept transport requests
- **History**: Track completed deliveries and performance

---

## 🛠️ Key Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based login system
- **Role-based Access Control**: Different interfaces for different user types
- **Protected Routes**: Automatic redirection based on user permissions
- **Remember Me**: Optional persistent login sessions

### Responsive Design
- **Mobile-First**: Optimized for mobile devices and feature phones
- **Tablet Support**: Adapted layouts for tablet screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Cross-browser Compatibility**: Tested on major browsers

### Real-time Features
- **Live Updates**: Real-time data updates where applicable
- **Notifications**: In-app notifications for important events
- **Status Tracking**: Real-time status updates for requests and reports

### Data Visualization
- **Statistics Cards**: Key performance indicators
- **Charts and Graphs**: Data visualization using Recharts
- **Regional Maps**: Coverage area visualization
- **Trend Analysis**: Historical data trends

---

## 📡 API Integration

### Authentication
```typescript
// Login example
const response = await authService.login({
  username: 'user@example.com',
  password: 'password123'
});

// Store token and redirect based on role
authService.setToken(response.access_token);
const userInfo = authService.getUserFromToken();
```

### Admin Services
```typescript
// Register new farmer
const farmer = await adminService.registerFarmer({
  name: 'John Doe',
  phone: '+256700123456',
  location: 'Kampala',
  username: 'johndoe',
  email: 'john@example.com',
  password: 'securepass'
});
```

### Error Handling
- **Axios Interceptors**: Automatic token refresh and error handling
- **User-friendly Messages**: Translated error messages for users
- **Retry Mechanisms**: Automatic retry for failed requests
- **Offline Support**: Graceful degradation for poor connectivity

---

## 🎭 Component Library

### Core Components

#### UI Components (`/components/ui/`)
```typescript
// Button component with variants
<Button variant="primary" size="lg">
  Primary Action
</Button>

<Button variant="outline" size="sm">
  Secondary Action  
</Button>
```

#### Layout Components
```typescript
// Admin layout with sidebar
<AdminLayout>
  <h1>Dashboard</h1>
  {/* Dashboard content */}
</AdminLayout>

// Authority layout
<AuthorityLayout>
  <h1>Reports</h1>
  {/* Reports content */}
</AuthorityLayout>
```

#### Feature Components
```typescript
// Statistics display
<StatCard 
  value="5,000+" 
  label="Farmers Connected" 
/>

// Feature showcase
<FeatureCard
  title="USSD Access"
  description="Simple phone access for all farmers"
  icon={<Phone className="h-6 w-6" />}
/>
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Authentication
VITE_JWT_SECRET_KEY=your-jwt-secret-key

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_OFFLINE_MODE=false

# External Services
VITE_GOOGLE_MAPS_API_KEY=your-maps-key
VITE_SENTRY_DSN=your-sentry-dsn
```

### API Configuration (`/config/api_config.ts`)
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  
  // Admin endpoints
  ADMIN_USERS: `${API_BASE_URL}/admin/users`,
  ADMIN_REGISTER_FARMER: `${API_BASE_URL}/admin/farmers/register`,
  
  // Authority endpoints
  AUTHORITY_REPORTS: `${API_BASE_URL}/agric_auth/Reports`,
  AUTHORITY_ALERTS: `${API_BASE_URL}/agric_auth/Agric_alerts`,
};
```

---

## 🎯 Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run dev:host     # Start dev server accessible from network

```


## 📚 Dependencies

### Core Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.0",
  "typescript": "^5.0.0",
  "vite": "^6.3.5"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.3.5",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.511.0",
  "recharts": "^2.15.3"
}
```

### Utilities
```json
{
  "axios": "^1.9.0",
  "jwt-decode": "^4.0.0"
}
```

---

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript and React best practices
2. **Component Structure**: Use functional components with hooks
3. **State Management**: Use React Context for global state
4. **Styling**: Use Tailwind CSS utility classes
5. **Testing**: Write tests for new components and features

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for new functionality
4. Ensure all tests pass (`npm test`)
5. Run linting (`npm run lint`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Review Checklist
- [ ] Component follows React best practices
- [ ] TypeScript types are properly defined
- [ ] Responsive design works on all screen sizes
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Tests are included and passing

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

- **Email**: ayanhilwa@gmail.com
---

**Built with ❤️ for sustainable agriculture in Uganda**

*Last updated: June 2025*