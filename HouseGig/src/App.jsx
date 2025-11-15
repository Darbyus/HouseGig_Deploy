import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from "./Header"
// import Footer from "./Footer"
import Explore from "./pages/Explore"
import Profile from "./pages/Profile";
import ListingDetails from "./pages/ListingDetails";
import Collections from "./pages/Collections";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Upload from "./pages/Upload";

function AnimatedRoutes() {
  const location = useLocation();

  return (
        <Routes location={location}>
          <Route path="/" element={<Explore />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        </Routes>
  );
}

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <Header />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              <AnimatedRoutes />
            </div>
          </div>
          {/* Footer is now handled per-page, not globally */}
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
