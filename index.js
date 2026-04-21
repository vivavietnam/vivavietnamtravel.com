// pages/tours/index.js
import Head from 'next/head'
import { useState, useMemo } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import TourCard from '../../components/TourCard'
import { getAllTours } from '../../lib/sanity'

const CITIES = [
  { key: 'all', label: 'All Cities' },
  { key: 'hcmc', label: 'Ho Chi Minh City' },
  { key: 'hanoi', label: 'Hanoi' },
  { key: 'hoian', label: 'Hội An' },
  { key: 'dalat', label: 'Đà Lạt' },
  { key: 'danang', label: 'Đà Nẵng' },
  { key: 'nhatrang', label: 'Nha Trang' },
  { key: 'cantho', label: 'Cần Thơ' },
]

export default function ToursPage({ tours }) {
  const [city, setCity] = useState('all')
  const [type, setType] = useState('all')

  const filtered = useMemo(() => {
    return tours.filter(t => {
      const matchCity = city === 'all' || t.cityKey === city
      const isWorkshop = t.categories?.includes('workshop')
      const matchType = type === 'all' || (type === 'workshop' ? isWorkshop : !isWorkshop)
      return matchCity && matchType
    })
  }, [tours, city, type])

  const pillStyle = (active) => ({
    fontSize: 12, fontWeight: 500, padding: '6px 16px',
    borderRadius: 'var(--radius-pill)', cursor: 'pointer', border: 'none',
    background: active ? 'var(--lotus-green)' : 'white',
    color: active ? 'white' : 'var(--warm-gray)',
    border: active ? '1px solid var(--lotus-green)' : '1px solid var(--sand)',
    transition: 'all 0.18s', whiteSpace: 'nowrap',
  })

  return (
    <>
      <Head>
        <title>Tours & Workshops — Viva Vietnam</title>
        <meta name="description" content="Browse all tours and workshops across Vietnam. Filter by city, type, and price." />
      </Head>
      <Nav />

      {/* PAGE HERO */}
      <section style={{ padding: 'calc(var(--nav-h) + 56px) 0 56px', background: 'var(--lotus-green)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1400&q=50&auto=format) center/cover', opacity: 0.12 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 16, display: 'flex', gap: 8 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)' }}>Home</a>
            <span>/</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>Tours & Workshops</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 14 }}>
            Tours & <em style={{ fontStyle: 'italic', color: 'var(--golden-harvest)' }}>Workshops</em>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.7 }}>
            {tours.length}+ authentic experiences across 7 cities. Find exactly what calls to you.
          </p>
          <div style={{ display: 'flex', gap: 40, marginTop: 36, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.15)', flexWrap: 'wrap' }}>
            {[['200+', 'Experiences'], ['7', 'Cities'], ['4.9★', 'Avg Rating']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--golden-harvest)' }}>{num}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--sand)', padding: '0 24px', position: 'sticky', top: 'var(--nav-h)', zIndex: 80 }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {/* City filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px 12px 0', borderRight: '1px solid var(--sand)', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', whiteSpace: 'nowrap' }}>City</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {CITIES.map(c => (
                <button key={c.key} onClick={() => setCity(c.key)} style={pillStyle(city === c.key)}>{c.label}</button>
              ))}
            </div>
          </div>
          {/* Type filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>Type</span>
            {[['all', 'All'], ['tour', 'Tours'], ['workshop', 'Workshops']].map(([k, l]) => (
              <button key={k} onClick={() => setType(k)} style={pillStyle(type === k)}>{l}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', padding: '12px 0', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: 'var(--warm-gray)', whiteSpace: 'nowrap' }}>
              <strong style={{ color: 'var(--dark-earth)' }}>{filtered.length}</strong> experiences
            </span>
          </div>
        </div>
      </div>

      {/* GRID */}
      <main style={{ padding: '48px 0 96px' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--dark-earth)', marginBottom: 8 }}>No experiences found</div>
              <button onClick={() => { setCity('all'); setType('all') }} style={{ marginTop: 16, fontSize: 13, color: 'var(--lotus-green)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}>Clear filters →</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }} className="tours-grid">
              {filtered.map((tour, i) => (
                <TourCard key={tour._id} tour={tour} index={i} />
              ))}
            </div>
          )}
        </div>
        <style>{`@media(max-width:1024px){.tours-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:640px){.tours-grid{grid-template-columns:1fr!important;}}`}</style>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const tours = await getAllTours()
  return {
    props: { tours: tours || [] },
    revalidate: 60,
  }
}
