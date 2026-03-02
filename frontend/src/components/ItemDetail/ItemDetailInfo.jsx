import React from 'react'
import ItemRatingSection from './ItemRatingSection'
import ItemCategory from './ItemCategory'
import ItemPriceSection from './ItemPriceSection'
import CounterSection from './CounterSection'
import RatingSection from './RatingSection'

const ItemDetailInfo = ({ item, rating, ratingCount, setRating, setRatingCount }) => {
  const priceLabel = Math.floor(Number(item.price) || 0)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="h-300px md:h-500px rounded-2xl overflow-hidden shadow-[0px_0px_20px_rgba(0,0,0,0.08)]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="p-5">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{item.name}</h1>
        <ItemRatingSection rating={rating} ratingCount={ratingCount} />
        <p className="text-base text-gray-600 leading-relaxed mb-5">{item.description}</p>
        <ItemCategory item={item} />
        <ItemPriceSection priceLabel={priceLabel} />
        <CounterSection id={item.id} />
        <RatingSection 
          id={item.id} 
          rating={rating} 
          setRating={setRating} 
          ratingCount={ratingCount} 
          setRatingCount={setRatingCount} 
        />
      </div>
    </div>
  )
}

export default ItemDetailInfo;
