import React from 'react'
import FooterContLeft from './FooterContLeft'
import FooterContCenter from './FooterContCenter'
import FooterContRight from './FooterContRight'
import FooterCopyRight from './FooterCopyRight'


const Footer = () => {
  return (
    <div id='Footer' className='footer mt-100px text-[#d9d9d9] bg-[#232323] flex flex-col items-center gap-5 py-5 px-0'>
      <div className="footer-content w-full max-w-1200px grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-30px px-5">
        <FooterContLeft />   
        <FooterContCenter />
        <FooterContRight />
      </div>
      <FooterCopyRight />
    </div>
  )
}
export default Footer;
