import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../services/api'
import { Star } from 'lucide-react'

const RatingSection = ({ id, rating, setRating, ratingCount, setRatingCount }) => {
    const [hoverRating, setHoverRating] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const [submitting, setSubmitting] = useState(false)


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
      toast.error('Failed to submit rating')
    } finally {
      setSubmitting(false)
    }
  }

    return (
        <div className="border-t border-b border-gray-200 py-5">
            <p className="text-sm font-medium mb-2.5">Rate this item:</p>
            <div className="flex gap-2.5 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`bg-none border-0 cursor-pointer p-0 flex items-center transition-transform hover:scale-110 disabled:opacity-60 disabled:cursor-not-allowed`}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={submitting}
                        title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                        <Star
                            size={24}
                            fill={star <= (hoverRating || userRating) ? '#FFD700' : 'none'}
                            stroke={star <= (hoverRating || userRating) ? '#FFD700' : '#ccc'}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default RatingSection;
