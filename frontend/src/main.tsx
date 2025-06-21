import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import AuthMessagesPage from './pages/AuthMessagesPage';
import AnalyticsPage from './pages/AnalysisDashboard';
import AuthFarmerReport from './pages/AuthFarmerReports';
import AuthTransportRequests from './pages/AuthTransportRequests';
import AllUsersPage from './pages/AllUserPage';
import RequestView from './pages/RequestsView';
import TransportHistoryPage from './pages/TransportHistory'
import { registerCharts } from './pages/charts_config';

const App = () => {
  // This is the key part for Chart.js registration
  useEffect(() => {
    registerCharts(); // Call your function to register Chart.js components
    console.log('Chart.js components registered globally in App component.');
  }, []); 

  return (
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
        <Route path="/admin/users" element={<AllUsersPage />} />
        <Route path="/admin/messages" element={<MessagingPage/>} /> 
        <Route path="/authority/messages" element={<AuthMessagesPage />} />
        <Route path="/authority/analysis" element={<AnalyticsPage />} />
        <Route path="/authority/farmer-reports" element={<AuthFarmerReport/>}/>
        <Route path="/authority/transport-request" element={<AuthTransportRequests/>}/>
        <Route path="/authority/alerts" element={<AlertsPage/>} />
        <Route path="/transport/requests" element={<RequestView/>} />
        <Route path="/transport/history" element={<TransportHistoryPage/>} />
      </Routes>
      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
