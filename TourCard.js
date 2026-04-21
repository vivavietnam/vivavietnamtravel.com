// components/TourCard.js
import Link from 'next/link'
import { urlFor } from '../lib/sanity'

const TAG_MAP = {
  foodie:   ['tag-gold', 'Foodie'],
  workshop: ['tag-green', 'Workshop'],
  cultural: ['tag-green', 'Cultural'],
  night:    ['tag-blue', 'Night Tour'],
  city:     ['tag-green', 'City Tour'],
  nature:   ['tag-terra', 'Nature'],
  cafe:     ['tag-blue', 'Café Tour'],
}

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80&auto=format',
  'https://images.unsplash.com/photo-1555708982-8645ec9ce3cc?w=600&q=80&auto=format',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&auto=format',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80&auto=format',
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80&auto=format',
]

export default function TourCard({ tour, index = 0 }) {
  const cat = tour.categories?.[0] || 'cultural'
  const [tagClass, tagLabel] = TAG_MAP[cat] || ['tag-green', 'Cultural']
  const slug = tour.slug?.current || tour.slug || ''
  const imgSrc = tour.heroImage
    ? urlFor(tour.heroImage).width(600).height(400).url()
    : FALLBACK_IMGS[index % FALLBACK_IMGS.length]

  return (
    <Link href={`/tours/${slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid transparent', cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 18px 52px rgba(61,43,26,0.11)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={tour.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
          />
          <div style={{
            position: 'absolute', top: 12, left: 12,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'white', background: 'rgba(45,90,74,0.88)', padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
          }}>{tour.cityLabel || tour.cityKey}</div>
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.92)', padding: '4px 10px',
            borderRadius: 'var(--radius-pill)', fontSize: 11,
          }}>
            <span style={{ color: '#E8B96A' }}>★★★★★</span>
            <span style={{ fontWeight: 600, color: 'var(--dark-earth)' }}>4.9</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            <span className={`tag ${tagClass}`}>{tagLabel}</span>
            {tour.categories?.[1] && (() => {
              const [tc2, tl2] = TAG_MAP[tour.categories[1]] || ['tag-green', tour.categories[1]]
              return <span className={`tag ${tc2}`}>{tl2}</span>
            })()}
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--dark-earth)', lineHeight: 1.3, marginBottom: 8 }}>
            {tour.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--warm-gray)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {tour.shortDescription}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--linen)' }}>
            <div style={{ fontSize: 12, color: 'var(--warm-gray)' }}>⏱ {tour.duration || '—'}</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'var(--warm-gray)' }}>From</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--lotus-green)' }}>${tour.priceFrom || '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
