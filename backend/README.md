# 🌾 ChapFarm Backend API

**ChapFarm Backend** is a FastAPI-based REST API that powers a climate-smart agricultural platform for Ugandan farmers. It provides USSD integration, weather services, user management, and AI-powered agricultural advice through a comprehensive set of endpoints.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Karagwa/ChapFarm
cd ChapFarm/backend

# Create virtual environment
python -m venv myenv

# Activate virtual environment
# On Windows:
myenv\Scripts\activate
# On macOS/Linux:
source myenv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration (see Environment Variables section)

# Initialize database
python -c "from app.database import create_db_and_tables; create_db_and_tables()"

# Create super admin (optional)
python manage.py create-super

# Run the application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API Base URL**: `http://localhost:8000`
- **Interactive Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🏗️ Architecture Overview

```
app/
├── __init__.py
├── main.py                 # FastAPI application entry point
├── database.py            # Database configuration and session management
├── models.py              # SQLModel database models
├── schemas.py             # Pydantic schemas for request/response validation
│
├── auth/                  # Authentication and authorization
│   ├── security.py        # Password hashing utilities
│   ├── jwt_handler.py     # JWT token management
│   └── email_utils.py     # Email utilities for password reset
│
├── routes/                # API route handlers
│   ├── admin.py           # Admin management endpoints
│   ├── auth_routes.py     # Authentication endpoints
│   ├── farmer_routes.py   # Farmer management endpoints
│   ├── transport_routes.py # Transport provider endpoints  
│   ├── agric_auth.py      # Agricultural authority endpoints
│   ├── weather_routes.py  # Weather data endpoints
│   ├── ussd.py           # USSD session handling
│   ├── password_routes.py # Password reset endpoints
│   └── sms.py            # SMS messaging endpoints
│
├── services/              # Business logic services
│   └── weather.py        # Weather API integration
│
├── utils/                 # Utility functions
│   ├── AI_support.py     # Amazon Bedrock AI integration
│   └── fuzzy.py          # Fuzzy matching for advice search
│
└── scripts/              # Management scripts
    ├── create_super_admin.py
    └── migrate_ussd.py
```

---

## 📊 Database Models

### Core Models

- **User**: Base user authentication and role management
- **Farmer**: Farmer profiles and registration data
- **TransportProvider**: Transport service providers
- **AgricultureAuthority**: Government/institutional users
- **Admin**: System administrators

### Functional Models

- **FarmerReport**: Issue reports submitted by farmers
- **TransportRequest**: Transport service requests
- **USSDSession**: USSD session state management
- **WeatherData**: Weather information storage
- **WeatherAlert**: Weather alert notifications
- **AgricultureAlert**: Agricultural authority alerts
- **Advice**: AI-generated farming advice cache

---

## 🔐 Authentication & Authorization

### JWT-Based Authentication
```python
# Login to get access token
POST /auth/login
{
    "username": "farmer1",
    "password": "password123"
}

# Response
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "bearer"
}
```

### Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **admin** | Full system access, user management, registration of other users |
| **farmer** | Submit reports, request transport, access weather (via USSD) |
| **transport_provider** | View/manage transport requests |
| **agricultural_authority** | View reports, send alerts, resolve issues |

### Protected Endpoints
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📡 API Endpoints

### 🔑 Authentication
```http
POST /auth/login              # User login
GET  /auth/users              # List all users (Admin only)
```

### 👤 User Management (Admin)
```http
POST /admin/farmers/register           # Register new farmer
POST /admin/transport/register         # Register transport provider  
POST /admin/authority/register         # Register agriculture authority
GET  /admin/users                      # List all users
PATCH /admin/users/{user_id}/role      # Change user role
DELETE /admin/users/{user_id}          # Deactivate user
GET  /admin/dashboard/summary          # System statistics
```

### 🧑‍🌾 Farmer Management
```http
GET  /farmers                    # List farmers
GET  /farmers/{farmer_id}        # Get farmer details
DELETE /farmers/{farmer_id}      # Delete farmer (Admin)
GET  /farmers/reports            # Get all farmer reports (Admin)
GET  /farmers/alerts             # Get weather alerts (Admin)
```

### 🚜 Transport Services
```http
GET  /transport/transport_requests           # Get transport requests
PATCH /transport/transport_requests/{id}     # Update request status
```

### 🌾 Agricultural Authority
```http
GET  /agric_auth/Reports                    # View farmer reports
POST /agric_auth/Agric_alerts              # Create agriculture alerts
PATCH /agric_auth/reports/{id}/resolve     # Resolve farmer reports
GET  /agric_auth/reports/summary           # Get reports summary
GET  /agric_auth/alerts/count              # Get alerts count
```

