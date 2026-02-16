import React, { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'






const Fooditem_imgContainer = ({ id, name, img }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
const getFallbackImage = () => {
    const fallbackImages = [
        assets.food_1, assets.food_2, assets.food_3, assets.food_4,
        assets.food_5, assets.food_6, assets.food_7, assets.food_8,
        assets.food_9, assets.food_10, assets.food_11, assets.food_12,
        assets.food_13, assets.food_14, assets.food_15, assets.food_16,
        assets.food_17, assets.food_18, assets.food_19, assets.food_20,
        assets.food_21, assets.food_22, assets.food_23, assets.food_24,
        assets.food_25, assets.food_26, assets.food_27, assets.food_28,
        assets.food_29, assets.food_30, assets.food_31, assets.food_32,
    ];
    const index = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[index];
};
const displayImage = img || getFallbackImage();
return (
    <>
        <div className="relative">
            <img src={displayImage} alt={name} className='w-full h-52 rounded-t-[15px] object-cover' />
            {
                !cartItems[id]
                    ? <button
                        className='w-35px h-35px absolute bottom-4 right-4 cursor-pointer rounded-full bg-transparent border-0 flex items-center justify-center transition-transform hover:scale-110 z-10'
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(id);
                        }}
                        title="Add to cart"
                    >
                        <img src={assets.add_icon_green} alt="Add to cart" className='w-full h-full object-contain' />
                    </button>
                    : <div className="absolute bottom-4 right-4 flex items-center gap-2.5 px-1.5 py-1.5 rounded-[50px] bg-white shadow-md z-10" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(id);
                            }}
                            className='bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center transition-transform hover:scale-110'
                        >
                            <img src={assets.remove_icon_red} alt="Remove from cart" className='w-30px h-30px object-contain' />
                        </button>
                        <p className='text-sm font-semibold min-w-20px text-center'>{cartItems[id]}</p>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(id);
                            }}
                            className='bg-transparent border-0 cursor-pointer p-0 flex items-center justify-center transition-transform hover:scale-110'
                        >
                            <img src={assets.add_icon_green} alt="Add to cart" className='w-30px h-30px] object-contain' />
                        </button>
                    </div>
            }
        </div>
    </>
)
}

export default Fooditem_imgContainer
