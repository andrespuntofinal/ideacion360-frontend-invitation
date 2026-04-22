import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import WeddingLanding from './pages/WeddingLanding';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EventForm from './pages/EventForm';
import EventDetail from './pages/EventDetail';
import ComponentsManager from './pages/ComponentsManager';
import CardPage from './card/CardPage';
import ControlUser from './pages/ControlUser';

import AdminSettings from './pages/AdminSettings';
import NotFound from './pages/NotFound';

// Guards
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-card2)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
          },
          success: {
            iconTheme: { primary: '#4ade80', secondary: 'var(--bg-card2)' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: 'var(--bg-card2)' },
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Wedding-Invitation" element={<WeddingLanding />} />

        {/* Admin Login */}
        <Route path="/Wedding-Invitation/Admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/Wedding-Invitation/Admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/Wedding-Invitation/Admin/events/new" element={
          <ProtectedRoute><EventForm /></ProtectedRoute>
        } />
        <Route path="/Wedding-Invitation/Admin/events/:id" element={
          <ProtectedRoute><EventDetail /></ProtectedRoute>
        } />
        <Route path="/Wedding-Invitation/Admin/events/:id/edit" element={
          <ProtectedRoute><EventForm /></ProtectedRoute>
        } />
        <Route path="/Wedding-Invitation/Admin/events/:id/components" element={
          <ProtectedRoute><ComponentsManager /></ProtectedRoute>
        } />

        {/* Public Card (Invitation View) */}
        <Route path="/Wedding-Invitation/card/:eventId" element={<CardPage />} />
        <Route path="/Wedding-Invitation/control-user/*" element={<ControlUser />} />

        <Route path="/Wedding-Invitation/Admin/settings" element={
          <ProtectedRoute><AdminSettings /></ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
