import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:id" element={<CompanyDetailPage />} />
            
            {/* Genel Sayfalar */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Applications */}
            <Route
              path="/applications"
              element={
                <ProtectedRoute>
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
            
            {/* Resume */}
            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <ResumePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/edit"
              element={
                <ProtectedRoute>
                  <EditResumePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/preview"
              element={
                <ProtectedRoute>
                  <ResumePreviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume/settings"
              element={
                <ProtectedRoute>
                  <ResumeSettingsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Saved Jobs */}
            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute>
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
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Company Routes */}
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/create"
              element={
                <ProtectedRoute>
                  <CreateCompanyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs"
              element={
                <ProtectedRoute>
                  <ManageJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/jobs/create"
              element={
                <ProtectedRoute>
                  <CreateJobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/applications"
              element={
                <ProtectedRoute>
                  <CompanyApplicationsPage />
                </ProtectedRoute>
              }
            />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
