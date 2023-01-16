import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import {
  createAccountWithEmailAndPassword,
  signInUser,
} from '../services/firebaseServices'
import { customError } from '../common/firebase-error'
import '../styles/login.scss'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setFormData({
      email: '',
      password: '',
    })

    try {
      const res = await signInUser(formData)
      if (res) {
        navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  return (
    <div className="login-container">
      <div className="login-heading">
        <h1>WELCOME BACK</h1>
        <p>Time is so expensive. let's help you manage your time wisely</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          {error && <p className="error-alert">{error}</p>}
          <div className="email-container">
            <label htmlFor="email" className="email-label">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              className="email-input"
              placeholder="example@gmail.com"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="password-container">
            <label htmlFor="password" className="password-label">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              className="password-input"
              placeholder="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* <p className="forgot-password">forgot password</p> */}
          </div>
          <div className="button-container">
            <button className="login-btn">SIGN IN</button>
          </div>
        </form>
        <p className="no-account">
          Don't have an account?
          <Link
            to="/register"
            className="signup-span"
            style={{ textDecoration: 'none' }}
          >
            <span> Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
