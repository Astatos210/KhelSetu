import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { LoginPage } from './pages/public/LoginPage';
import { PublicVerificationPage } from './pages/public/PublicVerificationPage';
import { PublicAthletePage } from './pages/public/PublicAthletePage';

// Athlete Pages
import { AthleteDashboard } from './pages/athlete/AthleteDashboard';
import { AthleteProfile } from './pages/athlete/AthleteProfile';
import { AthleteEventsPage } from './pages/athlete/AthleteEventsPage';
import { AthleteEventDetailPage } from './pages/athlete/AthleteEventDetailPage';
import { AthleteAchievementsPage } from './pages/athlete/AthleteAchievementsPage';
import { AthleteMovementTestPage } from './pages/athlete/AthleteMovementTestPage';

// Organizer Pages
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard';
import { OrganizerEventsPage } from './pages/organizer/OrganizerEventsPage';
import { CreateEventPage } from './pages/organizer/CreateEventPage';
import { OrganizerEventDetailPage } from './pages/organizer/OrganizerEventDetailPage';
import { OrganizerResultsPage } from './pages/organizer/OrganizerResultsPage';

// Verifier Pages
import { VerifierDashboard } from './pages/verifier/VerifierDashboard';
import { VerifierResultReviewPage } from './pages/verifier/VerifierResultReviewPage';

// Scout Pages
import { ScoutDashboard } from './pages/scout/ScoutDashboard';
import { ScoutAthleteDetailPage } from './pages/scout/ScoutAthleteDetailPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminOrganizationsPage } from './pages/admin/AdminOrganizationsPage';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#F6F9FC] text-slate-800">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify/:credentialId" element={<PublicVerificationPage />} />
              <Route path="/athletes/:athleteId" element={<PublicAthletePage />} />

              {/* Athlete Routes */}
              <Route
                path="/athlete/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN']}>
                    <AthleteDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/profile"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN']}>
                    <AthleteProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/events"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN', 'ORGANIZER']}>
                    <AthleteEventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/events/:eventId"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN', 'ORGANIZER']}>
                    <AthleteEventDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/achievements"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN']}>
                    <AthleteAchievementsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/athlete/movement-test"
                element={
                  <ProtectedRoute allowedRoles={['ATHLETE', 'ADMIN']}>
                    <AthleteMovementTestPage />
                  </ProtectedRoute>
                }
              />

              {/* Organizer Routes */}
              <Route
                path="/organizer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events"
                element={
                  <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
                    <OrganizerEventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events/new"
                element={
                  <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
                    <CreateEventPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events/:eventId"
                element={
                  <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
                    <OrganizerEventDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organizer/events/:eventId/results"
                element={
                  <ProtectedRoute allowedRoles={['ORGANIZER', 'ADMIN']}>
                    <OrganizerResultsPage />
                  </ProtectedRoute>
                }
              />

              {/* Verifier Routes */}
              <Route
                path="/verifier/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['VERIFIER', 'ADMIN']}>
                    <VerifierDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verifier/results/:resultId"
                element={
                  <ProtectedRoute allowedRoles={['VERIFIER', 'ADMIN']}>
                    <VerifierResultReviewPage />
                  </ProtectedRoute>
                }
              />

              {/* Scout Routes */}
              <Route
                path="/scout/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['SCOUT', 'ADMIN']}>
                    <ScoutDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scout/athletes/:athleteId"
                element={
                  <ProtectedRoute allowedRoles={['SCOUT', 'ADMIN']}>
                    <ScoutAthleteDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/organizations"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminOrganizationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/audit-log"
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminAuditLogPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
