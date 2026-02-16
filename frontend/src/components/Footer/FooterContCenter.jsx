import React from 'react'
import { Link } from 'react-router-dom'

const FooterContCenter = () => {
    return (
        <div className="footer-content-center flex flex-col items-start gap-4">
            <h2 className="text-white text-lg font-semibold mb-2">COMPANY</h2>
            <ul className="flex flex-col gap-2">
                <li className="list-none">
                    <Link to="/" className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">Home</Link>
                </li>
                <li className="list-none">
                    <a href='#header' className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">About us</a>
                </li>
                <li className="list-none">
                    <a href='#explore-menu' className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">Delivery</a>
                </li>
                <li className="list-none">
                    <a href='#footer' className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">Privacy Policy</a>
                </li>
            </ul>
        </div>
    )
}

export default FooterContCenter;
