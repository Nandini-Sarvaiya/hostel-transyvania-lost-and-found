"use client"

import { useState } from 'react'
import { ItemCard } from '@/components/ItemCard'
import { AddItemForm } from '@/components/AddItemForm'
import { Button } from '@/components/ui/button'

interface Item {
  id: string;
  image: string;
  description: string;
  name: string;
  contact: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [showForm, setShowForm] = useState(false)

  const addItem = (newItem: Omit<Item, 'id'>) => {
    const item = { ...newItem, id: Date.now().toString() }
    setItems([...items, item])
    setShowForm(false)
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Lost and Found</h1>
      
      {showForm ? (
        <AddItemForm onSubmit={addItem} onCancel={() => setShowForm(false)} />
      ) : (
        <Button onClick={() => setShowForm(true)} className="mb-8">Add Lost Item</Button>
      )}

      <div className="flex flex-wrap justify-center">
        {items.map(item => (
          <ItemCard
            key={item.id}
            {...item}
            onRemove={removeItem}
          />
        ))}
      </div>
    </main>
  )
}