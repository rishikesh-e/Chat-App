import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface OtpHandlerBody {
    email: string
    otp: string
}

const VerifyOtp: React.FC = () => {
    const [otp, setOtp] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const navigate = useNavigate()

    const handleOtpVerify = async () => {
        const email = localStorage.getItem('email')
        if (!email) {
            setResponseMessage('Email not found. Please restart password recovery.')
            return
        }

        const payload: OtpHandlerBody = { email, otp }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/verify-otp', payload)
            setResponseMessage(response.data.message || 'OTP verified successfully!')
            navigate('/reset-password')
        } catch (error: any) {
            console.error("OTP verification failed:", error)
            setResponseMessage(error.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div>
            <h2>Verify OTP</h2>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={handleOtpVerify}>Verify</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    )
}
export default VerifyOtp
