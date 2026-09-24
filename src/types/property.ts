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
  return p.listingType === 'rent' && p.rentFrequency
    ? `${formatted} ${p.rentFrequency}`
    : formatted
}

export function statusTag(status: string): string {
  switch (status) {
    case 'under-offer': return 'Under offer'
    case 'sold': return 'Sold'
    case 'let-agreed': return 'Let agreed'
    case 'let': return 'Let'
    case 'withdrawn': return 'Withdrawn'
    default: return ''
  }
}

export function metaLine(
  p: Pick<PropertyCard, 'beds' | 'baths' | 'propertyType'>,
): string {
  const parts: string[] = []
  if (p.beds != null) parts.push(`${p.beds} bed`)
  if (p.baths != null) parts.push(`${p.baths} bath`)
  if (p.propertyType) parts.push(p.propertyType)
  return parts.join(' · ')
}

export function firstImage(p: Pick<PropertyCard, 'imageUrls'>): string | null {
  return p.imageUrls?.[0]?.url ?? null
}




// /**
//  * Property queries and formatting for the front end.
//  *
//  * Kept separate from lib/sanity.ts so the page content queries and the
//  * property queries do not grow into one unreadable file.
//  */

// export interface PropertyCard {
//   _id: string
//   slug: string
//   title: string
//   displayAddress: string
//   area: string | null
//   priceLabel: string | null
//   price: number | null
//   rentFrequency: string | null
//   listingType: string
//   propertyType: string | null
//   status: string
//   beds: number | null
//   baths: number | null
//   imageUrls: { url: string; caption: string | null }[] | null
//   heroImage: unknown
// }

// const CARD_FIELDS = `
//   _id, "slug": slug.current, title, displayAddress, area,
//   priceLabel, price, rentFrequency, listingType, propertyType, status,
//   beds, baths, imageUrls, heroImage
// `

// /**
//  * The public index.
//  *
//  * Two filters are not optional. `active` excludes properties Apex27 has
//  * stopped returning, and `publicListing` excludes property bank stock, which
//  * the design is explicit is never listed publicly. Drop either one and the
//  * site advertises instructions it should not.
//  */
// export const PROPERTIES_QUERY = `*[
//   _type == "property"
//   && active == true
//   && publicListing == true
//   && ($listingType == "any" || listingType == $listingType)
//   && ($minBeds == 0 || beds >= $minBeds)
//   && ($minPrice == 0 || price >= $minPrice)
//   && ($maxPrice == 0 || price <= $maxPrice)
//   && ($statuses == null || status in $statuses)
// ] | order(coalesce(price, 0) desc) [$from...$to] {${CARD_FIELDS}}`

// export const PROPERTIES_COUNT_QUERY = `count(*[
//   _type == "property"
//   && active == true
//   && publicListing == true
//   && ($listingType == "any" || listingType == $listingType)
//   && ($minBeds == 0 || beds >= $minBeds)
//   && ($minPrice == 0 || price >= $minPrice)
//   && ($maxPrice == 0 || price <= $maxPrice)
//   && ($statuses == null || status in $statuses)
// ])`

// export const PROPERTY_QUERY = `*[_type == "property" && slug.current == $slug][0]{
//   ${CARD_FIELDS},
//   addressLine1, addressLine2, town, county, postcode, location,
//   summary, features, floorplanUrls, virtualTourUrl, epcUrl,
//   agentName, agentPhone, active, publicListing, editorialNote, syncedAt
// }`

// export const FEATURED_QUERY = `*[
//   _type == "property" && active == true && publicListing == true && featured == true
// ] | order(syncedAt desc) [0...6] {${CARD_FIELDS}}`

// /** Price bands from the design's filter bar. */
// export const PRICE_BANDS = [
//   { label: 'Any price', min: 0, max: 0 },
//   { label: 'Up to £200,000', min: 0, max: 200000 },
//   { label: '£200,000 – £350,000', min: 200000, max: 350000 },
//   { label: '£350,000 – £500,000', min: 350000, max: 500000 },
//   { label: '£500,000+', min: 500000, max: 0 },
// ] as const

// export const BED_OPTIONS = [
//   { label: 'Any beds', value: 0 },
//   { label: '1+', value: 1 },
//   { label: '2+', value: 2 },
//   { label: '3+', value: 3 },
//   { label: '4+', value: 4 },
// ] as const

// /** The tabs across the top of the index, matching the design. */
// export const TABS = [
//   { key: 'sale', label: 'For sale', listingType: 'sale', statuses: ['available', 'under-offer'] },
//   { key: 'rent', label: 'To let', listingType: 'rent', statuses: ['available', 'let-agreed'] },
//   { key: 'latest', label: 'Latest', listingType: 'any', statuses: ['available'] },
//   { key: 'sold', label: 'Recently sold & let', listingType: 'any', statuses: ['sold', 'let'] },
// ] as const

// export function formatPrice(
//   p: Pick<PropertyCard, 'priceLabel' | 'price' | 'listingType' | 'rentFrequency'>,
// ): string {
//   if (p.priceLabel) return p.priceLabel
//   if (p.price === null || p.price === undefined) return 'Price on application'
//   const formatted = new Intl.NumberFormat('en-GB', {
//     style: 'currency',
//     currency: 'GBP',
//     maximumFractionDigits: 0,
//   }).format(p.price)
//   return p.listingType === 'rent' && p.rentFrequency ? `${formatted} ${p.rentFrequency}` : formatted
// }

// /** The corner tag on a card. Empty for a plainly available property. */
// export function statusTag(status: string): string {
//   switch (status) {
//     case 'under-offer':
//       return 'Under offer'
//     case 'sold':
//       return 'Sold'
//     case 'let-agreed':
//       return 'Let agreed'
//     case 'let':
//       return 'Let'
//     case 'withdrawn':
//       return 'Withdrawn'
//     default:
//       return ''
//   }
// }

// export function metaLine(p: Pick<PropertyCard, 'beds' | 'baths' | 'propertyType'>): string {
//   const parts: string[] = []
//   if (p.beds !== null && p.beds !== undefined) parts.push(`${p.beds} bed`)
//   if (p.baths !== null && p.baths !== undefined) parts.push(`${p.baths} bath`)
//   if (p.propertyType) parts.push(p.propertyType)
//   return parts.join(' · ')
// }

// export function firstImage(p: Pick<PropertyCard, 'imageUrls'>): string | null {
//   return p.imageUrls?.[0]?.url ?? null
// }
