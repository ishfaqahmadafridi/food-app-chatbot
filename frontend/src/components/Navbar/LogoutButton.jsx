import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    if (onLogout) onLogout()
    navigate('/')
  }

  return (
    <Button
      onClick={handleLogout} 
      variant="blue"
      size='lg'
      className='rounded-[15px] w-full'
    >
      Logout
    </Button>
  )
}

export default LogoutButton
