import React from 'react'

const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'read', label: 'Read' },
    { id: 'replied', label: 'Replied' },
    { id: 'archived', label: 'Archived' }
]

const MessagesFilterTabs = ({ activeFilter, onFilterChange, counts = {} }) => {
    return (
        <div className='flex gap-2 overflow-x-auto pb-2 mb-6'>
            {filterTabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onFilterChange(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                        activeFilter === tab.id
                            ? 'bg-linear-to-r from-[#667eea] to-[#764ba2] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {tab.label}
                    {counts[tab.id] !== undefined && (
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            activeFilter === tab.id
                                ? 'bg-white bg-opacity-30'
                                : 'bg-gray-200'
                        }`}>
                            {counts[tab.id]}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

export default MessagesFilterTabs
