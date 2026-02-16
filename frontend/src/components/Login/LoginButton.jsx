import React from 'react'
import { Button } from '@/components/ui/button'

const LoginButton = ({isSubmitting,currstate}) => {
    return (
        <div>
            <Button
                variant = 'Tomato'
                size = 'lg'
                className = 'rounded-[15px] w-full'
                disabled={isSubmitting}
            >
                {currstate === "Sign Up" ? "Create Account" : "Login"}
            </Button>
        </div>
    )
}

export default LoginButton
