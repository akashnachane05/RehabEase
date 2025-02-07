import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TherapistLoginPage from './pages/TherapistLoginPage';
import TherapistRegisterPage from './pages/TherapistRegisterPage';
import PatientDashboard from './pages/PatientDashboard';
import TherapistDashboard from './pages/TherapistDashboard';
import PatientProfilePage from './pages/PatientProfilePage';
import TherapistProfile from './pages/TherapistProfile';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ErrorBoundary from './components/ErrorBoundary';
import TherapistProfiles from './pages/TherapistProfiles';
import PatientProfiles from './pages/PatientProfiles';
import Chat from './components/Chat';
import ExerciseRequest from './pages/ExerciseRequest';
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Main />
      </Router>
    </ErrorBoundary>
  );
}

const Main = () => {
  const location = useLocation();

  // Define paths where the header should not be displayed
  const noHeaderPaths = ['/about', '/services', '/contact'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render the header */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/therapist/login" element={<TherapistLoginPage />} />
          <Route path="/therapist/register" element={<TherapistRegisterPage />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/therapist/dashboard" element={<TherapistDashboard />} />
          <Route path="/exercise" element={<ExerciseLibrary />} />
          <Route path="/patients/profile" element={<PatientProfilePage />} />
          <Route path="/therapist/profile" element={<TherapistProfile />} />
          <Route path="/therapist/patients" element={<PatientProfiles />} />
          <Route path="/patient/therapist" element={<TherapistProfiles />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/request" element={<ExerciseRequest />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

