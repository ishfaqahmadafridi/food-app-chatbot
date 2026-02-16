import React from 'react'
import { assets } from '../../assets/frontend_assets/assets' 

const FooterContLeft = () => {
    return (
        <div className="footer-content-left flex flex-col items-start gap-4">
            <img src={assets.logo} alt="RestoBot Logo" className="w-32" />
            <p className="text-sm leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore mollitia ut unde repellendus sunt eum exercitationem quaerat facere quibusdam minus?</p>
            <div className="footer-soical-icon flex gap-4">
                <img src={assets.facebook_icon} alt="Facebook" className="w-10 cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={assets.twitter_icon} alt="Twitter" className="w-10 cursor-pointer hover:opacity-80 transition-opacity" />
                <img src={assets.linkedin_icon} alt="LinkedIn" className="w-10 cursor-pointer hover:opacity-80 transition-opacity" />
            </div>
        </div>
    )
}
export default FooterContLeft;