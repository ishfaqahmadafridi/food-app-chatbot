
import Header from '@/components/Header/Header'
import Message from './Message'
import StatusUpdate from './StatusUpdate'
import AdminNote from './AdminNote'
import ReplaySection from './ReplaySection'
import Footer from '@/components/Footer/Footer'
import React, { useState } from 'react';

const MessageDetailModal = ({ message, onClose, onUpdate }) => {
    const [selectedStatus, setSelectedStatus] = useState(message?.status || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>

                <Header message={message} onClose={onClose} />
                {/* Content */}
                <div className='p-6 space-y-6'>

                    <ContactInfo message={message} />

                     <Message message={message} />

                     <StatusUpdate message={message} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} isUpdating={isUpdating} setIsUpdating={setIsUpdating} onUpdate={onUpdate} onClose={onClose} />


                 <AdminNote message={message} onUpdate={onUpdate} />
                 <ReplaySection message={message} replyMessage={replyMessage} setReplyMessage={setReplyMessage} onUpdate={onUpdate} onClose={onClose} />
                </div>
                <Footer onClose={onClose} />
            </div>
        </div>
    )
}

export default MessageDetailModal
