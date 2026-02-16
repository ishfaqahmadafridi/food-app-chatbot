import React, { useState } from 'react'
import { X, Mail, Phone, Calendar, Tag } from 'lucide-react'
import MessageStatusBadge from './MessageStatusBadge'
import api from '@/services/api'
import toast from 'react-hot-toast'

const MessageDetailModal = ({ message, onClose, onUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(message.status)

    const handleStatusUpdate = async () => {
        setIsUpdating(true)
        try {
            const response = await api.patch(`/contact/${message.id}/update_status/`, {
                status: selectedStatus
            })
            
            if (response.data.success) {
                toast.success('Status updated successfully')
                onUpdate()
                onClose()
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        } finally {
            setIsUpdating(false)
        }
    }

    if (!message) return null

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
                {/* Header */}
                <div className='bg-linear-to-r from-[#667eea] to-[#764ba2] text-white p-6 flex justify-between items-start rounded-t-xl'>
                    <div>
                        <h2 className='text-2xl font-bold mb-2'>Message Details</h2>
                        <p className='text-sm opacity-90'>From: {message.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className='text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors'
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className='p-6 space-y-6'>
                    {/* Contact Info */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Mail size={20} className='text-[#667eea]' />
                            <div>
                                <p className='text-xs text-gray-600'>Email</p>
                                <p className='text-sm font-medium'>{message.email}</p>
                            </div>
                        </div>
                        
                        {message.phone && (
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                <Phone size={20} className='text-[#667eea]' />
                                <div>
                                    <p className='text-xs text-gray-600'>Phone</p>
                                    <p className='text-sm font-medium'>{message.phone}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Calendar size={20} className='text-[#667eea]' />
                            <div>
                                <p className='text-xs text-gray-600'>Received</p>
                                <p className='text-sm font-medium'>{message.created_at_formatted}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Tag size={20} className='text-[#667eea]' />
                            <div>
                                <p className='text-xs text-gray-600'>Status</p>
                                <MessageStatusBadge status={message.status} />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Message
                        </label>
                        <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                            <p className='text-gray-800 whitespace-pre-wrap'>{message.message}</p>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Update Status
                        </label>
                        <div className='flex gap-3 items-center'>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea]'
                            >
                                <option value='new'>New</option>
                                <option value='read'>Read</option>
                                <option value='replied'>Replied</option>
                                <option value='archived'>Archived</option>
                            </select>
                            <button
                                onClick={handleStatusUpdate}
                                disabled={isUpdating || selectedStatus === message.status}
                                className='px-6 py-2 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isUpdating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>

                    {/* Admin Notes */}
                    {message.admin_notes && (
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Admin Notes
                            </label>
                            <div className='bg-yellow-50 rounded-lg p-4 border border-yellow-200'>
                                <p className='text-gray-800'>{message.admin_notes}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className='bg-gray-50 p-4 rounded-b-xl flex justify-end'>
                    <button
                        onClick={onClose}
                        className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessageDetailModal
