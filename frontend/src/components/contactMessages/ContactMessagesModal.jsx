import React from 'react'
import MessageDetailModal from './MessageDetailModal/MessageDetailModal' // your existing component

const ContactMessagesModal = ({ selectedMessage, onClose, onUpdate }) => {
  if (!selectedMessage) return null

  return (
    <MessageDetailModal
      message={selectedMessage}
      onClose={onClose}
      onUpdate={onUpdate}
    />
  )
}

export default ContactMessagesModal