import React from 'react'
import { Send, Loader2 } from 'lucide-react'

const SubmitButton = ({ text = 'Send Message', isSubmitting = false }) => {
    return (
        <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-linear-to-r from-[#667eea] to-[#764ba2] text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0'
        >
            {isSubmitting ? (
                <>
                    <Loader2 size={20} className='animate-spin' />
                    Sending...
                </>
            ) : (
                <>
                    <Send size={20} />
                    {text}
                </>
            )}
        </button>
    )
}

export default SubmitButton
