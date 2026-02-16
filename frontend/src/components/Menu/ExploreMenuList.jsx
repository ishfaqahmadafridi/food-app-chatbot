import React from 'react'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenuList = ({category,setCategory}) => {
    return (
        <div className="flex gap-4 md:gap-6 justify-start text-center my-5 mx-0 overflow-x-scroll scrollbar-hide">
            {
                menu_list.map((item, index) => {
                    return (
                        <div 
                            className="w-[9.7vw] min-w-80px cursor-pointer transition-all duration-500 shrink-0" 
                            key={index} 
                            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
                        >
                            <img 
                                className={category === item.menu_name ? 'border-4 border-tomato-500 p-0.5 rounded-full' : 'rounded-full'} 
                                src={item.menu_image} 
                                alt={item.menu_name} 
                            />
                            <p className="text-gray-600 mt-2 text-[max(1.4vw,14px)] cursor-pointer">{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ExploreMenuList
