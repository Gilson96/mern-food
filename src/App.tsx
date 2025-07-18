import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/useAuth';

// import HomePage from '@/pages/HomePage';
import LoginPage from './components/login/loginPage';
import { Toaster } from 'sonner';
// import AdminDashboard from '@/pages/admin/AdminDashboard';
// import UserProfile from '@/pages/user/UserProfile';
// import NotFound from '@/pages/NotFound';

function App() {
  const { role } = useAuth(); // "admin" | "user" | "guest"

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Public */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<LoginPage />} />

          {/* User-only */}
          {/* {role === 'user' && <Route path="/profile" element={<UserProfile />} />} */}

          {/* Admin-only */}
          {/* {role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />} */}

          {/* Catch-all */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
