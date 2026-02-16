import React from 'react';
import Cart_items from './CartItems';
import Cart_total from './CartTotal';
import Footer from '../../components/Footer/Footer';


const Cart = () => {

  return (
    <>
      <div className='mt-20 md:mt-24 px-4 md:px-8 mb-16'>
        <Cart_items />
        <Cart_total />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
