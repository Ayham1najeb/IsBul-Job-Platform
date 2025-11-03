import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import CompanyLayout from './components/Layout/CompanyLayout';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import ScrollToTop from './components/ScrollToTop';
import SkipToContent from './components/UI/SkipToContent';
import { Loader } from 'lucide-react';

// Lazy loading - Ana sayfalar
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Lazy loading - İş İlanları
const JobsPage = lazy(() => import('./pages/Jobs/JobsPage'));
const JobDetailPage = lazy(() => import('./pages/Jobs/JobDetailPage'));

// Lazy loading - Şirketler
const CompaniesPage = lazy(() => import('./pages/Companies/CompaniesPage'));
const CompanyDetailPage = lazy(() => import('./pages/Companies/CompanyDetailPage'));

// Lazy loading - Şirket Paneli
const CompanyDashboard = lazy(() => import('./pages/Company/CompanyDashboard'));
const CreateCompanyPage = lazy(() => import('./pages/Company/CreateCompanyPage'));
const CreateJobPage = lazy(() => import('./pages/Company/CreateJobPage'));
const ManageJobsPage = lazy(() => import('./pages/Company/ManageJobsPage'));
const CompanyApplicationsPage = lazy(() => import('./pages/Company/ApplicationsPage'));
const CompanyProfile = lazy(() => import('./pages/Company/CompanyProfile'));
const ViewApplicantResume = lazy(() => import('./pages/Company/ViewApplicantResume'));

// Lazy loading - Başvurular ve Profil
const MyApplicationsPage = lazy(() => import('./pages/Applications/MyApplicationsPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const EditProfilePage = lazy(() => import('./pages/Profile/EditProfilePage'));
const ChangePasswordPage = lazy(() => import('./pages/Profile/ChangePasswordPage'));
const SavedJobsPage = lazy(() => import('./pages/SavedJobs/SavedJobsPage'));

// Lazy loading - Genel Sayfalar
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Lazy loading - Mesajlar
const MessagesPage = lazy(() => import('./pages/Messages/MessagesPage'));

// Lazy loading - Özgeçmiş
const ResumePage = lazy(() => import('./pages/Resume/ResumePage'));
const EditResumePage = lazy(() => import('./pages/Resume/EditResumePage'));
const ResumePreviewPage = lazy(() => import('./pages/Resume/ResumePreviewPage'));
const ResumeSettingsPage = lazy(() => import('./pages/Resume/ResumeSettingsPage'));

// Lazy loading - Admin
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const UsersManagement = lazy(() => import('./pages/Admin/UsersManagement'));
const JobsManagement = lazy(() => import('./pages/Admin/JobsManagement'));
const CompaniesManagement = lazy(() => import('./pages/Admin/CompaniesManagement'));
const Statistics = lazy(() => import('./pages/Admin/Statistics'));
const VerifyAdmin = lazy(() => import('./pages/Admin/VerifyAdmin'));
const RoleConfirmation = lazy(() => import('./pages/RoleConfirmation'));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center">
    <div className="text-center">
      <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Yükleniyor...</p>
    </div>
  </div>
);

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
        <SkipToContent />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
          </Route>

          {/* Company Routes - Özel Layout */}
          <Route element={<CompanyLayout />}>
            <Route
              path="/company/dashboard"
              element={
                <ProtectedRoute requireCompany>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/profile"
              element={
                <ProtectedRoute requireCompany>
                  <CompanyProfile />
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
            <Route
              path="/company/applicant-resume/:kullaniciId/:basvuruId"
              element={
                <ProtectedRoute requireCompany>
                  <ViewApplicantResume />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Normal Layout için devam */}
          <Route element={<Layout />}>
            
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
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
