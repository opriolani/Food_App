import React, { useState } from 'react'
import { Plus, Check, AlertCircle } from 'lucide-react'
import { CATEGORY_COLORS } from '../data/menuData'
import './MenuCard.css'

export default function MenuCard({ item, onAdd, style }) {
  const [justAdded, setJustAdded] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const handleAdd = () => {
    if (!item.available) return
    onAdd(item)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1300)
  }

  const catColor = CATEGORY_COLORS[item.category] || { bg: '#F3F4F6', text: '#374151' }

  return (
    <article className={`menu-card ${!item.available ? 'menu-card--unavailable' : ''}`} style={style}>
      {/* Image */}
      <div className="menu-card__img-wrap">
        {!imgErr ? (
          <img
            src={item.image}
            alt={item.name}
            className="menu-card__img"
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          <div className="menu-card__img-fallback">🍽️</div>
        )}

        {/* Category badge */}
        <span
          className="menu-card__badge"
          style={{ background: catColor.bg, color: catColor.text }}
        >
          {item.category}
        </span>

        {item.featured && (
          <span className="menu-card__featured-badge">⭐ Featured</span>
        )}

        {!item.available && (
          <div className="menu-card__unavailable-overlay">
            <span className="menu-card__unavailable-label">
              <AlertCircle size={12} /> Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__desc">{item.description}</p>

        <div className="menu-card__ingredients">
          {item.ingredients.slice(0, 3).map(ing => (
            <span key={ing} className="menu-card__ingredient">{ing}</span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="menu-card__ingredient-more">+{item.ingredients.length - 3}</span>
          )}
        </div>

        <div className="menu-card__footer">
          <span className="menu-card__price">${item.price.toFixed(2)}</span>
          <button
            className={`menu-card__btn ${justAdded ? 'menu-card__btn--added' : ''} ${!item.available ? 'menu-card__btn--disabled' : ''}`}
            onClick={handleAdd}
            disabled={!item.available}
          >
            {justAdded ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add</>}
          </button>
        </div>
      </div>
    </article>
  )
}
