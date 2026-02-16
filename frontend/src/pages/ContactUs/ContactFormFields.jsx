import React from 'react'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'

const ContactFormFields = ({ formData, onChange }) => {
    return (
        <>
            <FormInput
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={onChange}
                placeholder="abc def"
                required
            />
            
            <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder="abc@example.com"
                required
            />

            <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={onChange}
                placeholder="+92 300 123 4567"
            />

            <FormTextarea
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={onChange}
                placeholder="Tell us how we can help you..."
                rows={5}
                required
            />
        </>
    )
}

export default ContactFormFields
