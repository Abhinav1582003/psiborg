import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api'
import ProductCard from '../components/ProductCard'

async function fetchProducts() {
  const { data } = await api.get('/products')
  return data
}

export default function ProductList() {
  const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 12

  const products = useMemo(() => data || [], [data]);

  const categories = useMemo(() => {
    const s = new Set(products.map((p) => p.category))
    return ['', ...Array.from(s)]
  }, [products])

  const filtered = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) && (category ? p.category === category : true)
    )
  })

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)

  if (isLoading) return <div className="flex justify-center mt-12"><div className="spinner" /></div>
  if (error) return <div className="text-red-600">Failed to load products</div>

  return (
    <>
      <div className="flex gap-3 mb-4 flex-col sm:flex-row">
        <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded px-3 py-2 flex-1" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
          {categories.map((c) => (
            <option key={c || 'all'} value={c}>{c || 'All'}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map((p) => (
          <div key={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <div className="inline-flex items-center gap-2">
          <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1}>Prev</button>
          <div className="px-3">{page} / {pageCount}</div>
          <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={() => setPage((s) => Math.min(pageCount, s + 1))} disabled={page === pageCount}>Next</button>
        </div>
      </div>
    </>
  )
}
