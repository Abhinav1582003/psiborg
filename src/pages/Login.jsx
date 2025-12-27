import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const auth = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'user' && password === 'password') {
      auth.login()
    } else {
      setError('Invalid credentials — try user / password')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Login</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Sign in</button>
        </div>
      </form>
    </div>
  )
}
