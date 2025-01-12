import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, message } from 'antd';

function LoginForm() {
  const navigate = useNavigate();

  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'teacher@example.com', password: 'teacher123', role: 'teacher' },
    { email: 'student@example.com', password: 'student123', role: 'student' }
  ];

  const handleSubmit = (values) => {
    const { email, password } = values;

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log('Logged in as:', user.role);
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/home');
          break;
        case 'student':
          navigate('/dashboard');
          break;
        default:
          alert('Invalid role!');
      }
    } else {
      message.error('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6">LOG-IN</h1>
        <Form onFinish={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                type="email"
                className="w-full py-2 border border-gray-300 rounded mt-2"
                placeholder="name@example.com"
              />
            </Form.Item>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                className="w-full py-2 border border-gray-300 rounded mt-2"
                placeholder="••••••"
              />
            </Form.Item>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
