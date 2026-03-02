import React from 'react'
import { Clock } from 'lucide-react'
import BusinessHoursRow from './BusinessHoursRow'

const BusinessHours = () => {
    return (
        <div className='bg-white rounded-xl shadow-lg p-8'>
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 bg-linear-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center'>
                    <Clock className='text-white' size={24} />
                </div>
                <h2 className='text-2xl font-bold text-gray-800'>Business Hours</h2>
            </div>
            
            <div className='space-y-3'>
                <BusinessHoursRow 
                    day="Monday - Friday" 
                    hours="9:00 AM - 10:00 PM" 
                />
                <BusinessHoursRow 
                    day="Saturday" 
                    hours="10:00 AM - 11:00 PM" 
                />
                <BusinessHoursRow 
                    day="Sunday" 
                    hours="10:00 AM - 9:00 PM" 
                    showBorder={false}
                />
            </div>
            
            <div className='mt-6 p-4 bg-linear-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-lg'>
                <p className='text-sm text-gray-700 text-center'>
                    <strong>Note:</strong> Last orders 30 minutes before closing
                </p>
            </div>
        </div>
    )
}

export default BusinessHours
