import React, { useState } from 'react'
import './LoginPage.css'
import logo_big from '../../assets/logo_big.png'
import { signup, login, resetPass } from '../../Config/firebase'

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Disable buttons during loading
    
    if (currState === 'Sign Up') {
      await signup(userName, email, password);
    } else {
      await login(email, password);
    }
    setLoading(false); // Enable buttons again after process
  };

  const handlePasswordReset = () => {
    if (!email) {
      alert('Please enter your email to reset password');
      return;
    }
    resetPass(email); // Call reset pass with email
  };

  return (
    <div className='login'>
      <img src={logo_big} alt="" className='logo' />

      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>

        {currState === 'Sign Up' ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder='Username'
            className="form-input"
          />
        ) : null}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder='Email address'
          className="form-input"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder='Password'
          className="form-input"
        />

        {currState === 'Sign Up' ? (
          <button type='submit' disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        ) : (
          <button disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        )}

        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <div className="login-forgot">
          {currState === 'Sign Up' ? (
            <p className="login-toggle">
              Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
            </p>
          )}

          {currState === 'Login' ? (
            <p className="login-toggle">
              Forgot Password? <span onClick={handlePasswordReset}>Reset here</span>
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
