import React from 'react'

const LocationMap = () => {
    return (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <iframe
                title='Restaurant Location'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086678567896!2d-122.4194154846818!3d37.77492977975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b5b5b5%3A0x123456789abcdef0!2sYour%20Restaurant%20Name!5e0!3m2!1sen!2sus!4v1610000000000'
                width='100%'
                height='300'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                className='grayscale hover:grayscale-0 transition-all duration-500'
            ></iframe>
        </div>
    )
}

export default LocationMap
