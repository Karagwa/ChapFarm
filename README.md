# 🌾 ChapFarm - Climate-Smart Agricultural Platform

**ChapFarm** is a comprehensive digital platform that connects smallholder farmers in Uganda with essential agricultural services through both USSD (for basic phones) and web interfaces. The platform provides weather updates, AI-powered farming advice, issue reporting, and transport coordination to support climate-smart agriculture.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

---

## 🌟 Features Overview

### 🧑‍🌾 For Farmers (USSD Access)
- **Weather Updates**: Current weather and 5-day forecasts
- **AI-Powered Advice**: Farming guidance using Amazon Bedrock
- **Issue Reporting**: Report crop diseases, pests, and climate issues
- **Transport Requests**: Request logistics for produce delivery

### 🌾 For Agricultural Authorities (Web Dashboard)
- **Report Management**: View and resolve farmer-submitted issues
- **Alert Broadcasting**: Send weather and agricultural alerts

### 🚜 For Transport Providers (Web Dashboard)
- **Request Management**: View and accept transport requests
- **Performance Tracking**: Delivery history and metrics

### 👨‍💼 For Administrators (Web Dashboard)
- **User Management**: Register and manage all user types
- **System Analytics**: Platform usage and performance metrics
- **Content Management**: Manage alerts, messages, and system content

---

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   USSD Gateway  │    │   Web Frontend   │    │  Mobile Apps    │
│  (Basic Phones) │    │   (React/TS)     │    │   (Future)      │
└─────────┬───────┘    └────────┬─────────┘    └─────────────────┘
          │                     │
          └─────────────────────┼─────────────────────────────────┐
                                │                                 │
                    ┌───────────▼──────────┐                     │
                    │    FastAPI Backend   │                     │
                    │   (Python/SQLModel)  │                     │
                    └───────────┬──────────┘                     │
                                │                                 │
          ┌─────────────────────┼─────────────────────────────────┘
          │                     │
    ┌─────▼──────┐    ┌────────▼────────┐    ┌──────────────---┐
    │  Database  │    │ Weather APIs    │    │ AWS AI Service  |
                                             │(Bedrock)
    │ (SQLite)   │    │(OpenWeatherMap) │    │(Amazon Nova)    │
    └────────────┘    └─────────────────┘    └──────────────---┘
```

---

## 🚀 Quick Start (Full Stack)

### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **Git** (for version control)
- **Virtual environment tools** (recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/Karagwa/ChapFarm.git
cd ChapFarm
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv myenv

# On Windows:
myenv\Scripts\activate
# On macOS/Linux:
source myenv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration (see Backend Configuration section)

# Create super admin 
python app\scripts\create_super_admin.py 

# Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup (New Terminal)
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration (see Frontend Configuration section)

# Start frontend development server
npm run dev
```

### 4. Access the Application
- **Frontend (Web Dashboard)**: `http://localhost:5173`
- **Backend API**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/docs`
- **Alternative API Docs**: `http://localhost:8000/redoc`

---

## ⚙️ Configuration

### Backend Environment Variables
Create `backend/.env` file:

```bash
# Database
DATABASE_URL=sqlite:///./app.db

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-min-256-bits

# Email Configuration (for password reset)
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Weather API
OPENWEATHER_API_KEY=your-openweather-api-key

# AWS Bedrock (for AI features)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=eu-north-1

# Africa's Talking (for USSD/SMS)

AFRICASTALKING_API_KEY=your-africastalking-api-key
```

### Frontend Environment Variables
Create `frontend/.env` file:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_OFFLINE_MODE=false
```

---

## 📱 USSD Integration Setup

### 1. Africa's Talking Configuration
1. Create account at [Africa's Talking](https://africastalking.com/)
2. Get your USSD code (e.g., `*483*7#`)
3. Set callback URL to: `https://yourngrokurl.com/ussd`

### 2. Testing USSD Locally
```bash
# Install ngrok for local testing
npm install -g ngrok

# Expose local backend
ngrok http 8000

# Use the ngrok URL as your USSD callback in Africa's Talking dashboard
```

### 3. USSD Flow Example
```
Dial: *483*7#

Main Menu:
1. Get Weather Update
2. View Weather Alerts  
3. Get AI Advice
4. Report Issue
5. Request Transport

→ User selects option
→ Multi-step conversation flows
→ Data stored in database
→ Confirmation sent to user
```

---

## 🗄️ Database Management

### Initialize Database
```bash
cd backend
python -c "from app.database import create_db_and_tables; create_db_and_tables()"
```

### Create Admin User
```bash
# Create super admin
python app\scripts\create_super_admin.py

# Follow prompts to set username, email, and password
```

### Reset Database (Development)
```bash
# Stop both servers
# Delete database file
rm backend/app.db

# Restart backend server - database will be recreated
cd backend
uvicorn app.main:app --reload
```

---

## 🧪 Testing the System

### 1. Backend API Testing
```bash
# Test API health
curl http://localhost:8000

# Test authentication
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username","password":"your_password"}'
```

### 2. Frontend Testing
- Visit `http://localhost:5173`
- Test login with admin credentials
- Navigate through different dashboards
- Test responsive design on different screen sizes

### 3. USSD Testing
- Use [Africa's Talking Sandbox](https://account.africastalking.com/apps/sandbox)
- Test USSD flows with your configured callback URL
- Verify database updates after USSD interactions

---

## 🚀 Production Deployment
Coming soon

### Performance Monitoring
- Monitor API response times
- Track USSD session completion rates
- Monitor database query performance
- Track user registration and activity

---

## 🛠️ Development Workflow

### Starting Development
```bash
# Terminal 1: Backend
cd backend
source myenv/bin/activate  # or myenv\Scripts\activate on Windows
uvicorn app.main:app --reload

# Terminal 2: Frontend  
cd frontend
npm run dev

# Terminal 3: USSD Testing 
ngrok http 8000
```

### Making Changes
1. **Backend Changes**: 
   - Modify Python files in `backend/app/`
   - FastAPI auto-reloads on file changes
   - Test via API docs at `http://localhost:8000/docs`

2. **Frontend Changes**:
   - Modify React files in `frontend/src/`
   - Vite provides hot module replacement
   - Changes reflect immediately in browser

3. **Database Changes**:
   - Update models in `backend/app/models.py`
   - Create migration scripts if needed
   - Test with fresh database in development

---

## 📚 Project Structure

```
ChapFarm/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── models.py       # Database models
│   │   ├── auth/           # Authentication
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── requirements.txt
│   └── README.md
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── README.md
│
├── docs/                   # Documentation
├── scripts/                # Deployment scripts
└── README.md              # This file
```

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Python version
python --version

# Ensure virtual environment is activated
which python

# Check for port conflicts
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows
```

#### Frontend Won't Start
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Database Issues
```bash
# Check database file permissions
ls -la backend/app.db

# Reset database
rm backend/app.db
cd backend
python -c "from app.database import create_db_and_tables; create_db_and_tables()"
```

#### USSD Not Working
- Verify ngrok tunnel is active
- Check Africa's Talking webhook URL
- Verify callback endpoint responds to POST requests
- Check database for session records

### Getting Help
- Check individual component READMEs in `backend/` and `frontend/`
- Review API documentation at `http://localhost:8000/docs`
- Check logs for detailed error messages
- Verify all environment variables are set correctly

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/ChapFarm.git`
3. Follow the Quick Start guide above
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and test thoroughly
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Create a Pull Request

### Code Standards
- **Backend**: Follow PEP 8, use type hints, document functions
- **Frontend**: Use TypeScript, follow React best practices, use Tailwind CSS
- **Git**: Write clear commit messages, use conventional commits
- **Testing**: Add tests for new features, ensure existing tests pass

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Technical Issues**: Create an issue on [GitHub](https://github.com/Karagwa/ChapFarm/issues)
- **Backend Questions**: See [Backend README](backend/README.md)
- **Frontend Questions**: See [Frontend README](frontend/README.md)
- **General Inquiries**: 
  - Email: annkaragwa@gmail.com (Backend)
  - Email: ayanhilwa@gmail.com (Frontend)

---

## 🌍 Impact & Vision

ChapFarm aims to bridge the digital divide in agriculture by providing essential services through both modern web interfaces and accessible USSD technology. Our platform empowers smallholder farmers with:

- **Climate resilience** through weather alerts and AI advice
- **Market access** via transport coordination
- **Knowledge sharing** through community reporting
- **Digital inclusion** using basic phone technology

---

## 🎯 Roadmap

### Short Term (3-6 months)
- [ ] Multi-language USSD support (Luganda, Swahili)
- [ ] Mobile app for smartphones
- [ ] Advanced weather forecasting with AI insight
- [ ] Market price data integration
- [ ] Crop price information

### Medium Term (6-12 months)
- [ ] Micro-finance integration
- [ ] Regional expansion

### Long Term (1+ years)
- [ ] AI-powered crop disease detection
- [ ] Satellite imagery integration
- [ ] Carbon credit marketplace
- [ ] Pan-African platform

---

**Built with ❤️ for sustainable agriculture in Uganda**

*Empowering farmers, one USSD code at a time.*

*Last updated: June 2025*