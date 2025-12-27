import React, { useState } from 'react'

export default function EditProductForm({ product, onCancel, onSave }) {
  const [title, setTitle] = useState(product.title || '')
  const [price, setPrice] = useState(product.price || 0)
  const [description, setDescription] = useState(product.description || '')
  const [category, setCategory] = useState(product.category || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ title, price: Number(price), description, category })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <label className="block">
        <div className="text-sm font-medium mb-1">Title</div>
        <input className="w-full border rounded px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="block">
        <div className="text-sm font-medium mb-1">Price</div>
        <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label className="block">
        <div className="text-sm font-medium mb-1">Category</div>
        <input className="w-full border rounded px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label className="block">
        <div className="text-sm font-medium mb-1">Description</div>
        <textarea className="w-full border rounded px-3 py-2" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  )
}
