import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Admin from './pages/Admin'
import Cart from './components/Cart'
import Toast from './components/Toast'
import { useMenu } from './hooks/useMenu'
import { useCart } from './hooks/useCart'

export default function App() {
  const { menuItems, setMenuItems } = useMenu()
  const { cart, addToCart, updateQty, removeItem, clearCart } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  const handleAdd = (item) => {
    addToCart(item)
    showToast(`${item.name} added to order!`)
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={
          <Home menuItems={menuItems} onAdd={handleAdd} />
        } />
        <Route path="/menu" element={
          <Menu menuItems={menuItems} onAdd={handleAdd} />
        } />
        <Route path="/admin" element={
          <Admin menuItems={menuItems} setMenuItems={setMenuItems} showToast={showToast} />
        } />
      </Routes>

      <Cart
        items={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={clearCart}
        showToast={showToast}
      />

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </>
  )
}
