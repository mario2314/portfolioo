import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Public: dimuat langsung karena inilah yang pertama dilihat pengunjung.
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';

// Semuanya di bawah ini di-lazy-load — dipecah jadi chunk terpisah supaya
// pengunjung situs publik tidak ikut download kode dashboard admin yang berat
// (react-hook-form, semua halaman CRUD, dst), dan sebaliknya.
const ProjectDetailPage = lazy(() => import('./pages/public/ProjectDetailPage'));
const BlogDetailPage = lazy(() => import('./pages/public/BlogDetailPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const HeroAdminPage = lazy(() => import('./pages/admin/HeroAdminPage'));
const AboutAdminPage = lazy(() => import('./pages/admin/AboutAdminPage'));
const SkillsAdminPage = lazy(() => import('./pages/admin/SkillsAdminPage'));
const ProjectsAdminPage = lazy(() => import('./pages/admin/ProjectsAdminPage'));
const ExperienceAdminPage = lazy(() => import('./pages/admin/ExperienceAdminPage'));
const EducationAdminPage = lazy(() => import('./pages/admin/EducationAdminPage'));
const CertificationsAdminPage = lazy(() => import('./pages/admin/CertificationsAdminPage'));
const AchievementsAdminPage = lazy(() => import('./pages/admin/AchievementsAdminPage'));
const BlogAdminPage = lazy(() => import('./pages/admin/BlogAdminPage'));
const TestimonialsAdminPage = lazy(() => import('./pages/admin/TestimonialsAdminPage'));
const MessagesAdminPage = lazy(() => import('./pages/admin/MessagesAdminPage'));
const SettingsAdminPage = lazy(() => import('./pages/admin/SettingsAdminPage'));

function PageLoader() {
  return <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">Memuat...</div>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
            </Route>

            <Route path="/admin/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="hero" element={<HeroAdminPage />} />
              <Route path="about" element={<AboutAdminPage />} />
              <Route path="skills" element={<SkillsAdminPage />} />
              <Route path="projects" element={<ProjectsAdminPage />} />
              <Route path="experience" element={<ExperienceAdminPage />} />
              <Route path="education" element={<EducationAdminPage />} />
              <Route path="certifications" element={<CertificationsAdminPage />} />
              <Route path="achievements" element={<AchievementsAdminPage />} />
              <Route path="blog" element={<BlogAdminPage />} />
              <Route path="testimonials" element={<TestimonialsAdminPage />} />
              <Route path="messages" element={<MessagesAdminPage />} />
              <Route path="settings" element={<SettingsAdminPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
