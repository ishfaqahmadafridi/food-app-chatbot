import React from 'react'

const AdminNote = ({ message }) => {
    return (
        <div>
            {/* Admin Notes */}
            {message.admin_notes && (
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                        Admin Notes
                    </label>
                    <div className='bg-yellow-50 rounded-lg p-4 border border-yellow-200'>
                        <p className='text-gray-800'>{message.admin_notes}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminNote
