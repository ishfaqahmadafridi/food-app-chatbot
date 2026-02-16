import React from 'react'

const FooterContRight = () => {
    return (
        <div className="footer-content-right flex flex-col items-start gap-4">
            <h2 className="text-white text-lg font-semibold mb-2">GET IN TOUCH</h2>
            <ul className="flex flex-col gap-2">
                <li className="list-none">
                    <a href="tel:+923341923293" className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">+92 3341923293</a>
                </li>
                <li className="list-none">
                    <a href="mailto:contact@restobot.com" className="text-[#d9d9d9] hover:text-[#ff7675] transition-colors cursor-pointer text-sm">contact@restobot.com</a>
                </li>
            </ul>
        </div>
    )
}
export default FooterContRight