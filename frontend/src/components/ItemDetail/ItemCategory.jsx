import React from 'react'

const ItemCategory = ({ item }) => {
    return (
        <div>
            <p className="text-sm text-gray-500 mb-5">
                <strong>Category:</strong> {item.category_name || item.category}
            </p>
        </div>
    )
}

export default ItemCategory;
