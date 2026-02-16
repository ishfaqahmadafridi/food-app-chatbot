import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';    

const Cart_total = () => {
    const navigate = useNavigate();
    const { getTotalCartAmount } = useContext(StoreContext);
    const subtotal = getTotalCartAmount();
    const deliveryFee = 50;
    const Total = subtotal + deliveryFee;

    return (
        <>
            <div className='mt-12 mb-8 flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-12'>
                <div className="flex flex-col gap-4 max-w-md">
                    <h2 className="text-xl md:text-2xl font-semibold">Cart Total</h2>
                    <div>
                        <div className='flex justify-between text-gray-600'>
                            <p>SubTotal</p>
                            <p>Rs. {Math.floor(subtotal)}</p>
                    </div>
                    <Separator className="my-2.5" />
                    <div className='flex justify-between text-gray-600'>
                        <p>Delivery Fee</p>
                        <p>Rs. {Math.floor(deliveryFee)} <span className="text-xs text-gray-500">(Base fee)</span></p>
                    </div>
                    <Separator className="my-2.5" />
                    <div className='flex justify-between text-gray-600 font-semibold'>
                        <p>Total</p>
                        <p>Rs. {Math.floor(Total)}</p>
                    </div>
                </div>
                <Button 
                    onClick={() => navigate("/order")} 
                    variant="Tomato"
                    size='lg'
                    className='rounded-[15px] w-full md:w-auto md:max-w-xs self-start'
                >
                    Proceed to Checkout
                </Button>
            </div>
        </div >


    </>
  )
}

export default Cart_total;
