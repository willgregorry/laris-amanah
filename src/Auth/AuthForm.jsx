import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const colors = {
    background: '#16423C',
    box: '#E9EFEC',
    button: '#16423C',
    text: '#333'
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? '/api/login' : '/api/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log('Server Response:', result);
      // Handle success / error messages here

    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container
        style={{
          maxWidth: '400px',
          backgroundColor: colors.box,
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: colors.text }}>
          {isLogin ? 'Login' : 'Register'}
        </h3>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: colors.button,
              border: 'none',
              marginTop: '10px'
            }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: colors.text }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              style={{ color: '#007bff', cursor: 'pointer' }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </span>
        </div>
      </Container>
    </div>
  );
}

export default AuthForm;
