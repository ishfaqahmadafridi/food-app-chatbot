import React from 'react'
import MessagesFilterTabs from './MessagesFilterTabs' // your existing component

const ContactMessagesFilters = ({ activeFilter, onFilterChange, counts }) => {
  return (
    <MessagesFilterTabs
      activeFilter={activeFilter}
      onFilterChange={onFilterChange}
      counts={counts}
    />
  )
}

export default ContactMessagesFilters