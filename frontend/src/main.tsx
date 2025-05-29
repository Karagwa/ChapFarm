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
        {/* You can add more routes later like <Route path="/contact" ... /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
