import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <h3 className="footer__brand">Narf's Diner</h3>
            <p className="footer__tagline">The Best In Town</p>
            <p className="footer__about">
              Crafting bold, honest food with the finest local ingredients.
              Every plate tells a story.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social"><Instagram size={16} /></a>
              <a href="#" className="footer__social"><Facebook size={16} /></a>
            </div>
          </div>

          {/* Hours */}
          <div id="about">
            <h4 className="footer__section-title">Hours</h4>
            <div className="footer__hours">
              <div className="footer__hours-row">
                <Clock size={13} className="footer__icon" />
                Mon – Fri: 7:00am – 10:00pm
              </div>
              <div className="footer__hours-row">
                <Clock size={13} className="footer__icon" />
                Sat – Sun: 8:00am – 11:00pm
              </div>
            </div>

            <h4 className="footer__section-title" style={{ marginTop: 32 }}>Quick Links</h4>
            <nav className="footer__nav">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/menu" className="footer__link">Menu</Link>
              <a href="#about" className="footer__link">About</a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__section-title">Visit Us</h4>
            <div className="footer__contact">
              <div className="footer__contact-row">
                <MapPin size={14} className="footer__icon" />
                <span>123 Flavour Street<br />Port Harcourt, Rivers State</span>
              </div>
              <div className="footer__contact-row">
                <Phone size={14} className="footer__icon" />
                <a href="tel:+2348000000000" className="footer__link">+234 800 000 0000</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Narf's Diner. All rights reserved.</p>
          <Link to="/admin" className="footer__admin-link">Admin ↗</Link>
        </div>
      </div>
    </footer>
  )
}
