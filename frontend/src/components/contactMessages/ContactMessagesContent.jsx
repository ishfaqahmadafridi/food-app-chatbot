import React, { useState } from 'react'

import ContactMessagesFilters from './ContactMessagesFilters'
import ContactMessagesList from './ContactMessagesList'
import ContactMessagesModal from './ContactMessagesModal'

const ContactMessagesContent = ({ messages, isLoading }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const filteredMessages = activeFilter === 'all'
    ? messages
    : messages.filter(m => m.status === activeFilter)

  const counts = {
    all: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
    archived: messages.filter(m => m.status === 'archived').length,
  }

  return (
    <>
      <ContactMessagesFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      <ContactMessagesList
        filteredMessages={filteredMessages}
        onViewDetails={setSelectedMessage}
        isLoading={isLoading}
      />

      <ContactMessagesModal
        selectedMessage={selectedMessage}
        onClose={() => setSelectedMessage(null)}
        onUpdate={() => {
          // Optional: refetch or optimistic update
          setSelectedMessage(null)
        }}
      />
    </>
  )
}

export default ContactMessagesContent