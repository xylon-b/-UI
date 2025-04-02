import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // --- Authentication Bypass ---
    // In a real app, you would validate credentials here.
    // For now, we just simulate a successful login.
    console.log('Login attempt:', { employeeId, phoneNumber });
    // Simulate successful login
    sessionStorage.setItem('isAuthenticated', 'true'); // Mark as authenticated
    navigate('/classroom'); // Redirect to the classroom page
    // --- End Authentication Bypass ---
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-primary-700">
          자세방 학습 로그인
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="employeeId"
              className="block text-sm font-medium text-secondary-700 mb-1"
            >
              사번
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="사번을 입력하세요"
              className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out"
              // required // Add back when validation is needed
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-secondary-700 mb-1"
            >
              휴대폰 번호
            </label>
            <input
              type="tel" // Use 'tel' type for phone numbers
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="휴대폰 번호를 입력하세요 ('-' 제외)"
              className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out"
              // required // Add back when validation is needed
            />
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary py-3 text-lg rounded-lg"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
