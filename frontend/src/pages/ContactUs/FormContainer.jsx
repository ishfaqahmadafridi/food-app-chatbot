import React from 'react'

const FormContainer = ({ title, children, onSubmit }) => {
    return (
        <div className='bg-white rounded-xl shadow-lg p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>{title}</h2>
            <form onSubmit={onSubmit} className='space-y-5'>
                {children}
            </form>
        </div>
    )
}

export default FormContainer
