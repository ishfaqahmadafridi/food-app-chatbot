import React from 'react'
import FormContainer from './FormContainer'
import ContactFormFields from './ContactFormFields'
import SubmitButton from './SubmitButton'

import { useDispatch } from 'react-redux'
import { submitContactForm } from '@/redux/features/contact/contactFormThunk'
import { useSelector } from 'react-redux'

const ContactForm = () => {
    const dispatch = useDispatch()
    const { formData } = useSelector((state) => state.contactForm)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(submitContactForm(formData))
    }

    return (
        <FormContainer title="Send Us a Message" onSubmit={handleSubmit}>
            <ContactFormFields />
            <SubmitButton />
        </FormContainer>
    )
}

export default ContactForm
