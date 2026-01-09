import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/login/loginPage';
import { Toaster } from 'sonner';
import HomePage from './components/home/homePage';
import RestaurantPage from './components/restaurant/restaurantPage';
import CheckoutPage from './components/checkout/checkout';
import ProfilePage from './components/profile/profilePage';
import NotFound from './components/notFound';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const role = useSelector((state: RootState) => state.auth.role);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />

          {role !== 'admin' && (
            <>
              <Route path="/checkout" element={<CheckoutPage />} />
            </>
          )}

          {role !== 'guest' && <Route path="/profile" element={<ProfilePage />} />}

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
