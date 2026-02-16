import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const AdminButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('/admin')}
      variant="blue"
      size='lg'
      className='rounded-[15px] w-full'
    >
      Admin Panel
    </Button>
  )
}

export default AdminButton
