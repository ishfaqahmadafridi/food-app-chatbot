import { useState } from 'react'
import toast from 'react-hot-toast'
import api from '@/services/api'

const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        })
    }

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields')
            return false
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address')
            return false
        }
        
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        
        try {
            const response = await api.post('/contact/', formData)
            
            if (response.data.success) {
                toast.success(response.data.message || 'Message sent successfully! We\'ll get back to you soon.')
                resetForm()
            }
        } catch (error) {
            console.error('Error submitting contact form:', error)
            toast.error(
                error.response?.data?.message || 
                'Failed to send message. Please try again later.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        formData,
        handleChange,
        handleSubmit,
        resetForm,
        isSubmitting
    }
}

export default useContactForm
