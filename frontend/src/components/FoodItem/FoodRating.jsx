import React, { useState } from 'react'
import './FoodItem.css'
import FoodItemRating from './FoodItemRating'
import FoodItemUserRating from './FoodItemUserRating'

const Fooditem_rating = ({ id, name, rating: initialRating, rating_count: initialRatingCount = 0 }) => {
    const [rating, setRating] = useState(initialRating || 4.5)
    const [ratingCount, setRatingCount] = useState(initialRatingCount)

    return (
        <>
            <FoodItemRating id={id} name={name} rating={rating} />
            <FoodItemUserRating 
                id={id} 
                rating={rating} 
                setRating={setRating} 
                ratingCount={ratingCount} 
                setRatingCount={setRatingCount} 
            />
        </>
    )
}

export default Fooditem_rating
