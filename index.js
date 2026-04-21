// pages/blog/index.js
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { getBlogPosts, urlFor } from '../../lib/sanity'

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog — Viva Vietnam</title>
        <meta name="description" content="Travel tips, city guides, and stories from Vietnam." />
      </Head>
      <Nav />

      <section style={{ padding: 'calc(var(--nav-h) + 56px) 0 56px', background: 'var(--lotus-green)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1400&q=50) center/cover', opacity: 0.12 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, color: 'white', marginBottom: 14 }}>
            Stories & <em style={{ fontStyle: 'italic', color: 'var(--golden-harvest)' }}>Travel Tips</em>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 480 }}>Guides, food stories, and local insights from our team on the ground in Vietnam.</p>
        </div>
      </section>

      <main style={{ padding: '64px 0 96px' }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, marginBottom: 8 }}>No posts yet</div>
              <p>Check back soon — we're writing!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="blog-grid">
              {posts.map((post, i) => {
                const imgSrc = post.heroImage
                  ? urlFor(post.heroImage).width(600).height(380).url()
                  : 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80&auto=format'
                return (
                  <Link key={post._id} href={`/blog/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(61,43,26,0.1)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                      <div style={{ height: 220, overflow: 'hidden' }}>
                        <img src={imgSrc} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 11, color: 'var(--warm-gray)', marginBottom: 8 }}>
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''} {post.readTime ? `· ${post.readTime} min read` : ''}
                        </div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--dark-earth)', lineHeight: 1.3, marginBottom: 10 }}>{post.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        <style>{`@media(max-width:1024px){.blog-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:640px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getBlogPosts()
  return { props: { posts: posts || [] }, revalidate: 60 }
}
