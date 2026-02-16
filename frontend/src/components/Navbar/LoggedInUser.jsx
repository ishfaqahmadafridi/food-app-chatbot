import React, { useState, useEffect } from 'react'
import Login from '../Login/Login'
import userApi from '../../services/user'
import CartIcon from './CartIcon'
import ProfileButton from './ProfileButton'
import AdminButton from './AdminButton'
import LogoutButton from './LogoutButton'
import SignInButton from './SignInButton'

const Logged_inUser = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('userToken')))
    const [showLogin, setShowLogin] = useState(false)

    
  // Fetch admin status from API when component mounts or user logs in
  useEffect(() => {
    const fetchUserAdmin = async () => {
      const token = localStorage.getItem('userToken')
      if (token) {
        try {
          const user = await userApi.getCurrentProfile()
          setIsAdmin(user.is_staff || false)
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
    }

    fetchUserAdmin()

    // Listen for changes when user logs in/out
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('userToken')))
      fetchUserAdmin()
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

    return (
        <>
        {showLogin && <Login setLogin={setShowLogin} />}
            {isLoggedIn ? (
            <>
              <CartIcon />
              <ProfileButton />
              {isAdmin && <AdminButton />}
              <LogoutButton onLogout={() => { setIsLoggedIn(false); setIsAdmin(false); }} />
            </>
          ) : (
            <>
              <CartIcon />
              <SignInButton onClick={() => setShowLogin(true)} />
            </>
          )}
        </>
    )
}

export default Logged_inUser;
