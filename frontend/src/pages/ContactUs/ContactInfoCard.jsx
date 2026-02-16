import React from 'react'

const ContactInfoCard = ({ icon: Icon, title, line1, line2 }) => {
    return (
        <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'>
            <div className='flex items-center justify-center w-14 h-14 bg-linear-to-br from-[#667eea] to-[#764ba2] rounded-full mb-4 mx-auto'>
                <Icon className='text-white' size={24} />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 text-center mb-2'>{title}</h3>
            <p className='text-gray-600 text-center text-sm'>{line1}</p>
            <p className='text-gray-600 text-center text-sm'>{line2}</p>
        </div>
    )
}

export default ContactInfoCard
