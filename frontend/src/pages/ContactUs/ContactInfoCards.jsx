import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import ContactInfoCard from './ContactInfoCard'

const ContactInfoCards = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-20'>
            <ContactInfoCard
                icon={Phone}
                title="Phone"
                line1="+92 300 123 4567"
                line2="Mon-Sun: 9AM - 10PM"
            />
            <ContactInfoCard
                icon={Mail}
                title="Email"
                line1="contact@resbot.com"
                line2="support@resbot.com"
            />
            <ContactInfoCard
                icon={MapPin}
                title="Location"
                line1="123 Restaurant Street"
                line2="Foodville, FC 12345"
            />
        </div>
    )
}

export default ContactInfoCards
