import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './features/auth/useAuth';
import LoginPage from './components/login/loginPage';
import { Toaster } from 'sonner';
import HomePage from './components/home/homePage';
import GuestAddressPage from './components/home/guestAddressPage';
import RestaurantPage from './components/restaurant/restaurantPage';
import CheckoutPage from './components/checkout/checkout';
import ProfilePage from './components/profile/profilePage';
import NotFound from './components/notFound';
import Footer from './components/Footer';

function App() {
  const { role } = useAuth();

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Guest-only */}
          {role === 'guest' && <Route path="/guestAddress" element={<GuestAddressPage />} />}
          {/* User-only */}
          {role !== 'guest' && <Route path="/profile" element={<ProfilePage />} />}
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;
