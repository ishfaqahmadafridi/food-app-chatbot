import React from 'react'

const BusinessHoursRow = ({ day, hours, showBorder = true }) => {
    return (
        <div className={`flex justify-between py-2 ${showBorder ? 'border-b border-gray-100' : ''}`}>
            <span className='font-medium text-gray-700'>{day}</span>
            <span className='text-gray-600'>{hours}</span>
        </div>
    )
}

export default BusinessHoursRow
