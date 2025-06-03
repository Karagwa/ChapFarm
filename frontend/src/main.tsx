import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage' // or wherever your main component is
import AboutPage from "./pages/AboutPage";
import LoginPage from './pages/LogInPage';
import './index.css'
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import TransportDashboard from './pages/TransportDashboard';
import FarmerReports from './pages/FarmerReports';
import RegisterAdmin from './pages/RegisterAdmin';
import RegisterOfficer from './pages/RegisterOfficer';
import RegisterTransportProvider from './pages/RegisterTransportProvider';
import TransportRequestsPage from './pages/TransportRequest';
import MessagingPage from './pages/MessagingPage';
import AlertsPage from './pages/AlertsPage';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/contact" element={<ContactPage />} />
         <Route path="/admin" element={<AdminDashboard />} />
         <Route path="/authority" element={<AuthorityDashboard />} />
         <Route path="/transport" element={<TransportDashboard />} />
        <Route path="/admin/farmer-reports" element={<FarmerReports />} />
        <Route path="/admin/register-admin" element={<RegisterAdmin />} />
        <Route path="/admin/register-officer" element={<RegisterOfficer />} />
        <Route path="/admin/register-transport" element={<RegisterTransportProvider />} />
        <Route path="/admin/transport-request" element={<TransportRequestsPage />} />
        <Route path="/admin/messages" element={<MessagingPage/>} />
        <Route path="/admin/alerts" element={<AlertsPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
