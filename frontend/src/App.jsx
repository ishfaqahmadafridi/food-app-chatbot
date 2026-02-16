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
import ItemDetail from './pages/ItemDetail/ItemDetail';
import Contact from './pages/ContactUs/Contact';
import ContactMessages from './pages/Admin/ContactMessages/ContactMessages';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname])

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
