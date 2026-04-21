// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import TourCard from '../components/TourCard'
import { getFeaturedTours, getTestimonials } from '../lib/sanity'

export default function Home({ featuredTours, testimonials }) {

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Viva Vietnam — Discover Vietnam's True Spirit</title>
        <meta name="description" content="Authentic tours and workshops across Vietnam. Small groups, local guides, real experiences." />
      </Head>
      <Nav />

      {/* HERO */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 600, display: 'flex', alignItems: 'flex-end', paddingBottom: 80, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(45,90,74,0.3) 0%, rgba(45,90,74,0.05) 40%, rgba(61,43,26,0.55) 100%), url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600&q=80&auto=format) center/cover no-repeat',
          animation: 'heroZoom 12s ease-out forwards',
        }} />
        <style>{`
          @keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        `}</style>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, animation: 'fadeUp 0.8s 0.3s both' }}>
              <div style={{ width: 40, height: 1, background: 'var(--golden-harvest)' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--golden-harvest)' }}>Vietnam As Locals Know It</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px,7vw,80px)', fontWeight: 700, color: 'white', lineHeight: 1.05, marginBottom: 20, animation: 'fadeUp 0.9s 0.45s both' }}>
              Discover<br />Vietnam's<br /><em style={{ fontStyle: 'italic', color: 'var(--golden-harvest)' }}>True Spirit</em>
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', maxWidth: 480, lineHeight: 1.7, marginBottom: 36, animation: 'fadeUp 0.9s 0.6s both' }}>
              Hidden alleys, village kitchens, and faces you'll never forget. Every tour is designed to feel personal, meaningful, and full of life.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 0.9s 0.75s both' }}>
              <Link href="/tours" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--dark-earth)', background: 'var(--golden-harvest)', padding: '14px 28px', borderRadius: 'var(--radius-pill)', transition: 'background 0.2s' }}>
                Explore Tours →
              </Link>
              <Link href="#inquiry" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'white', padding: '14px 20px', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 'var(--radius-pill)' }}>
                Plan a Custom Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: 'var(--lotus-green)', padding: '18px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 48, animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
          {[...Array(2)].flatMap(() => [
            'Nearly 200 tours & workshops', '7 cities across Vietnam', 'Small groups, local guides',
            '4.9★ average rating', 'Secure PayPal & OnePay', 'Free cancellation 48hrs prior'
          ]).map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 500 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--golden-harvest)' }} />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED TOURS */}
      <section style={{ padding: '80px 0 100px', background: 'var(--linen)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <div className="reveal">
              <span className="tag tag-green" style={{ marginBottom: 12, display: 'inline-block' }}>Iconic Experiences</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--dark-earth)' }}>
                Tours that feel like<br /><em style={{ fontStyle: 'italic', color: 'var(--jade)' }}>memories in the making</em>
              </h2>
            </div>
            <Link href="/tours" className="reveal" style={{ fontSize: 13, fontWeight: 600, color: 'var(--lotus-green)', borderBottom: '1.5px solid var(--lotus-green)', paddingBottom: 2 }}>
              View all tours →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="tours-grid">
            {(featuredTours && featuredTours.length > 0 ? featuredTours : []).map((tour, i) => (
              <div key={tour._id} className="reveal">
                <TourCard tour={tour} index={i} />
              </div>
            ))}
          </div>
          <style>{`@media(max-width:1024px){.tours-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:640px){.tours-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="about-grid">
            <div className="reveal">
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--jade)', marginBottom: 16 }}>Who We Are</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 700, color: 'var(--dark-earth)', lineHeight: 1.2, marginBottom: 24 }}>
                Vietnam isn't a destination —<br />it's <em style={{ fontStyle: 'italic', color: 'var(--jade)' }}>a feeling</em>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: 20 }}>
                We create authentic travel experiences that connect visitors with Vietnam's people, flavors, and traditions. From hidden alleys to timeless villages, every tour is designed to feel personal, meaningful, and full of life.
              </p>
              <p style={{ fontSize: 15, color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: 32 }}>
                Our guides grew up here. They know the market grandmother who makes the best bánh mì, the rooftop no tourist has found yet, and the story behind every lantern in Hội An.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, paddingTop: 32, borderTop: '1px solid var(--sand)' }}>
                {[['200+', 'Tours & Workshops'], ['7', 'Cities Covered'], ['4.9★', 'Guest Rating']].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--lotus-green)', lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: 12, color: 'var(--warm-gray)', marginTop: 6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80&auto=format" alt="Local guide" style={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} loading="lazy" />
              <div style={{ position: 'absolute', bottom: 32, left: -28, background: 'white', borderRadius: 'var(--radius-lg)', padding: '16px 20px', boxShadow: '0 8px 40px rgba(61,43,26,0.12)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--lotus-green)' }}>10+</div>
                <div style={{ fontSize: 12, color: 'var(--warm-gray)', marginTop: 4 }}>Years creating memories</div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials && testimonials.length > 0 && (
        <section style={{ padding: '80px 0 100px', background: 'var(--linen)', overflow: 'hidden' }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: 48 }}>
              <span className="tag tag-green" style={{ marginBottom: 12, display: 'inline-block' }}>Real Stories</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--dark-earth)' }}>
                What our guests <em style={{ fontStyle: 'italic', color: 'var(--jade)' }}>remember</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="testi-grid">
              {testimonials.map(t => (
                <div key={t._id} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 32 }} className="reveal">
                  <div style={{ color: 'var(--golden-harvest)', fontSize: 14, marginBottom: 16 }}>{'★'.repeat(t.rating || 5)}</div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--dark-earth)', lineHeight: 1.7, marginBottom: 24 }}>"{t.quote}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--linen)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--jade)', fontSize: 14 }}>
                      {t.guestName?.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-earth)' }}>{t.guestName}</div>
                      <div style={{ fontSize: 11, color: 'var(--warm-gray)', marginTop: 2 }}>{t.guestCountry} · {t.tourName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <style>{`@media(max-width:1024px){.testi-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:640px){.testi-grid{grid-template-columns:1fr!important;}}`}</style>
          </div>
        </section>
      )}

      {/* INQUIRY */}
      <section id="inquiry" style={{ padding: '100px 0', background: 'var(--dark-earth)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=60&auto=format) center/cover', opacity: 0.12 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="inquiry-grid">
            <div className="reveal">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 700, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
                Your perfect Vietnam trip<br />starts with a <em style={{ fontStyle: 'italic', color: 'var(--golden-harvest)' }}>conversation</em>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32 }}>
                Tell us a little about what you're dreaming of. Our team will reach out within 24 hours with a personalised itinerary — no obligation.
              </p>
              {['Response within 24 hours', 'Custom private tours available', 'Fixed departures for solo travellers', 'Secure payment via PayPal or OnePay', 'Free cancellation up to 48hrs prior'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--golden-harvest)', flexShrink: 0 }} />{f}
                </div>
              ))}
            </div>
            <div className="reveal">
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 36 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--dark-earth)', marginBottom: 6 }}>Plan My Trip</div>
                <div style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 24 }}>We'll get back to you within 24 hours.</div>
                {[['Name', 'text', 'Your name'], ['Email', 'email', 'your@email.com'], ['Destination', 'text', 'Ho Chi Minh City, Hanoi...'], ['Group Size', 'text', '2 people']].map(([label, type, placeholder]) => (
                  <div key={label} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6 }}>{label}</label>
                    <input type={type} placeholder={placeholder} style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--dark-earth)', background: 'var(--rice-paper)', border: '1.5px solid var(--sand)', borderRadius: 'var(--radius-md)', padding: '11px 14px', outline: 'none' }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6 }}>Message</label>
                  <textarea placeholder="Tell us what you're looking for..." style={{ width: '100%', height: 90, fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--dark-earth)', background: 'var(--rice-paper)', border: '1.5px solid var(--sand)', borderRadius: 'var(--radius-md)', padding: '11px 14px', outline: 'none', resize: 'none' }} />
                </div>
                <button style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'white', background: 'var(--lotus-green)', padding: 14, borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}>Send My Inquiry →</button>
                <div style={{ fontSize: 11, color: 'var(--warm-gray)', textAlign: 'center', marginTop: 12 }}>🔒 No charge until confirmed by our team</div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.inquiry-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const [featuredTours, testimonials] = await Promise.all([
    getFeaturedTours(),
    getTestimonials(),
  ])
  return {
    props: { featuredTours: featuredTours || [], testimonials: testimonials || [] },
    revalidate: 60, // rebuild every 60 seconds when content changes
  }
}
