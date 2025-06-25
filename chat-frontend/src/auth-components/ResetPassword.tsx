import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IResetPassword {
    newPassword: string
    confirmPassword: string
}

const ResetPassword = () => {
    const [resetData, setResetData] = useState<IResetPassword>({
        newPassword: '',
        confirmPassword: ''
    })
    const [responseMessage, setResponseMessage] = useState<string>('')
    const navigate = useNavigate()

    const handleReset = async () => {
        const email = localStorage.getItem('email')
        if (!email) {
            setResponseMessage('Email not found. Please restart password recovery.')
            return
        }

        if (resetData.newPassword.length < 8) {
            setResponseMessage('Password must be at least 8 characters')
            return
        }

        if (resetData.newPassword !== resetData.confirmPassword) {
            setResponseMessage('Passwords do not match')
            return
        }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/reset-password', {
                email,
                newPassword: resetData.newPassword
            })
            console.log(response)
            setResponseMessage('Password reset successful!')
            localStorage.removeItem('email')
            navigate('/login')
        } catch (error: any) {
            setResponseMessage(error?.response?.data?.message || 'Password reset failed')
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={resetData.newPassword}
                onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
            />
            <br />
            <input
                type="password"
                placeholder="Confirm Password"
                value={resetData.confirmPassword}
                onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
            />
            <br />
            <button onClick={handleReset}>Reset Password</button>
            <p>{responseMessage}</p>
        </div>
    )
}

export default ResetPassword
