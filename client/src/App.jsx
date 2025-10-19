import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailPage from './pages/Jobs/JobDetailPage';
import CompaniesPage from './pages/Companies/CompaniesPage';
import CompanyDetailPage from './pages/Companies/CompanyDetailPage';
import CompanyDashboard from './pages/Company/CompanyDashboard';
import CreateCompanyPage from './pages/Company/CreateCompanyPage';
import CreateJobPage from './pages/Company/CreateJobPage';
import ManageJobsPage from './pages/Company/ManageJobsPage';
import CompanyApplicationsPage from './pages/Company/ApplicationsPage';
import MyApplicationsPage from './pages/Applications/MyApplicationsPage';
import ProfilePage from './pages/Profile/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage';
import SavedJobsPage from './pages/SavedJobs/SavedJobsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import MessagesPage from './pages/Messages/MessagesPage';
import ResumePage from './pages/Resume/ResumePage';
import EditResumePage from './pages/Resume/EditResumePage';
import ResumePreviewPage from './pages/Resume/ResumePreviewPage';
import ResumeSettingsPage from './pages/Resume/ResumeSettingsPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersManagement from './pages/Admin/UsersManagement';
import JobsManagement from './pages/Admin/JobsManagement';
import CompaniesManagement from './pages/Admin/CompaniesManagement';
import Statistics from './pages/Admin/Statistics';
import VerifyAdmin from './pages/Admin/VerifyAdmin';
import RoleConfirmation from './pages/RoleConfirmation';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/role-confirmation" element={<ProtectedRoute><RoleConfirmation /></ProtectedRoute>} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            
            {/* Genel Sayfalar */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Applications - Sadece İş Arayanlar */}
            <Route
              path="/applications"
              element={
                <ProtectedRoute requireJobSeeker>
                  <MyApplicationsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Messages */}
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            
            {/* Resume - Sadece İş Arayanlar */}
            <Route
              path="/resume"
              element={
                <ProtectedRoute requireJobSeeker>
                  <ResumePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/edit"
              element={
                <ProtectedRoute requireJobSeeker>
                  <EditResumePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/preview"
              element={
                <ProtectedRoute requireJobSeeker>
                  <ResumePreviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/settings"
              element={
                <ProtectedRoute requireJobSeeker>
                  <ResumeSettingsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Saved Jobs - Sadece İş Arayanlar */}
            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute requireJobSeeker>
                  <SavedJobsPage />
                </ProtectedRoute>
              }
            />
            {/* Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/change-password"
              element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireJobSeeker>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Company Routes */}
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute requireCompany>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/create"
              element={
                <ProtectedRoute requireCompany>
                  <CreateCompanyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs"
              element={
                <ProtectedRoute requireCompany>
                  <ManageJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs/create"
              element={
                <ProtectedRoute requireCompany>
                  <CreateJobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/applications"
              element={
                <ProtectedRoute requireCompany>
                  <CompanyApplicationsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <UsersManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <ProtectedRoute requireAdmin>
                  <JobsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/companies"
              element={
                <ProtectedRoute requireAdmin>
                  <CompaniesManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <ProtectedRoute requireAdmin>
                  <Statistics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/verify"
              element={<VerifyAdmin />}
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
