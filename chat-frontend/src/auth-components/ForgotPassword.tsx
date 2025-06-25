import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ForgotPasswordBody {
    email: string
}

const ForgotPassword = () => {
    const [recoveryData, setRecoveryData] = useState<ForgotPasswordBody>({ email: '' })
    const [responseMessage, setResponseMessage] = useState('')
    const navigate = useNavigate()

    const handlePasswordRecovery = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/forgot-password', recoveryData)
            setResponseMessage(response.data.message || 'Recovery email sent successfully!')
            localStorage.setItem('email', recoveryData.email)
            navigate('/verify-otp') 
        } catch (error: any) {
            console.error("Error:", error);
setResponseMessage(error.response?.data?.message || error.message || 'Something went wrong');

        }
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <input
                type="email"
                value={recoveryData.email}
                onChange={(e) => setRecoveryData({ email: e.target.value })}
                placeholder="Enter your email"
            />
            <button onClick={handlePasswordRecovery}>Send Recovery Email</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    )
}

export default ForgotPassword
