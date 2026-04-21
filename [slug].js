// pages/tours/[slug].js
import Head from 'next/head'
import { useState } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { getTourBySlug, getAllTourSlugs, urlFor } from '../../lib/sanity'

export default function TourDetail({ tour }) {
  const [tab, setTab] = useState('overview')
  const [adults, setAdults] = useState(2)
  const [bookSent, setBookSent] = useState(false)

  if (!tour) return <div style={{ padding: 80, textAlign: 'center', fontFamily: 'var(--font-sans)' }}>Tour not found.</div>

  const price = tour.priceFrom || 0
  const total = adults * price
  const heroImg = tour.heroImage
    ? urlFor(tour.heroImage).width(1200).height(600).url()
    : 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80&auto=format'

  const tabBtn = (key, label) => (
    <button onClick={() => setTab(key)} style={{
      fontSize: 13, fontWeight: tab === key ? 600 : 500,
      color: tab === key ? 'var(--lotus-green)' : 'var(--warm-gray)',
      padding: '10px 20px', background: 'none', border: 'none',
      borderBottom: tab === key ? '2px solid var(--lotus-green)' : '2px solid transparent',
      marginBottom: -2, cursor: 'pointer', whiteSpace: 'nowrap',
    }}>{label}</button>
  )

  return (
    <>
      <Head>
        <title>{tour.title} — Viva Vietnam</title>
        <meta name="description" content={tour.shortDescription || ''} />
      </Head>
      <Nav />

      {/* BREADCRUMB */}
      <div style={{ paddingTop: 'calc(var(--nav-h) + 20px)', paddingBottom: 0 }}>
        <div className="container">
          <div style={{ fontSize: 12, color: 'var(--warm-gray)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'var(--warm-gray)' }}>Home</a><span>/</span>
            <a href="/tours" style={{ color: 'var(--warm-gray)' }}>Tours</a><span>/</span>
            <span style={{ color: 'var(--dark-earth)' }}>{tour.title}</span>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div style={{ margin: '20px 0 0' }}>
        <div className="container">
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 480, position: 'relative' }}>
            <img src={heroImg} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {tour.gallery?.length > 0 && (
              <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(255,255,255,0.92)', borderRadius: 'var(--radius-pill)', padding: '7px 16px', fontSize: 12, fontWeight: 600, color: 'var(--dark-earth)', cursor: 'pointer' }}>
                + {tour.gallery.length} photos
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL LAYOUT */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, padding: '40px 0 96px', alignItems: 'start' }} className="detail-grid">

          {/* LEFT */}
          <div>
            {/* Tags + Title */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                {tour.categories?.map(cat => (
                  <span key={cat} className="tag tag-green">{cat}</span>
                ))}
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 'var(--radius-pill)', color: 'var(--warm-gray)', background: 'var(--linen)' }}>{tour.cityLabel}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,42px)', fontWeight: 700, color: 'var(--dark-earth)', lineHeight: 1.15, marginBottom: 14 }}>{tour.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--golden-harvest)', fontSize: 14 }}>★★★★★</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--dark-earth)' }}>4.9</span>
              </div>
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: '16px 0', borderTop: '1px solid var(--sand)', borderBottom: '1px solid var(--sand)', marginBottom: 24 }}>
              {[['⏱', tour.duration], ['👥', `Max ${tour.groupSize || 8}`], ['📍', tour.cityLabel], ['🌐', tour.languages?.join(', ') || 'English']].map(([icon, val]) => val && (
                <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--warm-gray)' }}>
                  <span>{icon}</span><span>{val}</span>
                </div>
              ))}
            </div>

            {/* TABS */}
            <div style={{ display: 'flex', borderBottom: '2px solid var(--sand)', marginBottom: 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {tabBtn('overview', 'Overview')}
              {tour.itinerary?.length > 0 && tabBtn('itinerary', 'Itinerary')}
              {tour.includes?.length > 0 && tabBtn('includes', 'Includes')}
              {tabBtn('faq', 'FAQ')}
            </div>

            {/* Overview */}
            {tab === 'overview' && (
              <div>
                <p style={{ fontSize: 15, color: 'var(--warm-gray)', lineHeight: 1.85, marginBottom: 18 }}>{tour.fullDescription || tour.shortDescription}</p>
                {tour.highlights?.length > 0 && (
                  <div style={{ background: 'var(--linen)', borderLeft: '3px solid var(--jade)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', padding: '20px 24px', marginTop: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--jade)', marginBottom: 12 }}>Highlights</div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {tour.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--dark-earth)', lineHeight: 1.5 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--golden-harvest)', flexShrink: 0, marginTop: 7 }} />{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.goodToKnow && (
                  <div style={{ marginTop: 24, padding: 18, background: 'rgba(122,184,212,0.1)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--river-blue)' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#3a7a9a', marginBottom: 6 }}>Good to know</div>
                    <div style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.7 }}>{tour.goodToKnow}</div>
                  </div>
                )}
              </div>
            )}

            {/* Itinerary */}
            {tab === 'itinerary' && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {tour.itinerary?.map((step, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', position: 'relative' }}>
                    {i < tour.itinerary.length - 1 && <div style={{ position: 'absolute', left: 39, top: 40, bottom: 0, width: 1, background: 'var(--sand)' }} />}
                    <div style={{ padding: '16px 0', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--jade)' }}>{step.time || ''}</div>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--lotus-green)', border: '2px solid var(--rice-paper)', boxShadow: '0 0 0 2px var(--lotus-green)', margin: '6px auto 0' }} />
                    </div>
                    <div style={{ padding: '16px 0 16px 20px' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--dark-earth)', marginBottom: 6 }}>{step.title}</div>
                      {step.description && <div style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.65 }}>{step.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Includes */}
            {tab === 'includes' && (
              <div>
                {tour.includes?.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--jade)', marginBottom: 12 }}>What's included</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {tour.includes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(90,138,120,0.08)', borderRadius: 'var(--radius-md)', fontSize: 13 }}>
                          <span style={{ color: 'var(--jade)', flexShrink: 0 }}>✓</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tour.excludes?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--lotus-bud)', marginBottom: 12 }}>Not included</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {tour.excludes.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(212,87,58,0.06)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--warm-gray)' }}>
                          <span style={{ color: 'var(--lotus-bud)', flexShrink: 0 }}>✗</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FAQ */}
            {tab === 'faq' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['How does booking work?', 'Submit an inquiry here. Our team confirms availability and sends a booking confirmation. Full payment is collected at that time via PayPal (international) or OnePay (Vietnamese bank cards).'],
                  ['What is the cancellation policy?', tour.cancellationPolicy || 'Free cancellation up to 48 hours before the tour starts. Cancellations within 48 hours are non-refundable.'],
                  ['Where do we meet?', tour.meetingPoint || 'Meeting point details will be confirmed in your booking confirmation.'],
                  ['Are vegetarian options available?', 'Yes! Please mention any dietary requirements when booking and we\'ll arrange everything in advance.'],
                ].map(([q, a]) => (
                  <div key={q} style={{ borderBottom: '1px solid var(--sand)', padding: '18px 0' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark-earth)', marginBottom: 8 }}>{q}</div>
                    <div style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.75 }}>{a}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — BOOKING CARD */}
          <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)' }}>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand)', overflow: 'hidden', boxShadow: '0 4px 32px rgba(61,43,26,0.08)' }}>
              <div style={{ background: 'var(--lotus-green)', padding: '22px 24px' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>From</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1 }}>
                  ${price} <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>/ person</span>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>★★★★★ 4.9 · 128 reviews</div>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6 }}>Select Date</label>
                <input type="date" style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--dark-earth)', background: 'var(--rice-paper)', border: '1.5px solid var(--sand)', borderRadius: 'var(--radius-md)', padding: '10px 13px', outline: 'none', marginBottom: 12 }} min={new Date().toISOString().split('T')[0]} />
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 6 }}>Adults</label>
                <select value={adults} onChange={e => setAdults(Number(e.target.value))} style={{ width: '100%', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--dark-earth)', background: 'var(--rice-paper)', border: '1.5px solid var(--sand)', borderRadius: 'var(--radius-md)', padding: '10px 13px', outline: 'none', marginBottom: 16 }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} adult{n>1?'s':''}</option>)}
                </select>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--warm-gray)', marginBottom: 8 }}>
                  <span>{adults} adult{adults>1?'s':''} × ${price}</span><span>${adults * price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1.5px solid var(--sand)', fontSize: 15, fontWeight: 600, color: 'var(--dark-earth)', marginBottom: 16 }}>
                  <span>Total</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--lotus-green)' }}>${total}</span>
                </div>
                <button
                  onClick={() => setBookSent(true)}
                  style={{ width: '100%', fontSize: 14, fontWeight: 700, color: 'var(--dark-earth)', background: bookSent ? 'var(--jade)' : 'var(--golden-harvest)', padding: 15, borderRadius: 'var(--radius-pill)', cursor: 'pointer', border: 'none', transition: 'background 0.2s', marginBottom: 10 }}
                >
                  {bookSent ? '✓ Request Sent! We\'ll confirm within 24 hours.' : 'Request to Book'}
                </button>
                <div style={{ fontSize: 11, color: 'var(--warm-gray)', textAlign: 'center' }}>🔒 No charge until confirmed by our team</div>
              </div>
              <div style={{ padding: '16px 24px', background: 'var(--rice-paper)', borderTop: '1px solid var(--sand)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Response within 24 hours', 'Free cancellation 48hrs prior', 'PayPal & OnePay accepted'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--warm-gray)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--jade)', flexShrink: 0 }} />{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Guide card */}
            {tour.guide && (
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--sand)', padding: 24, marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--linen)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--jade)', border: '2px solid var(--sand)' }}>
                    {tour.guide.name?.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--dark-earth)' }}>{tour.guide.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--warm-gray)', marginTop: 2 }}>Lead Guide · {tour.guide.city}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.7 }}>{tour.guide.bio}</p>
              </div>
            )}
          </div>
        </div>
        <style>{`@media(max-width:1024px){.detail-grid{grid-template-columns:1fr!important;} .detail-grid>div:last-child{position:static!important;}}`}</style>
      </div>

      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const slugs = await getAllTourSlugs()
  return {
    paths: slugs.map(s => ({ params: { slug: s.slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const tour = await getTourBySlug(params.slug)
  if (!tour) return { notFound: true }
  return { props: { tour }, revalidate: 60 }
}