### 🌤️ Weather Services
```http
GET  /weather/current?location={location}  # Current weather
GET  /weather/forecast?location={location} # Weather forecast
GET  /weather/weather                      # All weather data
```

### 📱 USSD Integration
```http
POST /ussd                      # USSD callback handler
```

### 🔒 Password Management
```http
POST /password/request-password-reset  # Request password reset
POST /password/reset-password         # Confirm password reset
```

### 📧 SMS Services
```http
POST /sms/send-sms/              # Send single SMS
POST /sms/send-bulk-sms/         # Send bulk SMS
```

---

## 📱 USSD Integration

### USSD Menu Structure

```
Main Menu (For Registered Farmers):
1. Get Weather Update
   ├── 1. Current Weather
   └── 2. 5-Day Forecast
2. View Weather Alerts
3. Get AI Advice
4. Report Issue
5. Request Transport
   ├── 1. Bicycle
   ├── 2. Motorcycle  
   ├── 3. Van
   └── 4. Lorry

Main Menu (For Guests):
1. Register
2. Get Weather (Guest)
```

### USSD Session Management
- Sessions stored in database with state tracking
- Support for multi-step conversations
- Automatic farmer registration during first use
- Temporary data storage for complex workflows

---

## 🤖 AI Integration (Amazon Bedrock)

### Features
- **AI-Powered Advice**: Uses Amazon Nova Lite model for farming advice  
- **Concise Responses**: Optimized for USSD character limits (480 chars)
- **Multilingual Support**: Responses in plain English for Ugandan farmers

### Configuration
```python
# Environment variables required
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key  
AWS_REGION=your_region
```

### Usage Example
```python
# Get AI advice for a farming query
advice = await get_ai_advice(session, "My crops are wilting in dry season")
```
- The prompt is entered via USSD
---

## 🌦️ Weather Services

### Supported APIs
- **OpenWeatherMap**: Current weather and 5-day forecasts
- **Location-based**: Supports Ugandan cities and regions
- **Multiple Formats**: JSON API and USSD-formatted responses

### Weather Data
- Current temperature, humidity, precipitation
- 5-day forecast with 3-hour intervals  
- Weather alerts and warnings
- Location-based weather queries

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

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
USERNAME=your-username
API_KEY=your-api-key

```

---

## 🗄️ Database Management

### Initialize Database
```bash
python -c "from app.database import create_db_and_tables; create_db_and_tables()"
```

### Create Super Admin
```bash
python manage.py create-super
```

### Database Migrations
```bash
# Run USSD table migration
python app/scripts/migrate_ussd.py
```

### Reset Database (Development)
```bash
# Delete database file
rm app.db

# Restart server to recreate tables
uvicorn app.main:app --reload
```

---

## 🧪 Testing

### Manual Testing
Use the interactive documentation at `http://localhost:8000/docs` to test endpoints.

### USSD Testing
Test USSD flows using Africa's Talking simulator or webhook testing tools like ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Expose local server  
ngrok http 8000

# Use the ngrok URL for USSD callback
```

### Sample USSD Test Data
```bash
# Simulate USSD callback do that at the africa's talking website
curl -X POST "http://localhost:8000/ussd" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "sessionId=123&serviceCode=*483*7#&phoneNumber=256700123456&text="
```

---
#### Link to Sandbox app test USSD endpoint:
 https://account.africastalking.com/apps/sandbox

---

## 🚀 Deployment

### Production Checklist
- [ ] Set secure `JWT_SECRET_KEY`
- [ ] Configure production database (PostgreSQL recommended)
- [ ] Set up proper CORS origins
- [ ] Configure email service credentials
- [ ] Set up AWS credentials for AI features
- [ ] Configure Africa's Talking for USSD/SMS
- [ ] Set up monitoring and logging
- [ ] Configure SSL/HTTPS

### Docker Deployment
 We shall deploy soon

## 📚 Dependencies

### Core Dependencies
```
fastapi==0.115.12          # Web framework
sqlmodel==0.0.24           # Database ORM
SQLAlchemy==2.0.41         # Database toolkit
pydantic==2.11.5           # Data validation
python-jose==3.4.0         # JWT handling
passlib==1.7.4             # Password hashing
python-dotenv==1.1.0       # Environment variables
```

### Integration Dependencies
```
boto3==1.38.18             # AWS Bedrock integration
httpx==0.28.1              # HTTP client for API calls
aiosmtplib==4.0.1          # Async email sending
rapidfuzz==3.13.0          # Fuzzy string matching
typer==0.16.0              # CLI management commands
```

---

## 🤝 Contributing

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

- **Email**: annkaragwa@gmail.com
- **Documentation**: [API Docs](http://localhost:8000/docs)

---

**Built with ❤️ for sustainable agriculture in Uganda**

*Last updated: June 2025*