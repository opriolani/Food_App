import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import MenuCard from '../components/MenuCard'
import CategoryFilter from '../components/CategoryFilter'
import Footer from '../components/Footer'
import './Menu.css'

export default function Menu({ menuItems, onAdd }) {
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [search, setSearch] = useState('')

  // Sync category when URL param changes
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  // Filter logic
  const filtered = menuItems.filter(item => {
    const matchCat = category === 'all' || item.category === category
    const q = search.toLowerCase()
    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

  // Category counts
  const counts = menuItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    acc.all = (acc.all || 0) + 1
    return acc
  }, {})

  return (
    <main className="menu-page">
      {/* Page Header */}
      <div className="menu-page__header">
        <div className="menu-page__header-grid" />
        <div className="container">
          <p className="section-label" style={{ color: 'var(--amber)' }}>Everything we make</p>
          <h1 className="menu-page__title">Our Menu</h1>
        </div>
      </div>

      {/* Controls */}
      <div className="menu-page__controls">
        <div className="container">
          <div className="menu-page__controls-row">
            {/* Search */}
            <div className="menu-page__search-wrap">
              <Search size={15} className="menu-page__search-icon" />
              <input
                className="menu-page__search"
                type="text"
                placeholder="Search dishes, ingredients…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="menu-page__search-clear"
                  onClick={() => setSearch('')}
                >×</button>
              )}
            </div>
            <p className="menu-page__count">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter selected={category} onChange={setCategory} counts={counts} />
        </div>
      </div>

      {/* Grid */}
      <div className="menu-page__grid-section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="menu-page__empty">
              <span>🔍</span>
              <p><strong>No results found</strong></p>
              <p>Try a different search term or category</p>
            </div>
          ) : (
            <div className="menu-page__grid">
              {filtered.map((item, i) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAdd={onAdd}
                  style={{ animationDelay: `${Math.min(i * 55, 350)}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
