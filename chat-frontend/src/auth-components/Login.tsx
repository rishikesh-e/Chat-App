import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface ILogin {
    email: string
    password: string
}

const Login = () => {
    const [login, setLogin] = useState<ILogin>({
        email: '',
        password: ''
    })
    const [responseMessage, setResponseMessage] = useState<string>('')
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', 
                login,
                { withCredentials: true }
            );
            const token = response.data?.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            setResponseMessage('Login Successful');
            console.log(response.data);
            navigate('/home');
    } catch (error: any) {
        setResponseMessage(error?.response?.data?.message || 'Login failed');
        console.error(error);
    }
}

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an Account ? <Link to="/register">Register now</Link></p>
            <p>Forgot your password ? <Link to="/forgot-password">Recover it</Link></p>
            <p>{responseMessage}</p>
        </div>
    )
}

export default Login