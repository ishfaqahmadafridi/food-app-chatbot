import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { ArrowLeft } from 'lucide-react'
import BackToHome from './BackToHome'
import ItemDetailInfo from './itemDetailInfo'

const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { food_list } = React.useContext(StoreContext)

  const [item, setItem] = useState(null)
  const [rating, setRating] = useState(4.5)
  const [ratingCount, setRatingCount] = useState(0)

  useEffect(() => {
    const foundItem = food_list.find(food => food.id == id || food._id == id)
    if (foundItem) {
      setItem(foundItem)
      setRating(foundItem.average_rating || foundItem.rating || 4.5)
      setRatingCount(foundItem.rating_count || 0)
    }
  }, [id, food_list])

  if (!item) {
    return (
      <>
        <div className="min-h-[calc(100vh-150px)] max-w-1200px mx-auto py-7 px-5">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-6">Item not found</h2>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 bg-none border-0 text-[#667eea] text-base font-medium cursor-pointer mx-auto transition-colors hover:text-[#764ba2]">
              <ArrowLeft size={20} /> Back to Home
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-[calc(100vh-150px)] max-w-1200px mx-auto py-7 px-5">
        <BackToHome />
        <ItemDetailInfo 
          item={item} 
          rating={rating} 
          ratingCount={ratingCount} 
          setRating={setRating}
          setRatingCount={setRatingCount}
        />
      </div>
    </>
  )
}

export default ItemDetail;
