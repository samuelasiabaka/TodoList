import React, { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import {
  createAccountWithEmailAndPassword,
  register,
} from '../services/firebaseServices'
import { customError } from '../common/firebase-error'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
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
        register(formData, user)
        navigate('/dashboard')
      }
    } catch (error) {
      setError(customError[error.code])
    }
  }

  return (
    <div>
      <h3>Signup</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={formData.username}
            placeholder="Username"
            required
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value })
            }}
          />
        </div>
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
          Already have an account? <Link to="/login">login</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
