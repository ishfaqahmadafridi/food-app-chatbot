import React from 'react'

const Header = ({ message, onClose }) => {
    return (
        <div>
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
        </div>
    )
}

export default Header
