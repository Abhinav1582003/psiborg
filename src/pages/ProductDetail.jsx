import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api'
import EditProductForm from '../components/EditProductForm'
import ConfirmDialog from '../components/ConfirmDialog'

async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`)
  return data
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { data, isLoading, error } = useQuery({ queryKey: ['product', id], queryFn: () => fetchProduct(id), enabled: !!id })
  const [editing, setEditing] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const updateMutation = useMutation({
    mutationFn: (payload) => api.put(`/products/${id}`, payload),
    onSuccess: (res) => {
      const updated = res.data
      qc.setQueryData(['product', id], updated)
      qc.setQueryData(['products'], (old = []) => old.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)))
      setEditing(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/products/${id}`),
    onSuccess: () => {
      qc.setQueryData(['products'], (old = []) => old.filter((p) => String(p.id) !== String(id)))
      navigate('/')
    },
  })

  if (isLoading) return <div className="flex justify-center mt-12"><div className="spinner" /></div>
  if (error) return <div className="text-red-600">Failed to load product</div>
  if (!data) return null

  const handleSave = (payload) => {
    updateMutation.mutate(payload)
  }

  return (
    <div className="bg-white rounded shadow p-4">
      {!editing ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <img src={data.image} alt={data.title} className="w-full md:w-64 object-contain bg-gray-50 p-4" />
            <div>
              <h2 className="text-2xl font-semibold">{data.title}</h2>
              <div className="text-sm text-gray-500">{data.category}</div>
              <div className="text-xl font-semibold mt-2">${data.price.toFixed(2)}</div>
              <div className="border-t my-3" />
              <div className="text-gray-700">{data.description}</div>
              <div className="mt-3 text-sm text-gray-600">Rating: {data.rating?.rate} ({data.rating?.count})</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>Edit</button>
            <button className="border px-4 py-2 rounded text-red-600" onClick={() => setConfirmOpen(true)}>Delete</button>
            <button className="px-4 py-2 rounded" onClick={() => navigate(-1)}>Back</button>
          </div>
        </>
      ) : (
        <EditProductForm product={data} onCancel={() => setEditing(false)} onSave={handleSave} />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  )
}
