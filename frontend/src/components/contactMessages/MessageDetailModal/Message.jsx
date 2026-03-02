import React from 'react'

const Message = ({ message }) => {
    return (
        <>
            {/* Message */}
            <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Message
                </label>
                <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <p className='text-gray-800 whitespace-pre-wrap'>{message.message}</p>
                </div>
            </div>
        </>
    )
}

export default Message
