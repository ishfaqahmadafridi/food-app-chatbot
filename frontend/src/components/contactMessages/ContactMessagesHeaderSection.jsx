import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import MessagesHeader from './MessagesHeader' // your existing component

const ContactMessagesHeaderSection = ({ messages, isLoading }) => {
  const navigate = useNavigate()

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    replied: messages.filter(m => m.status === 'replied').length,
    archived: messages.filter(m => m.status === 'archived').length,
  }

  return (
    <>
      <button
        onClick={() => navigate('/admin')}
        className="mb-6 flex items-center gap-2 text-gray-700 hover:text-[#667eea] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Admin Panel</span>
      </button>

      <MessagesHeader stats={stats} isLoading={isLoading} />
    </>
  )
}

export default ContactMessagesHeaderSection