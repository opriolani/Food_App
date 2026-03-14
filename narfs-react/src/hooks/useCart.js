import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(c => c.id === id ? { ...c, quantity: c.quantity + delta } : c)
         .filter(c => c.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const clearCart = () => setCart([])

  return { cart, addToCart, updateQty, removeItem, clearCart }
}
