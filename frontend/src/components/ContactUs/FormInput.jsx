import React from 'react'

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required = false }) => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all'
                required={required}
            />
        </div>
    )
}

export default FormInput
