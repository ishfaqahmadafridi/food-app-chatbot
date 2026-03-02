import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const AdminGuardAndLoading = ({ children, isLoading }) => {
  const navigate = useNavigate()
  const { user, loading: adminLoading, error: adminError } = useSelector(
    (state) => state.adminAccess
  )

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (adminError || !user || !user.is_staff) {
    navigate('/')
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#667eea]" />
      </div>
    )
  }

  return children
}

export default AdminGuardAndLoading