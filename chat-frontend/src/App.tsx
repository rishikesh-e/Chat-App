import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './auth-components/Login';
import Register from './auth-components/Register';
import ForgotPassword from './auth-components/ForgotPassword';
import VerifyOtp from './auth-components/VerifyOtp';
import ResetPassword from './auth-components/ResetPassword';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default App;
