import React, { useContext, useState } from 'react'
import { StoreContext } from "../../context/StoreContext";
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const PlaceOrder = () => {

  const {getTotalCartAmount}=useContext(StoreContext);
  const isLoggedIn = Boolean(localStorage.getItem('userToken'));
  const [distance, setDistance] = useState(0);

  // Calculate delivery fee: Base fee of 50 rupees + 10 rupees per km
  const calculateDeliveryFee = () => {
    if (distance <= 0) return 50;
    return 50 + (distance * 10);
  };

  const deliveryFee = calculateDeliveryFee();

  const handleSubmit = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error('No guest option. Please sign up or sign in first.');
    }
  };

  return (
    <>
      <form className='flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 mt-20 md:mt-24 px-4 md:pr-12' onSubmit={handleSubmit}>
        <div className="w-full max-w-500px">
          <p className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12">Delivery Information</p>
          <div className="flex gap-2.5 mb-2.5">
            <Input type="text" placeholder='First Name' />
            <Input type="text" placeholder='Last Name' />
          </div>
          <Input type="email" placeholder='Email Address' className="mb-2.5" />
          <Input type="text" placeholder='Street' className="mb-2.5" />

          <div className="flex gap-2.5 mb-2.5">
            <Input type="text" placeholder='City' />
            <Input type="text" placeholder='Province' />
          </div>

          <div className="flex gap-2.5 mb-2.5">
            <Input type="text" placeholder='Zip code' />
            <Input type="text" placeholder='Country' />
          </div>
          <Input type="text" placeholder='Phone' className="mb-2.5" />
          <Input
            type="number" 
            placeholder='Distance from restaurant (km)' 
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            min="0"
            step="0.1"
            className="mb-2.5"
          />

        </div>
        <div className="w-full max-w-500px">

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Cart Total</h2>
            <div>
              <div className='flex justify-between text-gray-600'>
                <p>SubTotal</p>
                <p>Rs. {Math.floor(getTotalCartAmount())}</p>
              </div>
              <hr className="my-2.5 border-0 border-t border-gray-300" />
              <div className='flex justify-between text-gray-600'>
                <p>Delivery Fee</p>
                <p>Rs. {Math.floor(deliveryFee)} {distance > 0 && <span className="text-xs text-gray-500">({distance} km)</span>}</p>
              </div>
              <hr className="my-2.5 border-0 border-t border-gray-300" />
              <div className='flex justify-between text-gray-600'>
                <p>Total</p>
                <p>Rs. {Math.floor(getTotalCartAmount() + deliveryFee)}</p>
              </div>
            </div>
            <button 
              disabled={!isLoggedIn}
              className="mt-7 border-0 text-white bg-tomato-500 w-full md:w-[clamp(200px,15vw,300px)] py-3 rounded cursor-pointer text-base transition-colors hover:bg-tomato-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </button>
          </div>
          </div>

      </form>
    </>
  )
}

export default PlaceOrder
