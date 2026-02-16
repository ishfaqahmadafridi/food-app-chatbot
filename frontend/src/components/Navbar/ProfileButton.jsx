import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { Button } from '../ui/button'

const ProfileButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('/profile')}
      variant="blue"
      size='lg'
      className='rounded-[17px] w-full'
      >
      <User size={18} />
      Profile
    </Button>
  )
}

export default ProfileButton
