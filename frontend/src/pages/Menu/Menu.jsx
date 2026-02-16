import React, { useState } from 'react';
import ExploreMenu from '../../components/Menu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';

const Menu = () => {
  const [category, setCategory] = useState('All');

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Our Menu</h1>
          <p className='text-gray-600'>Explore our delicious food items and categories</p>
        </div>
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
