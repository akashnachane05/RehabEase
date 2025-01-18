import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import ExercisePage from './pages/ExercisePage';
import VideoTutorialPage from './pages/VideoTutorialPage';
import AppointmentPage from './pages/AppointmentPage';
import ExercisePlanCreatorPage from './pages/ExercisePlanCreatorPage';
import PatientProgressPage from './pages/PatientProgressPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
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
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/video-tutorials" element={<VideoTutorialPage />} />
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/create-exercise-plan" element={<ExercisePlanCreatorPage />} />
            <Route path="/patient-progress" element={<PatientProgressPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

