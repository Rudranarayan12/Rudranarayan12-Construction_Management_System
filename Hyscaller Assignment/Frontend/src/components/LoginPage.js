import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ isSignUp }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8081/${isSignUp ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate(`/dashboard?name=${name}&email=${email}`);
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.');
    }
  };

   return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form style={styles.form} onSubmit={handleFormSubmit}>
        {isSignUp && (
          <>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </>
        )}
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.link}>
        {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
        <Link to={isSignUp ? '/login' : '/'} style={styles.link}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </Link>
      </p>
    </div>
  );
};

const styles = {
    container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginTop: '50px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  label: {
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  link: {
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default LoginPage;
