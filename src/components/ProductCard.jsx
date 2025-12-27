import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md bg-white">
      <button className="w-full text-left" onClick={() => navigate(`/product/${product.id}`)}>
        <div className="h-40 flex items-center justify-center bg-gray-50 p-4">
          <img src={product.image} alt={product.title} className="max-h-36 object-contain" />
        </div>
        <div className="p-3">
          <div className="text-sm font-medium truncate">{product.title}</div>
          <div className="text-xs text-gray-500 mt-1">{product.category}</div>
          <div className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</div>
        </div>
      </button>
    </div>
  )
}
