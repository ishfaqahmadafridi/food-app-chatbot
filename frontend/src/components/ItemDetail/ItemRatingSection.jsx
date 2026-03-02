import React from 'react'

const ItemRatingSection = ({ rating, ratingCount }) => {
    return (
        <div className="mb-5">
            <div className="flex items-center gap-2">
                <span className="text-xl text-yellow-400 font-semibold">⭐ {rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 font-medium">({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})</span>
            </div>
        </div>
    )
}

export default ItemRatingSection
