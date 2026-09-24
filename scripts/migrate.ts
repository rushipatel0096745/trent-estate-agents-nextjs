import dotenv from 'dotenv'
dotenv.config()
import payload from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

// ── helpers ────────────────────────────────────────────────────────────────

function readNdjson(filePath: string): any[] {
  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

function slug(field: any): string {
  return field?.current ?? ''
}

// ── migrate properties ─────────────────────────────────────────────────────

async function migrateProperties1(docs: any[]) {
  const properties = docs.filter((d) => d._type === 'property')
  console.log(`\nMigrating ${properties.length} properties...`)

  for (const p of properties) {
    try {
      await payload.create({
        collection: 'properties',
        data: {
          apex27Id: p.apex27Id ?? null,
          slug: slug(p.slug),
          title: p.title ?? null,
          displayAddress: p.displayAddress ?? null,
          addressLine1: p.addressLine1 ?? null,
          addressLine2: p.addressLine2 ?? null,
          area: p.area ?? null,
          town: p.town ?? null,
          county: p.county ?? null,
          postcode: p.postcode ?? null,
          //   location: p.location ? { lat: p.location.lat, lng: p.location.lng } : null,
          location:
            p.location && p.location.lat != null
              ? { lat: p.location.lat, lng: p.location.lng }
              : undefined,
          listingType: p.listingType ?? null,
          propertyType: p.propertyType ?? null,
          status: p.status ?? null,
          price: p.price ?? null,
          priceLabel: p.priceLabel ?? null,
          rentFrequency: p.rentFrequency ?? null,
          beds: p.beds ?? null,
          baths: p.baths ?? null,
          receptions: p.receptions ?? null,
          summary: p.summary ?? null,
          // features: ["South-facing garden"] → [{ value: "South-facing garden" }]
          features: (p.features ?? []).map((f: string) => ({ value: f })),
          // imageUrls: strip _key and _type
          imageUrls: (p.imageUrls ?? []).map((img: any) => ({
            url: img.url ?? null,
            caption: img.caption ?? null,
          })),
          floorplanUrls: (p.floorplanUrls ?? []).map((u: string) => ({ url: u })),
          virtualTourUrl: p.virtualTourUrl ?? null,
          epcUrl: p.epcUrl ?? null,
          publicListing: p.publicListing ?? true,
          agentName: p.agentName ?? null,
          agentPhone: p.agentPhone ?? null,
          branchId: p.branchId ?? null,
          sourceHash: p.sourceHash ?? null,
          syncedAt: p.syncedAt ?? null,
          active: p.active ?? true,
          // editorial
          featured: p.featured ?? false,
          editorialNote: p.editorialNote ?? null,
        },
      })
      console.log(`  ✓ property: ${p.title} (${p.apex27Id})`)
    } catch (err: any) {
      console.error(`  ✗ property: ${p._id} — ${err.message}`)
    }
  }
}

async function migrateProperties(docs: any[]) {
  const properties = docs.filter((d) => d._type === 'property')
  console.log(`\nMigrating ${properties.length} properties...`)

  for (const p of properties) {
    try {
      const existing = await payload.find({
        collection: 'properties',
        where: { apex27Id: { equals: p.apex27Id } },
        limit: 1,
      })
      if (existing.docs.length) {
        console.log(`  - skipped (exists): ${p.apex27Id}`)
        continue
      }

      await payload.create({
        collection: 'properties',
        data: {
          apex27Id: p.apex27Id ?? null,
          slug: slug(p.slug),
          title: p.title ?? null,
          displayAddress: p.displayAddress ?? null,
          addressLine1: p.addressLine1 ?? null,
          addressLine2: p.addressLine2 ?? null,
          area: p.area ?? null,
          town: p.town ?? null,
          county: p.county ?? null,
          postcode: p.postcode ?? null,
          //   location: p.location ? { lat: p.location.lat, lng: p.location.lng } : null,
          location:
            p.location && p.location.lat != null
              ? { lat: p.location.lat, lng: p.location.lng }
              : undefined,
          listingType: p.listingType ?? null,
          propertyType: p.propertyType ?? null,
          status: p.status ?? null,
          price: p.price ?? null,
          priceLabel: p.priceLabel ?? null,
          rentFrequency: p.rentFrequency ?? null,
          beds: p.beds ?? null,
          baths: p.baths ?? null,
          receptions: p.receptions ?? null,
          summary: p.summary ?? null,
          // features: ["South-facing garden"] → [{ value: "South-facing garden" }]
          features: (p.features ?? []).map((f: string) => ({ value: f })),
          // imageUrls: strip _key and _type
          imageUrls: (p.imageUrls ?? []).map((img: any) => ({
            url: img.url ?? null,
            caption: img.caption ?? null,
          })),
          floorplanUrls: (p.floorplanUrls ?? []).map((u: string) => ({ url: u })),
          virtualTourUrl: p.virtualTourUrl ?? null,
          epcUrl: p.epcUrl ?? null,
          publicListing: p.publicListing ?? true,
          agentName: p.agentName ?? null,
          agentPhone: p.agentPhone ?? null,
          branchId: p.branchId ?? null,
          sourceHash: p.sourceHash ?? null,
          syncedAt: p.syncedAt ?? null,
          active: p.active ?? true,
          // editorial
          featured: p.featured ?? false,
          editorialNote: p.editorialNote ?? null,
        },
      })
      console.log(`  ✓ property: ${p.title} (${p.apex27Id})`)
    } catch (err: any) {
      console.error(`  ✗ property: ${p._id} — ${err.message}`)
    }

    // small delay between inserts
    await new Promise((res) => setTimeout(res, 300))
  }
}

// ── migrate pages ──────────────────────────────────────────────────────────

function mapBlocks(blocks: any[]): any[] {
  return (blocks ?? [])
    .map((block: any) => {
      if (block._type === 'para') {
        return { blockType: 'para', text: block.text ?? '' }
      }
      if (block._type === 'subheading') {
        return { blockType: 'subheading', text: block.text ?? '' }
      }
      if (block._type === 'bullets') {
        return {
          blockType: 'bullets',
          items: (block.items ?? []).map((i: string) => ({ text: i })),
        }
      }
      if (block._type === 'table') {
        return {
          blockType: 'table',
          rows: (block.rows ?? []).map((row: any) => ({
            cells: (row.cells ?? []).map((c: string) => ({ value: c })),
          })),
        }
      }
      return null
    })
    .filter(Boolean)
}

async function migratePages(docs: any[]) {
  const pages = docs.filter((d) => d._type === 'page')
  console.log(`\nMigrating ${pages.length} pages...`)

  for (const p of pages) {
    try {
      await payload.create({
        collection: 'pages',
        data: {
          title: p.title,
          slug: slug(p.slug),
          group: p.group ?? null,
          intro: (p.intro ?? []).map((text: string) => ({ text })),
          sections: (p.sections ?? []).map((s: any) => ({
            heading: s.heading ?? '',
            blocks: mapBlocks(s.blocks ?? []),
          })),
          faqs: (p.faqs ?? []).map((f: any) => ({
            q: f.q ?? '',
            a: f.a ?? '',
          })),
          devNotes: p.devNotes ?? null,
        },
      })
      console.log(`  ✓ page: ${p.title}`)
    } catch (err: any) {
      console.error(`  ✗ page: ${p._id} — ${err.message}`)
    }
  }
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  await payload.init({ config })

  const ndjsonPath = path.resolve('./sanity-export/production-export/data.ndjson')
  const docs = readNdjson(ndjsonPath)

  await migrateProperties(docs)
  //   await migratePages(docs)

  console.log('\n✅ Migration complete')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
