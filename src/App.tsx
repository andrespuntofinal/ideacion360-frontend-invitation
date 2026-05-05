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
import ClientLogin from './pages/ClientLogin';
import ClientGuestManagement from './pages/ClientGuestManagement';

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
        <Route path="/wedding" element={<WeddingLanding />} />

        {/* Admin Login */}
        <Route path="/wedding/Admin" element={<AdminLogin />} />
        
        {/* Client Auth & Dashboard */}
        <Route path="/wedding/login" element={<ClientLogin />} />
        <Route path="/wedding/mi-boda/:eventId" element={
          <ClientGuestManagement />
        } />

        {/* Protected Admin Routes */}
        <Route path="/wedding/Admin/dashboard" element={
          <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/wedding/Admin/events/new" element={
          <ProtectedRoute requiredRole="admin"><EventForm /></ProtectedRoute>
        } />
        <Route path="/wedding/Admin/events/:id" element={
          <ProtectedRoute requiredRole="admin"><EventDetail /></ProtectedRoute>
        } />
        <Route path="/wedding/Admin/events/:id/edit" element={
          <ProtectedRoute requiredRole="admin"><EventForm /></ProtectedRoute>
        } />
        <Route path="/wedding/Admin/events/:id/components" element={
          <ProtectedRoute requiredRole="admin"><ComponentsManager /></ProtectedRoute>
        } />

        {/* Public Card (Invitation View) */}
        <Route path="/wedding/card/:eventId" element={<CardPage />} />
        <Route path="/wedding/control-user/*" element={<ControlUser />} />

        <Route path="/wedding/Admin/settings" element={
          <ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
