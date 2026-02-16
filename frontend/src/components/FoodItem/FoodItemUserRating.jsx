import React, { useState } from 'react'
import { Star } from 'lucide-react'
import './FoodItem.css'
import api from '../../services/api'
import toast from 'react-hot-toast'

const FoodItemUserRating = ({ id, rating, setRating, ratingCount, setRatingCount }) => {
    const [userRating, setUserRating] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [hoverRating, setHoverRating] = useState(0)

    const handleRating = async (newRating) => {
        const userToken = localStorage.getItem('userToken')
        if (!userToken) {
            toast.error('Please sign in to rate items')
            return
        }

        setSubmitting(true)
        try {
            const response = await api.post(`/items/${id}/rate/`, { rating: newRating })
            if (response.data) {
                setRating(response.data.average_rating || rating)
                setRatingCount(response.data.rating_count || ratingCount)
                setUserRating(newRating)
                toast.success('✓ Rating submitted!')
            }
        } catch (error) {
            console.error('Error submitting rating:', error)
            if (error.response?.status === 401) {
                toast.error('Please sign in to rate items')
            } else {
                toast.error('Failed to submit rating')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="my-2.5 py-2.5 border-t border-b border-gray-200" onClick={(e) => e.stopPropagation()}>
            <p className='text-xs mb-1.5 font-medium text-gray-700'>Rate this item:</p>
            <div className="flex gap-1.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`bg-transparent border-0 cursor-pointer p-0 flex items-center transition-transform hover:scale-125 disabled:opacity-60 disabled:cursor-not-allowed`}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={submitting}
                        title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                        <Star
                            size={18}
                            fill={star <= (hoverRating || userRating) ? '#FFD700' : 'none'}
                            stroke={star <= (hoverRating || userRating) ? '#FFD700' : '#ccc'}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FoodItemUserRating
