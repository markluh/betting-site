import React from 'react';
import RegisterForm from '../components/RegisterForm';

const Register = ({ onRegistered }) => (
  <div className="cursor-pointer">
    <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 hover:underline">Register</h1>
    <RegisterForm onRegistered={onRegistered} />
  </div>
);

export default Register;