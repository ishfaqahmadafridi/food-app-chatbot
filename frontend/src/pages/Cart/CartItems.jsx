import React from 'react'
import { useContext } from 'react'
import { StoreContext } from "../../context/StoreContext";
import { Separator } from '@/components/ui/separator';

const Cart_items = () => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartItems,
    } = useContext(StoreContext);

    console.log('Cart Items:', cartItems);
    console.log('Food List:', food_list);
    console.log('Total Items in Cart:', getTotalCartItems());

    const hasItemsInCart = getTotalCartItems() > 0;

  return (
    <>
       <div className="w-full">
        {!hasItemsInCart ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">Your cart is empty</p>
            <p className="text-gray-500">Add some delicious items to your cart!</p>
          </div>
        ) : (
          <>
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-gray-800 text-[max(1vw,12px)] items-center font-semibold">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <Separator />

        {food_list.map((item) => {
          // Normalize itemId to string for consistent key usage
          const itemId = String(item.id || item._id);
          const itemQuantity = cartItems[itemId] || 0;
          console.log(`Item ${item.name} (ID: ${itemId}): Quantity = ${itemQuantity}`);

          if (itemQuantity > 0) {
            return (
              <div key={itemId}>
                <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] my-2.5 text-black items-center">
                  <img src={item.image} alt={item.name} className="w-50px h-50px object-cover rounded" />
                  <p>{item.name}</p>
                  <p>Rs. {Math.floor(item.price)}</p>
                  <p>{itemQuantity}</p>
                  <p>Rs. {Math.floor(item.price * itemQuantity)}</p>
                  <p
                    onClick={() => removeFromCart(itemId)}
                    className='cursor-pointer text-red-500 hover:scale-110 transition-transform font-bold text-lg'
                  >
                    ×
                  </p>
                </div>
                
                {/* Mobile View */}
                
                <div className="md:hidden flex items-center gap-3 my-4 p-3 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="text-gray-600 text-sm">Rs. {Math.floor(item.price)} × {itemQuantity}</p>
                    <p className="font-bold text-tomato-500 text-lg">Rs. {Math.floor(item.price * itemQuantity)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(itemId)}
                    className='cursor-pointer text-red-500 hover:scale-110 transition-transform font-bold text-2xl w-8 h-8 flex items-center justify-center'
                  >
                    ×
                  </button>
                </div>
                
                <Separator className="my-2" />
              </div>
            );
          }

          return null;
        })}
        </>
        )}
      </div>
    </>
  )
}

export default Cart_items;
