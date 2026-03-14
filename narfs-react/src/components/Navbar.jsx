import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const links = [
    { to: '/',      label: 'Home' },
    { to: '/menu',  label: 'Menu' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-name">Narf's</span>
            <span className="navbar__logo-sub">Diner</span>
          </Link>

          {/* Desktop links */}
          <div className="navbar__links">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`navbar__link ${location.pathname === l.to ? 'navbar__link--active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <a href="#about" className="navbar__link">About</a>
            <a href="#contact" className="navbar__link">Contact</a>
          </div>

          {/* Cart + Hamburger */}
          <div className="navbar__actions">
            <button className="navbar__cart" onClick={onCartClick} aria-label="Open cart">
              <ShoppingBag size={17} />
              <span className="navbar__cart-label">Order</span>
              {cartCount > 0 && (
                <span className="navbar__badge">{cartCount}</span>
              )}
            </button>
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__links">
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} className="mobile-drawer__link" style={{ animationDelay: `${i * 60}ms` }}>
              {l.label}
            </Link>
          ))}
          <a href="#about" className="mobile-drawer__link" style={{ animationDelay: '120ms' }}
             onClick={() => setMobileOpen(false)}>About</a>
          <a href="#contact" className="mobile-drawer__link" style={{ animationDelay: '180ms' }}
             onClick={() => setMobileOpen(false)}>Contact</a>
        </div>
        <p className="mobile-drawer__tagline">The best in town.</p>
      </div>
    </>
  )
}
