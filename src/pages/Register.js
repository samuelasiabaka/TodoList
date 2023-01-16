import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { createAccountWithEmailAndPassword } from '../services/firebaseServices'
import { customError } from '../common/firebase-error'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setFormData({
      username: '',
      email: '',
      password: '',
    })

    try {
      const res = await createAccountWithEmailAndPassword(formData)
      const user = res.user
      await updateProfile(user, {
        displayName: formData.username,
      })
      if (user) {
        navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  return (
    <div className="login-container">
      <div className="login-heading">
        <h1>Todo App</h1>
        <p>Time is so expensive. let's help you manage your time wisely</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSignUp}>
          {error && <p className="error-alert">{error}</p>}
          <div className="email-container">
            <label htmlFor="username" className="email-label">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              className="email-input"
              placeholder="example"
              required
              onChange={(e) =>
                setFormData({ ...formData, username: formData.username })
              }
            />
          </div>
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
                setFormData({ ...formData, username: formData.email })
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
                setFormData({ ...formData, username: formData.password })
              }
            />
          </div>
          <div className="button-container">
            <button className="login-btn">SIGN IN</button>
          </div>
        </form>
        <p className="no-account">
          Already have an account?
          <Link
            to="/"
            className="signup-span"
            style={{ textDecoration: 'none' }}
          >
            <span> Sign in</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
