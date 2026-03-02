import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import toast from 'react-hot-toast'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'

const CounterSection = ({ id }) => {
    const {  cartItems, addToCart, removeFromCart } = useContext(StoreContext)

    return (
        <div className="mb-7">
            {!cartItems[id] ? (
                <button
                    className="bg-linear-to-r from-[#667eea] to-[#764ba2] text-white border-0 py-3 px-7 text-base font-semibold rounded-lg cursor-pointer flex items-center gap-2.5 transition-all hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_rgba(102,126,234,0.4)]"
                    onClick={() => {
                        addToCart(id)
                        toast.success('Item added to cart!')
                    }}
                >
                    <img src={assets.add_icon_green} alt="Add" className="w-5 h-5" /> Add to Cart
                </button>
            ) : (
                <div className="flex items-center gap-4 bg-white py-2.5 px-4 rounded-lg border-2 border-[#667eea] w-fit">
                    <button onClick={() => removeFromCart(id)} className="bg-none border-0 cursor-pointer p-1 flex items-center justify-center">
                        <img src={assets.remove_icon_red} alt="Remove" className="w-6 h-6" />
                    </button>
                    <span className="text-base font-semibold min-w-30px text-center">{cartItems[id]}</span>
                    <button onClick={() => addToCart(id)} className="bg-none border-0 cursor-pointer p-1 flex items-center justify-center">
                        <img src={assets.add_icon_green} alt="Add" className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default CounterSection;
