import React from 'react'

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 5, required = false }) => {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all resize-none'
                required={required}
            ></textarea>
        </div>
    )
}

export default FormTextarea
