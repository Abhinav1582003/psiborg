import React from 'react'

export default function ConfirmDialog({ open, title = 'Confirm', message, onClose, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-md shadow-lg w-full max-w-md p-4">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-sm text-gray-700">{message}</div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 rounded border" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
