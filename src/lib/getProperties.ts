// src/lib/getProperties.ts
// import { getPayload } from 'payload'
import type { PropertyCard } from './property'
import { getPayloadClient } from './payload'

const PER_PAGE = 12

export interface PropertyFilters {
  listingType: string
  statuses: readonly string[]
  minBeds: number
  minPrice: number
  maxPrice: number
  from: number
  to: number
}

export async function getProperties(
  filters: PropertyFilters,
): Promise<{ docs: PropertyCard[]; total: number }> {
  const payload = await getPayloadClient()

  const where: any = {
    and: [
      { active: { equals: true } },
      { publicListing: { equals: true } },
      { status: { in: [...filters.statuses] } },
    ],
  }

  if (filters.listingType !== 'any') {
    where.and.push({ listingType: { equals: filters.listingType } })
  }
  if (filters.minBeds > 0) {
    where.and.push({ beds: { greater_than_equal: filters.minBeds } })
  }
  if (filters.minPrice > 0) {
    where.and.push({ price: { greater_than_equal: filters.minPrice } })
  }
  if (filters.maxPrice > 0) {
    where.and.push({ price: { less_than_equal: filters.maxPrice } })
  }

  const limit = filters.to - filters.from
  const page = Math.floor(filters.from / limit) + 1

  const result = await payload.find({
    collection: 'properties',
    where,
    sort: '-price',
    limit,
    page,
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

  // normalize Payload shape → PropertyCard shape
  const docs: PropertyCard[] = result.docs.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    displayAddress: p.displayAddress,
    area: p.area ?? null,
    priceLabel: p.priceLabel ?? null,
    price: p.price ?? null,
    rentFrequency: p.rentFrequency ?? null,
    listingType: p.listingType,
    propertyType: p.propertyType ?? null,
    status: p.status,
    beds: p.beds ?? null,
    baths: p.baths ?? null,
    imageUrls: p.imageUrls ?? null,
    heroImage: p.heroImage ?? null,
  }))

  return { docs, total: result.totalDocs }
}

export async function getProperty(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'properties',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return result.docs[0] ?? null
}
