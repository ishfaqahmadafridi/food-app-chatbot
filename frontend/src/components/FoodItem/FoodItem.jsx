import React from 'react'
import { useNavigate } from 'react-router-dom'
import Fooditem_imgContainer from './FoodIteImgContainer'
import Food_info from './Food'


const FoodItem = ({ id, name, price, description, image }) => {
  const navigate = useNavigate()

  return (
    <div 
      className='w-full mx-auto rounded-[15px] shadow-[0px_0px_10px_rgba(0,0,0,0.08)] transition-all duration-300 animate-[fadeIn_0.5s] overflow-hidden hover:-translate-y-1 hover:shadow-[0px_5px_20px_rgba(0,0,0,0.15)] cursor-pointer'
      onClick={() => navigate(`/item/${id}`)}
    >
      <Fooditem_imgContainer id={id} name={name} img={image} />
      <Food_info name={name} description={description} price={price} />
    </div>
  )
}

export default FoodItem;
