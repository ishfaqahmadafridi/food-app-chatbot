import React from 'react'

import ContactMessagesLayout from './ContactMessagesLayout'
import ContactMessagesHeaderSection from './ContactMessagesHeaderSection'
import ContactMessagesContent from './ContactMessagesContent'

const MessagesMainView = ({ messages, isLoading, setMessages }) => {
  return (
    <ContactMessagesLayout>
      <ContactMessagesHeaderSection
        messages={messages}
        isLoading={isLoading}
      />
      <ContactMessagesContent
        messages={messages}
        isLoading={isLoading}
        setMessages={setMessages}
      />
    </ContactMessagesLayout>
  )
}

export default MessagesMainView