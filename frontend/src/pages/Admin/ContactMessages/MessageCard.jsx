import React from 'react'
import { Mail, Phone, Calendar } from 'lucide-react'
import MessageStatusBadge from './MessageStatusBadge'

const MessageCard = ({ message, onViewDetails }) => {
    const { name, email, phone, message: text, status, created_at_formatted } = message

    return (
        <div className='bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-200'>
            <div className='flex justify-between items-start mb-3'>
                <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-1'>{name}</h3>
                    <div className='flex items-center gap-2 text-sm text-gray-600 mb-1'>
                        <Mail size={14} />
                        <span>{email}</span>
                    </div>
                    {phone && (
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Phone size={14} />
                            <span>{phone}</span>
                        </div>
                    )}
                </div>
                <MessageStatusBadge status={status} />
            </div>

            <p className='text-gray-700 text-sm mb-3 line-clamp-2'>
                {text}
            </p>

            <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
                <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Calendar size={12} />
                    <span>{created_at_formatted || 'Just now'}</span>
                </div>
                <button
                    onClick={() => onViewDetails(message)}
                    className='text-sm text-[#667eea] hover:text-[#764ba2] font-medium transition-colors'
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export default MessageCard
