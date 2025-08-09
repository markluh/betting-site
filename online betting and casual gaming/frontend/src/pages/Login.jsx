import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ onLogin }) => (
  <div className="cursor-pointer">
    <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 hover:underline">Login</h1>
    <LoginForm onLogin={onLogin} />
  </div>
);

export default Login;