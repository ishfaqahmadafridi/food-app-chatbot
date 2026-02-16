import React from 'react'

const ItemPriceSection = ({ priceLabel }) => {
    return (
        <div className="mb-7">
            <span className="text-3xl font-bold text-red-500">Rs. {priceLabel}</span>
        </div>
    )
}

export default ItemPriceSection;
