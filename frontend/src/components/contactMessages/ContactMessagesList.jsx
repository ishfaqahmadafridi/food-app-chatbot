import React from 'react'
import { Loader2 } from 'lucide-react'
import MessageCard from './MessageCard' // your existing component

const ContactMessagesList = ({ filteredMessages, onViewDetails, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#667eea]" />
      </div>
    )
  }

  if (filteredMessages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No messages found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMessages.map(message => (
        <MessageCard
          key={message.id}
          message={message}
          onViewDetails={() => onViewDetails(message)}
        />
      ))}
    </div>
  )
}

export default ContactMessagesList