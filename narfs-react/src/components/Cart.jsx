import React, { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import './Cart.css'

export default function Cart({ items, open, onClose, onUpdateQty, onRemove, onClear, showToast }) {
  const [step, setStep] = useState('cart') // 'cart' | 'details' | 'done'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleOrder = (e) => {
    e.preventDefault()
    setStep('done')
    setTimeout(() => {
      onClear()
      setStep('cart')
      setName('')
      setPhone('')
      onClose()
      showToast(`Thanks ${name}! Your order is confirmed 🎉`)
    }, 2600)
  }

  return (
    <>
      {/* Backdrop */}
      <div className={`cart-backdrop ${open ? 'cart-backdrop--open' : ''}`} onClick={onClose} />

      {/* Sidebar */}
      <aside className={`cart ${open ? 'cart--open' : ''}`}>
        {/* Header */}
        <div className="cart__header">
          <div className="cart__header-left">
            <ShoppingBag size={18} />
            <span>Your Order</span>
            {items.length > 0 && <span className="cart__count">{items.length}</span>}
          </div>
          <button className="cart__close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Content */}
        <div className="cart__body">
          {step === 'done' ? (
            <div className="cart__done">
              <div className="cart__done-emoji">🎉</div>
              <h3 className="cart__done-title">Order Placed!</h3>
              <p className="cart__done-text">Thanks {name}! Your food is on its way.</p>
            </div>
          ) : step === 'details' ? (
            <form className="cart__form" onSubmit={handleOrder}>
              <h3 className="cart__form-title">Your Details</h3>
              <input
                className="cart__input"
                type="text"
                placeholder="Your name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                className="cart__input"
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />

              {/* Summary */}
              <div className="cart__summary">
                {items.map(i => (
                  <div key={i.id} className="cart__summary-row">
                    <span>{i.name} ×{i.quantity}</span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="cart__summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart__form-btns">
                <button type="button" className="cart__btn-back" onClick={() => setStep('cart')}>Back</button>
                <button type="submit" className="cart__btn-confirm">Confirm Order</button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="cart__empty">
              <span className="cart__empty-icon">🛒</span>
              <p>Nothing here yet.<br />Browse the menu to get started!</p>
            </div>
          ) : (
            <div className="cart__items">
              {items.map(item => (
                <div key={item.id} className="cart__item">
                  <div className="cart__item-info">
                    <p className="cart__item-name">{item.name}</p>
                    <p className="cart__item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart__item-controls">
                    <button className="cart__qty-btn" onClick={() => onUpdateQty(item.id, -1)}>
                      <Minus size={10} />
                    </button>
                    <span className="cart__qty">{item.quantity}</span>
                    <button className="cart__qty-btn" onClick={() => onUpdateQty(item.id, 1)}>
                      <Plus size={10} />
                    </button>
                    <button className="cart__remove" onClick={() => onRemove(item.id)}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'cart' && items.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">
              <span>Total</span>
              <span className="cart__total-price">${total.toFixed(2)}</span>
            </div>
            <button className="cart__checkout-btn" onClick={() => setStep('details')}>
              Proceed to Order →
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
