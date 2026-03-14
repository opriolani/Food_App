import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Star, X, Save, ArrowLeft } from 'lucide-react'
import { CATEGORIES } from '../data/menuData'
import './Admin.css'

const EMPTY_FORM = {
  name: '', description: '', price: '', category: 'lunch',
  image: '', ingredients: '', available: true, featured: false,
}

let nextId = Date.now()

export default function Admin({ menuItems, setMenuItems, showToast }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === 'true')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginErr, setLoginErr] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null) // null = create mode
  const [form, setForm] = useState(EMPTY_FORM)

  /* ─── Auth ─────────────────────────────────────────────────────────────────── */
  const handleLogin = (e) => {
    e.preventDefault()
    // Simple hardcoded credentials — change these!
    if (loginEmail === 'admin@narfsdiner.com' && loginPw === 'admin123') {
      sessionStorage.setItem('admin_authed', 'true')
      setAuthed(true)
      setLoginErr('')
    } else {
      setLoginErr('Incorrect email or password.')
    }
  }
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed')
    setAuthed(false)
  }

  if (!authed) return <LoginScreen
    email={loginEmail} setEmail={setLoginEmail}
    pw={loginPw} setPw={setLoginPw}
    err={loginErr} onSubmit={handleLogin}
  />

  /* ─── CRUD ──────────────────────────────────────────────────────────────────── */
  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }
  const openEdit = (item) => {
    setEditing(item)
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      category: item.category,
      image: item.image,
      ingredients: item.ingredients.join(', '),
      available: item.available,
      featured: item.featured,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.price) {
      showToast('Name and price are required', 'error')
      return
    }
    const ingredients = form.ingredients.split(',').map(s => s.trim()).filter(Boolean)
    const price = parseFloat(form.price)

    if (editing) {
      setMenuItems(menuItems.map(i =>
        i.id === editing.id ? { ...editing, ...form, price, ingredients } : i
      ))
      showToast(`"${form.name}" updated!`)
    } else {
      setMenuItems([...menuItems, { ...form, price, ingredients, id: String(nextId++) }])
      showToast(`"${form.name}" added!`)
    }
    setModalOpen(false)
  }

  const handleDelete = (item) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return
    setMenuItems(menuItems.filter(i => i.id !== item.id))
    showToast(`"${item.name}" deleted`)
  }

  const toggleField = (item, field) => {
    setMenuItems(menuItems.map(i => i.id === item.id ? { ...i, [field]: !i[field] } : i))
  }

  /* ─── Stats ─────────────────────────────────────────────────────────────────── */
  const stats = [
    { label: 'Total Items',  value: menuItems.length,                          emoji: '🍽️' },
    { label: 'Available',    value: menuItems.filter(i => i.available).length, emoji: '✅' },
    { label: 'Featured',     value: menuItems.filter(i => i.featured).length,  emoji: '⭐' },
    { label: 'Categories',   value: new Set(menuItems.map(i => i.category)).size, emoji: '📂' },
  ]

  return (
    <div className="admin">
      {/* Top bar */}
      <nav className="admin__nav">
        <div className="admin__nav-left">
          <span className="admin__nav-logo">Narf's Diner</span>
          <span className="admin__nav-tag">Admin</span>
        </div>
        <div className="admin__nav-right">
          <Link to="/" className="admin__nav-link">View Site ↗</Link>
          <button className="admin__nav-link" onClick={handleLogout}>Sign Out</button>
        </div>
      </nav>

      <div className="admin__body">
        {/* Stats */}
        <div className="admin__stats">
          {stats.map(s => (
            <div key={s.label} className="admin__stat">
              <span className="admin__stat-emoji">{s.emoji}</span>
              <span className="admin__stat-value">{s.value}</span>
              <span className="admin__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Table header */}
        <div className="admin__table-header">
          <h2 className="admin__table-title">Menu Items</h2>
          <button className="admin__add-btn" onClick={openCreate}>
            <Plus size={16} /> Add Item
          </button>
        </div>

        {/* Table */}
        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th className="admin__th-center">Available</th>
                <th className="admin__th-center">Featured</th>
                <th className="admin__th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.length === 0 ? (
                <tr><td colSpan={6} className="admin__table-empty">
                  No items yet. <button onClick={openCreate} className="admin__table-empty-link">Add the first one →</button>
                </td></tr>
              ) : (
                menuItems.map(item => (
                  <tr key={item.id} className="admin__row">
                    <td>
                      <div className="admin__item-cell">
                        {item.image
                          ? <img src={item.image} alt={item.name} className="admin__item-img" />
                          : <div className="admin__item-img-ph">🍽️</div>
                        }
                        <div>
                          <p className="admin__item-name">{item.name}</p>
                          <p className="admin__item-desc">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin__badge">{item.category}</span>
                    </td>
                    <td className="admin__price">${item.price.toFixed(2)}</td>
                    <td className="admin__th-center">
                      <button onClick={() => toggleField(item, 'available')} title="Toggle availability">
                        {item.available
                          ? <ToggleRight size={24} color="var(--success)" />
                          : <ToggleLeft size={24} color="var(--muted)" />
                        }
                      </button>
                    </td>
                    <td className="admin__th-center">
                      <button onClick={() => toggleField(item, 'featured')} title="Toggle featured">
                        <Star size={17} fill={item.featured ? 'var(--amber)' : 'none'} color={item.featured ? 'var(--amber)' : 'var(--cream-dark)'} />
                      </button>
                    </td>
                    <td>
                      <div className="admin__actions">
                        <button className="admin__btn-edit" onClick={() => openEdit(item)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="admin__btn-del" onClick={() => handleDelete(item)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <>
          <div className="admin__overlay" onClick={() => setModalOpen(false)} />
          <div className="admin__modal">
            <div className="admin__modal-head">
              <h3>{editing ? 'Edit Item' : 'Add New Item'}</h3>
              <button className="admin__modal-close" onClick={() => setModalOpen(false)}><X size={18} /></button>
            </div>

            <div className="admin__modal-body">
              <div className="admin__form-grid">
                <div className="admin__field admin__field--full">
                  <label className="admin__label">Name *</label>
                  <input className="admin__input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Jollof Rice" />
                </div>
                <div className="admin__field">
                  <label className="admin__label">Price ($) *</label>
                  <input className="admin__input" type="number" min="0" step="0.50" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div className="admin__field">
                  <label className="admin__label">Category</label>
                  <select className="admin__input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    {CATEGORIES.filter(c => c.value !== 'all').map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div className="admin__field admin__field--full">
                  <label className="admin__label">Description</label>
                  <textarea className="admin__input admin__textarea" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Short appetising description" />
                </div>
                <div className="admin__field admin__field--full">
                  <label className="admin__label">Image URL</label>
                  <input className="admin__input" type="url" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://..." />
                  {form.image && <img src={form.image} alt="Preview" className="admin__img-preview" onError={e => e.target.style.display='none'} />}
                </div>
                <div className="admin__field admin__field--full">
                  <label className="admin__label">Ingredients (comma-separated)</label>
                  <input className="admin__input" value={form.ingredients} onChange={e => setForm({...form, ingredients: e.target.value})} placeholder="e.g. Rice, Chicken, Tomato" />
                </div>
                <label className="admin__checkbox">
                  <input type="checkbox" checked={form.available} onChange={e => setForm({...form, available: e.target.checked})} />
                  <span>Available</span>
                </label>
                <label className="admin__checkbox">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
                  <span>Featured on homepage</span>
                </label>
              </div>
            </div>

            <div className="admin__modal-foot">
              <button className="admin__cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="admin__save-btn" onClick={handleSave}>
                <Save size={14} /> {editing ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Login Screen ──────────────────────────────────────────────────────────── */
function LoginScreen({ email, setEmail, pw, setPw, err, onSubmit }) {
  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={onSubmit}>
        <Link to="/" className="admin-login__back"><ArrowLeft size={14} /> Back to site</Link>
        <h1 className="admin-login__title">Narf's Diner</h1>
        <p className="admin-login__sub">Admin Portal</p>
        <div className="admin-login__fields">
          <input className="admin__input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="admin__input" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} required />
        </div>
        {err && <p className="admin-login__err">{err}</p>}
        <button className="admin__save-btn" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Sign In</button>
        <p className="admin-login__hint">Default: admin@narfsdiner.com / admin123</p>
      </form>
    </div>
  )
}
