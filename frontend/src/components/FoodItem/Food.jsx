import React from 'react'

const Food_info = ({ name, description, price }) => {
    const normalizedPrice = Number(price);
    const priceLabel = Number.isFinite(normalizedPrice)
        ? Math.floor(normalizedPrice)
        : '0';
        
    return (
        <>
            <div className="p-5">
                <h3 className='text-base font-semibold text-gray-800 mb-2'>{name}</h3>
                <p className='text-xs text-gray-600 mb-2.5'>{description}</p>
                <p className="text-[22px] font-medium my-2.5 text-tomato-500">Rs. {priceLabel}</p>
            </div>

        </>
    )
}

export default Food_info
