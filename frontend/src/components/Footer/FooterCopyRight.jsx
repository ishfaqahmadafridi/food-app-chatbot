import React from 'react'
import { Separator } from '@/components/ui/separator';

const FooterCopyRight = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Separator className="w-[90%] my-5" />
            <p className="footer-copyright text-center text-sm text-[#d9d9d9]">© 2025 RestoBot. All rights reserved.</p>
        </div>
    )
}

export default FooterCopyRight
