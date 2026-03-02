import React from 'react'
import { MessageSquare, Mail, CheckCircle, Archive } from 'lucide-react'

const StatCard = ({ icon: Icon, label, count, color }) => {
    return (
        <div className='bg-white rounded-lg shadow-md p-4 flex items-center gap-3'>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                <Icon size={24} className='text-white' />
            </div>
            <div>
                <p className='text-2xl font-bold text-gray-800'>{count}</p>
                <p className='text-sm text-gray-600'>{label}</p>
            </div>
        </div>
    )
}

const MessagesHeader = ({ stats }) => {
    return (
        <div className='mb-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Contact Messages</h1>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard
                    icon={MessageSquare}
                    label='Total Messages'
                    count={stats.total || 0}
                    color='bg-linear-to-br from-purple-500 to-purple-600'
                />
                <StatCard
                    icon={Mail}
                    label='New Messages'
                    count={stats.new || 0}
                    color='bg-linear-to-br from-blue-500 to-blue-600'
                />
                <StatCard
                    icon={CheckCircle}
                    label='Replied'
                    count={stats.replied || 0}
                    color='bg-linear-to-br from-green-500 to-green-600'
                />
                <StatCard
                    icon={Archive}
                    label='Archived'
                    count={stats.archived || 0}
                    color='bg-linear-to-br from-gray-500 to-gray-600'
                />
            </div>
        </div>
    )
}

export default MessagesHeader
