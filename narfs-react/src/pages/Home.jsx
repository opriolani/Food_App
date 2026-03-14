import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import MenuCard from '../components/MenuCard'
import Footer from '../components/Footer'
import './Home.css'

export default function Home({ menuItems, onAdd }) {
  const featured = menuItems.filter(i => i.featured && i.available).slice(0, 4)

  const categories = [
    { emoji: '🥞', label: 'Breakfast', cat: 'breakfast' },
    { emoji: '🥗', label: 'Lunch',     cat: 'lunch'     },
    { emoji: '🍖', label: 'Dinner',    cat: 'dinner'    },
    { emoji: '🥤', label: 'Drinks',    cat: 'drinks'    },
    { emoji: '🍰', label: 'Desserts',  cat: 'desserts'  },
    { emoji: '⭐', label: 'Specials',  cat: 'specials'  },
  ]

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__grid-bg" />
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />

        <div className="container hero__content">
          <p className="section-label fade-up">Est. 2020 · Fresh Daily · Port Harcourt</p>

          <h1 className="hero__title fade-up fade-up-d1">
            Narf's
            <span className="hero__title-diner">Diner</span>
          </h1>

          <p className="hero__subtitle fade-up fade-up-d2">
            Bold flavours. Real ingredients.<br />Every plate crafted with intention.
          </p>

          <div className="hero__ctas fade-up fade-up-d3">
            <Link to="/menu" className="btn btn--primary">Browse Menu</Link>
            <a href="#about" className="btn btn--ghost">Our Story</a>
          </div>
        </div>

        <a href="#featured" className="hero__scroll-hint fade-up fade-up-d4">
          <span>Scroll</span>
          <ChevronDown size={16} className="hero__scroll-chevron" />
        </a>
      </section>

      {/* ── Featured ── */}
      <section className="featured" id="featured">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-label">Chef's Selection</p>
              <h2 className="section-title">Featured Dishes</h2>
            </div>
            <Link to="/menu" className="section-more">View Full Menu →</Link>
          </div>

          {featured.length === 0 ? (
            <div className="empty-state">
              <span>🍽️</span>
              <p>No featured items yet — check back soon!</p>
            </div>
          ) : (
            <div className="cards-grid">
              {featured.map((item, i) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAdd={onAdd}
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category Showcase ── */}
      <section className="cat-showcase">
        <div className="container">
          <div className="cat-showcase__head">
            <p className="section-label">Something for everyone</p>
            <h2 className="section-title cat-showcase__title">Explore Our Menu</h2>
          </div>
          <div className="cat-showcase__grid">
            {categories.map(({ emoji, label, cat }, i) => (
              <Link
                key={cat}
                to={`/menu?category=${cat}`}
                className="cat-showcase__item"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="cat-showcase__emoji">{emoji}</span>
                <span className="cat-showcase__label">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about-strip" id="about">
        <div className="container about-strip__inner">
          <p className="section-label">Our Story</p>
          <h2 className="about-strip__title">
            Food made with passion,<br />
            <em>served with pride.</em>
          </h2>
          <p className="about-strip__text">
            Narf's Diner was born from a simple belief: everyone deserves a great meal.
            We source fresh ingredients daily, honour classic recipes, and aren't afraid
            to be bold. Whether it's breakfast or a late-night special, we pour heart
            into every dish.
          </p>
          <Link to="/menu" className="btn btn--primary">See Our Full Menu</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
