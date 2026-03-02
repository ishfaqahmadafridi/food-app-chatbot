import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { checkAdminAccess } from '@/redux/features/admin/adminAccess/adminAccessThunk'

import AdminGuardAndLoading from '../../../components/contactMessages/AdminGuardAndLoading'
import MessagesMainView from '../../../components/contactMessages/MessagesMainView'

const ContactMessages = () => {
  const dispatch = useDispatch()

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(checkAdminAccess()).unwrap()
        await fetchMessages()
      } catch (error) {
        console.error('Admin access check failed:', error)
        setIsLoading(false)
      }
    }

    initialize()
  }, [dispatch])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const api = (await import('@/services/api')).default
      const response = await api.get('/contact/')
      if (response.data?.success) {
        setMessages(response.data.messages || [])
      }
    } catch (error) {
      console.error('Failed to load contact messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminGuardAndLoading isLoading={isLoading}>
      <MessagesMainView
        messages={messages}
        isLoading={isLoading}
        setMessages={setMessages}
      />
    </AdminGuardAndLoading>
  )
}

export default ContactMessages;