import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from './context/StoreContext';

// Pages
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Placeorder/PlaceOrder';
import Chatbot from './pages/Chatbot/Chatbot';
import Admin from './pages/Admin/Admin';
import Profile from './pages/Profile/Profile';
import Menu from './pages/Menu/Menu';
import ItemDetail from './pages/itemDetial/ItemDetail';
import Contact from './pages/ContactUs/Contact';
import ContactMessages from './pages/Admin/ContactMessages/ContactMessages';
import Navbar from './components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './redux/features/profile/profileData/profileDataThunk';
import LoadingState from './components/profile/profileloadingState/LoadingState';

function App() {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.profileData);

  // Fetch the user profile when the component mounts (only if not already fetched)
  useEffect(() => {
    if (!user) {  // Fetch user profile only if it doesn't exist in Redux state
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);  // Only re-run if `user` is not already available

  // Show loading state while fetching profile data
  if (loading && !user) {
    return <LoadingState />;
  }

  return (
    <StoreProvider>
      <div className="App">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/contact" element={<Contact />} />

          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/contacts" element={<ContactMessages />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;