import React from 'react'
import { Badge } from '@/components/ui/badge'

const statusConfig = {
    new: { label: 'New', className: 'bg-blue-500 text-white' },
    read: { label: 'Read', className: 'bg-yellow-500 text-white' },
    replied: { label: 'Replied', className: 'bg-green-500 text-white' },
    archived: { label: 'Archived', className: 'bg-gray-500 text-white' }
}

const MessageStatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.new

    return (
        <Badge className={`${config.className} text-xs px-2 py-1`}>
            {config.label}
        </Badge>
    )
}

export default MessageStatusBadge
