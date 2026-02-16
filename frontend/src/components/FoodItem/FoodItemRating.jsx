import React from 'react'
import { useNavigate } from 'react-router-dom'
import './FoodItem.css'

const FoodItemRating = ({ id, name, rating }) => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center mb-2.5">
            <p 
                className="text-xl font-medium text-gray-500 cursor-pointer hover:text-[#667eea] transition-colors" 
                onClick={() => navigate(`/item/${id}`)}
            >
                {name}
            </p>
            <div className="flex items-center gap-1 whitespace-nowrap ml-1 from-[#fff9e6] to-[#fff5cc] px-2 py-1 rounded-md shadow-[0px_2px_4px_rgba(255,215,0,0.2)]">
                <span className="text-lg text-orange-500 font-bold m-0 tracking-wide">⭐ {rating.toFixed(1)}</span>
            </div>
        </div>
    )
}

export default FoodItemRating
