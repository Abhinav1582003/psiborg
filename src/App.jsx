import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

import RequireAuth from './components/RequireAuth'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <>
     <Navbar />
      <div className="container mx-auto px-4 mt-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RequireAuth>
                <ProductDetail />
              </RequireAuth>
            }
          />
        </Routes>
        </div>
  </>
  )
}

export default App
