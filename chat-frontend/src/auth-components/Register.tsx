import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface IRegister {
    name: string
    email: string
    password: string
}

const Register = () => {
    const [registerData, setRegisterData] = useState<IRegister>({
        name: '',
        email: '',
        password: ''
    })

    const [responseMessage, setResponseMessage] = useState<string>('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', registerData)
            console.log(response.data)
            setResponseMessage('User registered successfully')
            navigate('/login')
        } catch (error: any) {
            console.log(error)
            setResponseMessage(error?.response?.data?.message || 'Registration failed')
        }   
    }
    
    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <br />
            <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <br />
            <button onClick={handleRegister}>Register</button>
            <p>{responseMessage}</p>
        </div>
  );
}

export default Register