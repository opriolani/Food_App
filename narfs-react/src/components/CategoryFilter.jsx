import React from 'react'
import { CATEGORIES } from '../data/menuData'
import './CategoryFilter.css'

export default function CategoryFilter({ selected, onChange, counts = {} }) {
  return (
    <div className="cat-filter">
      <div className="cat-filter__scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={`cat-filter__btn ${selected === cat.value ? 'cat-filter__btn--active' : ''}`}
            onClick={() => onChange(cat.value)}
          >
            <span className="cat-filter__emoji">{cat.emoji}</span>
            <span>{cat.label}</span>
            {counts[cat.value] !== undefined && (
              <span className="cat-filter__count">{counts[cat.value]}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
