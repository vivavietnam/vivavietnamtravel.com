// components/Footer.js
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#1E3D30', color: 'rgba(255,255,255,0.65)', padding: '56px 0 28px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 28 }}>
          <div>
            <img src="/logo.svg" alt="Viva Vietnam" style={{ width: 64, height: 48, objectFit: 'contain' }} />
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: '14px 0 20px', color: 'rgba(255,255,255,0.5)' }}>
              Creating authentic travel experiences that connect visitors with Vietnam's people, flavors, and traditions. Since 2015.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['ig', 'fb', 'ta', 'yt'].map(s => (
                <a key={s} href="#" style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, transition: 'background 0.2s' }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 16 }}>Explore</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[['All Tours', '/tours'], ['Workshops', '/tours?type=workshop'], ['City Guides', '/tours'], ['Custom Trips', '/#inquiry'], ['Gift Vouchers', '#']].map(([label, href]) => (
                <li key={label}><Link href={href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 16 }}>Company</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[['About Us', '/#about'], ['Our Guides', '#'], ['Blog', '/blog'], ['Careers', '#']].map(([label, href]) => (
                <li key={label}><Link href={href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 16 }}>Support</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[['Contact Us', '/#inquiry'], ['FAQ', '#'], ['Cancellation Policy', '#']].map(([label, href]) => (
                <li key={label}><Link href={href} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</Link></li>
              ))}
            </ul>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white', marginBottom: 10 }}>We Accept</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['PayPal', 'OnePay'].map(p => (
                  <span key={p} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 4, padding: '5px 10px', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>© 2026 Viva Vietnam. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 18 }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
