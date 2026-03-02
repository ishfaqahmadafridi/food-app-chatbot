import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BackToHome = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-none border-0 text-[#667eea] text-base font-medium cursor-pointer mb-7 transition-colors hover:text-[#764ba2]">
        <ArrowLeft size={20} /> Back to Home
      </button> 
    </div>
  )
}

export default BackToHome
