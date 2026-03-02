import React from 'react'

const ContactInfo = ({ message }) => {
    return (
        <div className='space-y-4'>
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
         </div>
    )
}

export default ContactInfo
