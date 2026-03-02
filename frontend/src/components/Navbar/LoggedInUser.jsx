
import Login from '../Login/Login'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import CartIcon from './CartIcon'
import ProfileButton from './ProfileButton'
import AdminButton from './AdminButton'
import LogoutButton from './LogoutButton'
import SignInButton from './SignInButton'

const Logged_inUser = () => {
  const { user } = useSelector((state) => state.profileData); // Access user data from Redux
  const [showLogin, setShowLogin] = useState(false);


    return (
        <>
        {showLogin && <Login setLogin={setShowLogin} />}
            {user ? (
            <>
              <CartIcon />
              <ProfileButton />
              {user.is_staff && <AdminButton />}
              <LogoutButton onLogout={() => { setShowLogin(false); }} />
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
