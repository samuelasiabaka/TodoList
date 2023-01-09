import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInUser } from '../services/firebaseServices'
import { customError } from '../common/firebase-error'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    setFormData({
      email: '',
      password: '',
    })

    try {
      const res = await signInUser(formData)
      if (res) {
        // navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  return (
    <div>
      <h3>Login</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={formData.email}
            placeholder="Email"
            required
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            value={formData.password}
            placeholder="Password"
            required
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
          />
        </div>
        <p>
          Don't have an account? <Link to="/signup">signup</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
