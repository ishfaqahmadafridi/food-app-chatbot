import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Page_nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('home');

  // Update active menu based on current path
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveMenu('home');
    } else if (location.pathname === '/menu') {
      setActiveMenu('menu');
    } else if (location.pathname === '/chatbot') {
      setActiveMenu('chatbot');
    } else if (location.pathname === '/contact') {
      setActiveMenu('contact');
    } else {
      setActiveMenu('');
    }
  }, [location.pathname]);

  const handleScrollTo = (sectionId, menuName) => {
    setActiveMenu(menuName);
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ul className="flex space-x-6 p-0 m-0 list-none">
      <li className={`cursor-pointer ${activeMenu === 'home' ? 'text-[#ff7675] font-semibold border-b-2 border-[#ff7675] pb-1' : 'text-[#262626]'} `}>
        <Link to='/' onClick={() => setActiveMenu('home')}>Home</Link>
      </li>
      <li className={`cursor-pointer ${activeMenu === 'menu' ? 'text-[#ff7675] font-semibold border-b-2 border-[#ff7675] pb-1' : 'text-[#262626]'} `}>
        <Link to='/menu' onClick={() => setActiveMenu('menu')}>Menu</Link>
      </li>
      <li className={`cursor-pointer ${activeMenu === 'chatbot' ? 'text-[#ff7675] font-semibold border-b-2 border-[#ff7675] pb-1' : 'text-[#262626]'} `}>
        <Link to='/chatbot' onClick={() => setActiveMenu('chatbot')}>Chatbot</Link>
      </li>
      <li className={`cursor-pointer ${activeMenu === 'mobile-app' ? 'text-[#ff7675] font-semibold border-b-2 border-[#ff7675] pb-1' : 'text-[#262626]'} `}>
        <a onClick={() => handleScrollTo('app-download', 'mobile-app')}>Mobile-app</a>
      </li>
      <li className={`cursor-pointer ${activeMenu === 'contact' ? 'text-[#ff7675] font-semibold border-b-2 border-[#ff7675] pb-1' : 'text-[#262626]'} `}>
        <Link to='/contact' onClick={() => setActiveMenu('contact')}>Contact us</Link>
      </li>
    </ul>

  );
};

export default Page_nav;
