// lib/sanity.js
// This file connects your website to Sanity CMS
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'sq3lwuhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

// Helper: convert a Sanity image into a usable URL
export function urlFor(source) {
  return builder.image(source)
}

// ── QUERIES ─────────────────────────────────────────────────

// Get all active tours
export async function getAllTours() {
  return client.fetch(`
    *[_type == "tour" && status == "active"] | order(cityKey asc, title asc) {
      _id, title, slug, cityKey, cityLabel, categories,
      priceFrom, priceChild, duration, languages,
      shortDescription, meetingPoint, highlights,
      includes, excludes, heroImage, featuredOnHomepage
    }
  `)
}

// Get featured tours for homepage
export async function getFeaturedTours() {
  return client.fetch(`
    *[_type == "tour" && status == "active" && featuredOnHomepage == true] | order(title asc) [0...6] {
      _id, title, slug, cityKey, cityLabel, categories,
      priceFrom, duration, shortDescription, heroImage
    }
  `)
}

// Get a single tour by slug
export async function getTourBySlug(slug) {
  return client.fetch(`
    *[_type == "tour" && slug.current == $slug][0] {
      _id, title, slug, cityKey, cityLabel, categories,
      priceFrom, priceChild, duration, departureTimes, languages,
      shortDescription, fullDescription, highlights,
      itinerary, includes, excludes, goodToKnow,
      meetingPoint, cancellationPolicy, heroImage, gallery,
      "guide": guide->{ name, city, bio, photo, yearsExperience, rating, toursLed }
    }
  `, { slug })
}

// Get all tour slugs (for static generation)
export async function getAllTourSlugs() {
  return client.fetch(`
    *[_type == "tour" && status == "active"] { "slug": slug.current }
  `)
}

// Get blog posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost" && status == "published"] | order(publishedAt desc) [0...9] {
      _id, title, slug, excerpt, publishedAt, author,
      readTime, category, heroImage
    }
  `)
}

// Get testimonials for homepage
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial" && showOnHomepage == true] | order(_createdAt desc) [0...6] {
      _id, guestName, guestCountry, tourName, rating, quote
    }
  `)
}

// Get site settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName, tagline, contactEmail, phoneNumber,
      instagramUrl, facebookUrl, tripadvisorUrl, footerText
    }
  `)
}
