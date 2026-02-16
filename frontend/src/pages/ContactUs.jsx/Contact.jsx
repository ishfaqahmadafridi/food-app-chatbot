import React from 'react'
import Footer from '../../components/Footer/Footer'
import ContactHero from './ContactHero'
import ContactInfoCards from './ContactInfoCards'
import ContactForm from './ContactForm'
import LocationMap from './LocationMap'
import BusinessHours from './BusinessHours'

const Contact = () => {
    return (
        <>
            <div className='min-h-screen bg-linear-to-b from-gray-50 to-white'>
                <ContactHero />

                <div className='max-w-6xl mx-auto px-4 py-12'>
                    <ContactInfoCards />

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <ContactForm />

                        <div className='space-y-6'>
                            <LocationMap />
                            <BusinessHours />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact
