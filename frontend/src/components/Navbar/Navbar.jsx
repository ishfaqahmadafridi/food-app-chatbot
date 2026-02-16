import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './LogoApp';
import Page_nav from './PageNav';
import Logged_inUser from './LoggedInUser';

const Navbar = () => {
  return (
    <div className='p-[12px_40px] flex items-center justify-between bg-[#f4f1f1] sticky top-0 z-50'>
      <Link to="/">
        <Logo />
      </Link>
      <Page_nav />
      <div className="navbar-right flex items-center gap-5">
        <Logged_inUser />
      </div>
    </div>
  );
};

export default Navbar;
