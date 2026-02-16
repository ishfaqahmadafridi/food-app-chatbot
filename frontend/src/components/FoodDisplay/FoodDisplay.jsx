import React from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)

  return (
    <div className='mt-7' id='food-display'>
      <h2 className="text-[max(2vw,24px)] font-semibold">Top Dishes near you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-7 gap-7 row-gap-12 p-2.5">
        {
          food_list.map((item, index) => {
            if (category !== 'All' && (item.category_name || item.category) !== category) return null;
            const itemId = item.id ?? item._id;
            const itemRating = item.average_rating ?? item.rating ?? 4.5;
            const itemRatingCount = item.rating_count ?? 0;
            return (
              <FoodItem
                key={itemId ?? index}
                id={itemId}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                rating={itemRating}
                rating_count={itemRatingCount}
              />
            );
          })
        }
      </div>

    </div>
  )
}

export default FoodDisplay
