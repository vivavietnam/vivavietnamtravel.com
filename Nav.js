// components/Nav.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        background: scrolled ? 'rgba(245,240,232,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 #DDD4C4' : 'none',
        transition: 'background 0.4s, box-shadow 0.4s',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.svg" alt="Viva Vietnam" style={{ width: 56, height: 42, objectFit: 'contain' }} />
            </Link>

            {/* Desktop links */}
            <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }} className="desktop-nav">
              {[['Tours', '/tours'], ['Workshops', '/tours?type=workshop'], ['Cities', '/#cities'], ['About', '/#about'], ['Blog', '/blog']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{
                    fontSize: 13, fontWeight: 500, color: scrolled ? 'var(--dark-earth)' : 'white',
                    letterSpacing: '0.02em', transition: 'color 0.2s',
                  }}>{label}</Link>
                </li>
              ))}
              <li>
                <Link href="/#inquiry" style={{
                  fontSize: 13, fontWeight: 600, color: 'white',
                  background: 'var(--lotus-green)', padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)', transition: 'background 0.2s',
                }}>Plan My Trip</Link>
              </li>
            </ul>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6 }}
              className="hamburger"
              aria-label="Menu"
            >
              {[0,1,2].map(i => (
                <span key={i} style={{ display: 'block', width: 22, height: 2, background: scrolled ? 'var(--dark-earth)' : 'white', borderRadius: 2 }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0,
          background: 'var(--rice-paper)', padding: 24,
          borderBottom: '1px solid var(--sand)', zIndex: 99,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {[['Tours', '/tours'], ['Workshops', '/tours?type=workshop'], ['About', '/#about'], ['Blog', '/blog']].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 500, color: 'var(--dark-earth)', padding: '8px 0', borderBottom: '1px solid var(--linen)' }}>
              {label}
            </Link>
          ))}
          <Link href="/#inquiry" onClick={() => setMenuOpen(false)}
            style={{ fontSize: 14, fontWeight: 700, color: 'var(--lotus-green)' }}>
            Plan My Trip →
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
