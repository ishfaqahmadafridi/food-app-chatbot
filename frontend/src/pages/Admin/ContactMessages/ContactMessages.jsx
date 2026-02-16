import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MessagesHeader from './MessagesHeader'
import MessagesFilterTabs from './MessagesFilterTabs'
import MessageCard from './MessageCard'
import MessageDetailModal from './MessageDetailModal'
import api from '@/services/api'
import toast from 'react-hot-toast'
import { Loader2, ArrowLeft } from 'lucide-react'

const ContactMessages = () => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [filteredMessages, setFilteredMessages] = useState([])
    const [activeFilter, setActiveFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        replied: 0,
        archived: 0
    })

    const fetchMessages = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/contact/')
            if (response.data.success) {
                setMessages(response.data.messages)
                calculateStats(response.data.messages)
                filterMessages(response.data.messages, activeFilter)
            }
        } catch (error) {
            console.error('Error fetching messages:', error)
            toast.error('Failed to load messages')
        } finally {
            setIsLoading(false)
        }
    }

    const calculateStats = (messagesData) => {
        const newStats = {
            total: messagesData.length,
            new: messagesData.filter(m => m.status === 'new').length,
            replied: messagesData.filter(m => m.status === 'replied').length,
            archived: messagesData.filter(m => m.status === 'archived').length
        }
        setStats(newStats)
    }

    const filterMessages = (messagesData, filter) => {
        if (filter === 'all') {
            setFilteredMessages(messagesData)
        } else {
            setFilteredMessages(messagesData.filter(m => m.status === filter))
        }
    }

    const handleFilterChange = (filter) => {
        setActiveFilter(filter)
        filterMessages(messages, filter)
    }

    const handleViewDetails = (message) => {
        setSelectedMessage(message)
    }

    const handleCloseModal = () => {
        setSelectedMessage(null)
    }

    const handleUpdateMessage = () => {
        fetchMessages()
    }

    useEffect(() => {
        fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader2 className='w-8 h-8 animate-spin text-[#667eea]' />
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 p-6'>
            <div className='max-w-7xl mx-auto'>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin')}
                    className='mb-6 flex items-center gap-2 text-gray-700 hover:text-[#667eea] transition-colors'
                >
                    <ArrowLeft size={20} />
                    <span className='font-medium'>Back to Admin Panel</span>
                </button>

                <MessagesHeader stats={stats} />
                
                <MessagesFilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                    counts={{
                        all: stats.total,
                        new: stats.new,
                        read: messages.filter(m => m.status === 'read').length,
                        replied: stats.replied,
                        archived: stats.archived
                    }}
                />

                {/* Messages Grid */}
                {filteredMessages.length === 0 ? (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 text-lg'>No messages found</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredMessages.map((message) => (
                            <MessageCard
                                key={message.id}
                                message={message}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedMessage && (
                <MessageDetailModal
                    message={selectedMessage}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateMessage}
                />
            )}
        </div>
    )
}

export default ContactMessages
