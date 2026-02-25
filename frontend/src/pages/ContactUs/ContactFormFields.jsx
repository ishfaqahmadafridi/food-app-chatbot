import React from 'react'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormField } from '@/redux/features/contact/contactFormSlice'

const ContactFormFields = () => {
    const dispatch = useDispatch()
    const { formData } = useSelector((state) => state.contactForm)


    const handleChange = (e) => {
        dispatch(updateFormField({
            name: e.target.name,
            value: e.target.value
        }))
    }

    return (
        <>
            <FormInput
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="abc def"
                required
            />

            <FormInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@example.com"
                required
            />

            <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 123 4567"
            />

            <FormTextarea
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows={5}
                required
            />
        </>
    )
}

export default ContactFormFields
