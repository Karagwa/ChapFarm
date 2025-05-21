
````markdown
# 🌿 ChapFarm – Climate-Smart Agricultural Platform

**ChapFarm** is a hybrid USSD + Web platform designed to empower smallholder farmers by providing easy access to climate alerts, issue reporting, and logistics coordination — even with basic feature phones. Built using **FastAPI (backend)** and **React (frontend)**, ChapFarm bridges the gap between farmers, transport providers, and agricultural authorities.

---

## 🌍 Core Features

### 🧑🏾‍🌾 Farmers (via USSD)
- Report climate-related issues (e.g., floods, pests)
- Request transport for produce
- Receive weather alerts and broadcast messages
- Get AI-generated advice (optional with Amazon Bedrock integration)

### 🚜 Transport Providers
- View transport requests from farmers
- Accept or reject requests
- Manage delivery history

### 🌾 Agricultural Authority
- View farmer-submitted issue reports
- Send targeted or broadcast USSD messages
- Send weather alerts to farmers
- Resolve and track reported issues

### 🛡️ Admin
- Manage users and roles
- Register new farmers and transport providers
- Monitor system usage

---

## ⚙️ Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Backend    | Python, FastAPI, SQLModel     |
| Frontend   | React.js, Tailwind CSS        |
| Auth       | JWT-based auth, role-based access |
| Database   | SQLite / PostgreSQL (switchable) |
| Messaging  | Africa's Talking (USSD & SMS) |
| AI (Optional) | Amazon Bedrock (Nova Lite for advice generation) |

---

## 🧾 API Overview

> ⚠️ All protected endpoints require JWT authentication.

### 🛠 Authentication
```http
POST /auth/login
````

* Returns a JWT token + user role

### 👤 User Registration

```http
POST /farmers/register
POST /transport/register
```

### 📡 USSD Integration

```http
POST /ussd/session           # Handles session logic
POST /ussd/report            # Submit issue report
POST /ussd/request-transport # Request transport
POST /ussd/feedback          # Send feedback
```

### 🚜 Transport Provider Endpoints

```http
GET /requests                # View transport requests
PATCH /requests/{id}        # Accept/Reject transport request
```

### 🌾 Agricultural Authority Endpoints

```http
GET /reports                 # View farmer reports
PATCH /reports/{id}/resolve # Mark report as resolved
POST /messages/farmers      # Send USSD message to farmers
POST /alerts/weather        # Post weather alert
```

---

## 🛠️ Running the Project

### 🔧 Backend (FastAPI)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the app
uvicorn app.main:app --reload
```

### 🖥️ Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Notes

* JWT token is returned on login and stored client-side.
* Role-based access is enforced on both frontend and backend.
* Password reset uses email tokens (SMTP setup required).

---

## 📡 USSD Integration (Africa’s Talking)

Set up your application with Africa’s Talking and point your callback URL to:

```
POST /ussd/session
```

Handle logic inside `ussd_router.py`.

---

## 💬 AI Integration (Optional)

You can use **Amazon Bedrock** (Nova Lite model) to generate smart farming advice via USSD.

---

## 📁 Folder Structure (Backend)

```
app/
├── routers/
│   ├── auth.py
│   ├── farmers.py
│   ├── transport.py
│   ├── authority.py
│   └── ussd.py
├── models/
├── schemas/
├── services/
└── main.py
```

---

## 📄 License

MIT License — use, modify, and share freely. Just don’t forget the smallholder farmers this is meant to uplift 🌍.

---

## 🧠 Credits

Built with ❤️ by \[Your Name or Team]
Supported by Africa's Talking, Amazon Bedrock & Open Source contributors

```




