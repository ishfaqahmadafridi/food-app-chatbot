import React from 'react';

const Header = () => {
  return (
    <div 
      className="header h-[calc(100vh-10px)] my-30px mx-auto px-4 md:px-6 relative rounded-[10px] bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: "url('/header_img.png')" }}
    >
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[15%] left-[4vw] md:left-[6vw] animate-[fadeIn_3s]">
        <h2 className='text-white font-bold text-[max(4vw,35px)] leading-tight drop-shadow-lg'>
          Order your favourite food here
        </h2>
        <p className='hidden md:block text-white text-[max(1.2vw,16px)] leading-relaxed drop-shadow-md'>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our meal delivery service ensures that your food arrives hot and fresh, ready to be enjoyed in the comfort of your home.
        </p>
        <button className='py-[1.2vw] px-[2.8vw] font-semibold border-none rounded-[50px] cursor-pointer bg-white text-gray-700 text-[max(1.2vw,15px)] hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl'>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;




