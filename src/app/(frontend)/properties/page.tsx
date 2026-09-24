import { getProperties } from '@/lib/getProperties'
import {
  TABS,
  PRICE_BANDS,
  BED_OPTIONS,
  formatPrice,
  statusTag,
  metaLine,
  firstImage,
} from '@/lib/property'
import Link from 'next/link'

const PER_PAGE = 12

type SearchParams = Promise<{
  tab?: string
  price?: string
  beds?: string
  page?: string
}>

function linkFor(current: URLSearchParams, overrides: Record<string, string | number>): string {
  const next = new URLSearchParams(current)

  for (const [k, v] of Object.entries(overrides)) {
    next.set(k, String(v))
  }

  next.delete('page')

  return `/properties?${next.toString()}`
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams

  const tabKey = params.tab ?? 'sale'
  const tab = TABS.find((t) => t.key === tabKey) ?? TABS[0]

  const bandIndex = Number(params.price ?? '0')
  const band = PRICE_BANDS[bandIndex] ?? PRICE_BANDS[0]

  const minBeds = Number(params.beds ?? '0')
  const page = Math.max(1, Number(params.page ?? '1'))

  const sp = new URLSearchParams({
    tab: tabKey,
    price: String(bandIndex),
    beds: String(minBeds),
    ...(params.page ? { page: params.page } : {}),
  })

  let properties: Awaited<ReturnType<typeof getProperties>>['docs'] = []
  let total = 0
  let failed = false

  try {
    const result = await getProperties({
      listingType: tab.listingType,
      statuses: tab.statuses,
      minBeds,
      minPrice: band.min,
      maxPrice: band.max,
      from: (page - 1) * PER_PAGE,
      to: page * PER_PAGE,
    })

    properties = result.docs
    total = result.total
  } catch (err) {
    console.error('[properties] query failed', err)
    failed = true
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  return (
    <>
      <section
        style={{
          background: '#012B41',
          color: '#fff',
          padding: '150px clamp(16px,4vw,32px) 60px',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#FA8300',
                display: 'inline-block',
              }}
            />

            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.16em',
                textTransform: 'uppercase',
              }}
            >
              Properties · Sales and lettings
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: "'Quinlee Sans',sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(40px,5.6vw,82px)',
              lineHeight: 0.9,
              maxWidth: 900,
            }}
          >
            Everything we are selling and letting, updated as it lists.
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: 640,
              fontSize: 15,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Not everything we sell appears publicly: some instructions are marketed only to our
            register, so the surest way to see the whole picture is to register once and let the
            matching do the work.
          </p>

          <div>
            <Link
              href="/register-with-us"
              style={{
                display: 'inline-block',
                background: '#FA8300',
                color: '#012B41',
                fontWeight: 700,
                fontSize: 14,
                padding: '14px 24px',
                borderRadius: 999,
              }}
            >
              Register with us
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '32px clamp(16px,4vw,32px) 0',
        }}
      >
        <form
          method="get"
          action="/properties"
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 18,
            padding: 18,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            border: '1px solid rgba(1,43,65,0.06)',
          }}
        >
          <input type="hidden" name="tab" value={tab.key} />

          <select
            name="price"
            defaultValue={bandIndex}
            style={{
              flex: '1 1 200px',
              padding: '12px 14px',
              borderRadius: 999,
              border: '1px solid rgba(1,43,65,0.15)',
              fontSize: 14,
              background: '#fff',
            }}
          >
            {PRICE_BANDS.map((b, i) => (
              <option key={i} value={i}>
                {b.label}
              </option>
            ))}
          </select>

          <select
            name="beds"
            defaultValue={minBeds}
            style={{
              flex: '1 1 140px',
              padding: '12px 14px',
              borderRadius: 999,
              border: '1px solid rgba(1,43,65,0.15)',
              fontSize: 14,
              background: '#fff',
            }}
          >
            {BED_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            style={{
              flex: '0 0 auto',
              background: '#012B41',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              padding: '13px 28px',
              borderRadius: 999,
              border: 0,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>
      </section>

      <section
        style={{
          padding: '28px clamp(16px,4vw,96px) clamp(56px,7vw,96px)',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(1,43,65,0.15)',
              paddingBottom: 16,
            }}
          >
            {TABS.map((t) => (
              <Link
                key={t.key}
                href={linkFor(sp, { tab: t.key })}
                style={{
                  padding: '9px 18px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  ...(t.key === tab.key
                    ? {
                        background: '#012B41',
                        color: '#fff',
                      }
                    : {
                        background: '#fff',
                        color: '#012B41',
                        border: '1px solid rgba(1,43,65,0.12)',
                      }),
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>

          {failed ? (
            <p
              style={{
                margin: 0,
                padding: '48px 0',
                textAlign: 'center',
                color: 'rgba(1,43,65,0.7)',
              }}
            >
              The property list could not be loaded just now. Please refresh, or call 0333 3444 035
              and we will talk you through what is available.
            </p>
          ) : properties.length === 0 ? (
            <div
              style={{
                padding: '48px 0',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: 'rgba(1,43,65,0.7)',
                  maxWidth: 520,
                }}
              >
                Nothing matches that search at the moment. Register with us and we will tell you the
                day something does, including property bank stock that is never listed publicly.
              </p>

              <Link
                href="/register-with-us"
                style={{
                  background: '#FA8300',
                  color: '#012B41',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '13px 24px',
                  borderRadius: 999,
                  textDecoration: 'none',
                }}
              >
                Register with us
              </Link>
            </div>
          ) : (
            <>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(1,43,65,0.6)',
                }}
              >
                {total} {total === 1 ? 'property' : 'properties'}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))',
                  gap: 24,
                }}
              >
                {properties.map((p) => {
                  const img = firstImage(p)
                  const tag = statusTag(p.status)

                  return (
                    <Link
                      key={p.id}
                      href={`/properties/${p.slug}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '1px solid rgba(1,43,65,0.08)',
                        background: '#fff',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '4/3',
                          background: '#e5e9ec',
                          overflow: 'hidden',
                        }}
                      >
                        {img && (
                          <img
                            src={img}
                            alt={p.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        )}

                        {tag && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              background: '#012B41',
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: 999,
                            }}
                          >
                            {tag}
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            color: 'rgba(1,43,65,0.55)',
                          }}
                        >
                          {metaLine(p)}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            fontSize: 15,
                            color: '#012B41',
                          }}
                        >
                          {p.displayAddress}
                        </p>

                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 700,
                            color: '#012B41',
                          }}
                        >
                          {formatPrice(p)}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <nav
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                paddingTop: 16,
              }}
            >
              {page > 1 && (
                <Link
                  href={`/properties?${new URLSearchParams({
                    ...Object.fromEntries(sp),
                    page: String(page - 1),
                  })}`}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    border: '1px solid rgba(1,43,65,0.15)',
                    fontSize: 14,
                    textDecoration: 'none',
                    color: '#012B41',
                  }}
                >
                  Previous
                </Link>
              )}

              <span
                style={{
                  fontSize: 14,
                  color: 'rgba(1,43,65,0.65)',
                }}
              >
                Page {page} of {totalPages}
              </span>

              {page < totalPages && (
                <Link
                  href={`/properties?${new URLSearchParams({
                    ...Object.fromEntries(sp),
                    page: String(page + 1),
                  })}`}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    border: '1px solid rgba(1,43,65,0.15)',
                    fontSize: 14,
                    textDecoration: 'none',
                    color: '#012B41',
                  }}
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}
