import React from 'react'

const Footer = ({ onClose }) => {
    return (
        <>
            {/* Footer */}
            <div className='bg-gray-50 p-4 rounded-b-xl flex justify-end'>
                <button
                    onClick={onClose}
                    className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                >
                    Close
                </button>
            </div>
        </>
    )
}

export default Footer
