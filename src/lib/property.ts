// lib/properties.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// src/lib/property.ts

export interface PropertyCard {
  id: string
  slug: string
  title: string
  displayAddress: string
  area: string | null
  priceLabel: string | null
  price: number | null
  rentFrequency: string | null
  listingType: string
  propertyType: string | null
  status: string
  beds: number | null
  baths: number | null
  imageUrls: { url: string; caption: string | null }[] | null
  heroImage: unknown
}

export const PRICE_BANDS = [
  { label: 'Any price', min: 0, max: 0 },
  { label: 'Up to £200,000', min: 0, max: 200000 },
  { label: '£200,000 – £350,000', min: 200000, max: 350000 },
  { label: '£350,000 – £500,000', min: 350000, max: 500000 },
  { label: '£500,000+', min: 500000, max: 0 },
] as const

export const BED_OPTIONS = [
  { label: 'Any beds', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
] as const

export const TABS = [
  { key: 'sale', label: 'For sale', listingType: 'sale', statuses: ['available', 'under-offer'] },
  { key: 'rent', label: 'To let', listingType: 'rent', statuses: ['available', 'let-agreed'] },
  { key: 'latest', label: 'Latest', listingType: 'any', statuses: ['available'] },
  { key: 'sold', label: 'Recently sold & let', listingType: 'any', statuses: ['sold', 'let'] },
] as const

export function formatPrice(
  p: Pick<PropertyCard, 'priceLabel' | 'price' | 'listingType' | 'rentFrequency'>,
): string {
  if (p.priceLabel) return p.priceLabel
  if (p.price === null || p.price === undefined) return 'Price on application'
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(p.price)
  return p.listingType === 'rent' && p.rentFrequency ? `${formatted} ${p.rentFrequency}` : formatted
}

export function statusTag(status: string): string {
  switch (status) {
    case 'under-offer':
      return 'Under offer'
    case 'sold':
      return 'Sold'
    case 'let-agreed':
      return 'Let agreed'
    case 'let':
      return 'Let'
    case 'withdrawn':
      return 'Withdrawn'
    default:
      return ''
  }
}

export function metaLine(p: Pick<PropertyCard, 'beds' | 'baths' | 'propertyType'>): string {
  const parts: string[] = []
  if (p.beds != null) parts.push(`${p.beds} bed`)
  if (p.baths != null) parts.push(`${p.baths} bath`)
  if (p.propertyType) parts.push(p.propertyType)
  return parts.join(' · ')
}

export function firstImage(p: Pick<PropertyCard, 'imageUrls'>): string | null {
  return p.imageUrls?.[0]?.url ?? null
}

export type PropertyFilters = {
  listingType?: 'sale' | 'rent' | 'commercial' | 'unknown' | 'any'
  minBeds?: number
  minPrice?: number
  maxPrice?: number
  statuses?: string[]
  from?: number
  to?: number
}

export async function getProperties(filters: PropertyFilters = {}) {
  const {
    listingType = 'any',
    minBeds = 0,
    minPrice = 0,
    maxPrice = 0,
    statuses,
    from = 0,
    to = 12,
  } = filters

  const payload = await getPayload({ config: configPromise })

  // build where clause
  const where: any = {
    and: [{ active: { equals: true } }, { publicListing: { equals: true } }],
  }

  if (listingType !== 'any') {
    where.and.push({ listingType: { equals: listingType } })
  }

  if (minBeds > 0) {
    where.and.push({ beds: { greater_than_equal: minBeds } })
  }

  if (minPrice > 0) {
    where.and.push({ price: { greater_than_equal: minPrice } })
  }

  if (maxPrice > 0) {
    where.and.push({ price: { less_than_equal: maxPrice } })
  }

  if (statuses && statuses.length > 0) {
    where.and.push({ status: { in: statuses } })
  }

  const limit = to - from
  const page = Math.floor(from / limit) + 1

  const result = await payload.find({
    collection: 'properties',
    where,
    sort: '-price',
    limit,
    page,
    // only select fields you need (like CARD_FIELDS in GROQ)
    select: {
      slug: true,
      title: true,
      displayAddress: true,
      area: true,
      priceLabel: true,
      price: true,
      rentFrequency: true,
      listingType: true,
      propertyType: true,
      status: true,
      beds: true,
      baths: true,
      imageUrls: true,
      heroImage: true,
    },
  })

  return result.docs.map((doc): PropertyCard => ({
    id: String(doc.id),
    slug: doc.slug ?? '',
    title: doc.title ?? '',
    displayAddress: doc.displayAddress ?? '',
    area: doc.area ?? null,
    priceLabel: doc.priceLabel ?? null,
    price: doc.price ?? null,
    rentFrequency: doc.rentFrequency ?? null,
    listingType: doc.listingType ?? '',
    propertyType: doc.propertyType ?? null,
    status: doc.status ?? '',
    beds: doc.beds ?? null,
    baths: doc.baths ?? null,
    imageUrls: (doc.imageUrls as PropertyCard['imageUrls']) ?? null,
    heroImage: doc.heroImage,
  }))
}
