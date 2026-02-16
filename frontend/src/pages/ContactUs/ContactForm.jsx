import React from 'react'
import useContactForm  from '@/hooks/contact/useContactForm'
import FormContainer from './FormContainer'
import ContactFormFields from './ContactFormFields'
import SubmitButton from './SubmitButton'

const ContactForm = () => {
    const { formData, handleChange, handleSubmit, isSubmitting } = useContactForm()

    return (
        <FormContainer title="Send Us a Message" onSubmit={handleSubmit}>
            <ContactFormFields formData={formData} onChange={handleChange} />
            <SubmitButton isSubmitting={isSubmitting} />
        </FormContainer>
    )
}

export default ContactForm
