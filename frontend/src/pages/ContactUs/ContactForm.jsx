import React from 'react'
import FormContainer from './FormContainer'
import ContactFormFields from './ContactFormFields'
import SubmitButton from './SubmitButton'

const ContactForm = () => {
    return (
        <FormContainer title="Send Us a Message" >
            <ContactFormFields  />
            <SubmitButton  />
        </FormContainer>
    )
}

export default ContactForm
