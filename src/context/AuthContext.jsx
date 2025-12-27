import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('isLoggedIn')) || false
    } catch {
      return false
    }
  })
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  const login = () => {
    setIsLoggedIn(true)
    navigate('/')
  }
  const logout = () => {
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
