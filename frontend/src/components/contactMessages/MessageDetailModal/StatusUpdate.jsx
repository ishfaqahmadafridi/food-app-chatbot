import React from 'react'
import api from '../../../services/api'
import toast from 'react-hot-toast'

const StatusUpdate = ({ message, selectedStatus, setSelectedStatus, isUpdating, setIsUpdating, onUpdate, onClose }) => {
        const handleStatusUpdate = async () => {
        setIsUpdating(true)
        try {
            const response = await api.patch(`/contact/${message.id}/update_status/`, {
                status: selectedStatus
            })

            if (response.data.success) {
                toast.success('Status updated successfully')
                onUpdate()
                onClose()
            }
        } catch (error) {
            console.error('Error updating status:', error)
            toast.error('Failed to update status')
        } finally {
            setIsUpdating(false)
        }
    }

  return (
    <>
                          {/* Status Update */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Update Status
                        </label>
                        <div className='flex gap-3 items-center'>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea]'
                            >
                                <option value='new'>New</option>
                                <option value='read'>Read</option>
                                <option value='replied'>Replied</option>
                                <option value='archived'>Archived</option>
                            </select>
                            <button
                                onClick={handleStatusUpdate}
                                disabled={isUpdating || selectedStatus === message.status}
                                className='px-6 py-2 bg-linear-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {isUpdating ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </div>
    </>
  )
}

export default StatusUpdate
