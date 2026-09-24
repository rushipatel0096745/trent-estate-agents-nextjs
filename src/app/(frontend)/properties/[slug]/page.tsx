import { notFound, redirect } from 'next/navigation'
import { getProperty } from '@/lib/getProperties'
import { formatPrice, statusTag, metaLine } from '@/lib/property'

type Props = { params: Promise<{ slug: string }> }

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const property = await getProperty(slug)

  if (!property) notFound()
  if (property.publicListing === false) redirect('/register-with-us')

  const withdrawn = property.active === false
  const tag = statusTag(property.status as string)
  const meta = metaLine({
    beds: property.beds as number,
    baths: property.baths as number,
    propertyType: property.propertyType as string,
  })
  const images = (property.imageUrls as { url: string; caption: string | null }[]) ?? []
  const features = (property.features as { value: string }[]) ?? []
  const floorplans = (property.floorplanUrls as { url: string }[]) ?? []
  const Q = "font-family:'Quinlee Sans',sans-serif;font-weight:400;"

  return (
    <>
      {withdrawn && (
        <div
          style={{
            background: '#012B41',
            color: '#fff',
            padding: '14px clamp(16px,4vw,32px)',
            textAlign: 'center',
            fontSize: 14,
            marginTop: 100,
          }}
        >
          This property is no longer available.
          <a href="/properties" style={{ color: '#FA8300', fontWeight: 700, marginLeft: 8 }}>
            See what is currently on the market
          </a>
        </div>
      )}

      <section style={{ padding: `${withdrawn ? '40px' : '150px'} clamp(16px,4vw,32px) 0` }}>
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <a
            href="/properties"
            style={{ fontSize: 13, color: 'rgba(1,43,65,0.6)', textDecoration: 'none' }}
          >
            ← All properties
          </a>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px 48px',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                flex: '1 1 min(100%,520px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {tag && (
                <span
                  style={{
                    alignSelf: 'flex-start',
                    background: '#012B41',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: 999,
                  }}
                >
                  {tag}
                </span>
              )}
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Quinlee Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(34px,4.4vw,62px)',
                  lineHeight: 0.95,
                }}
              >
                {property.title as string}
              </h1>
              <p style={{ margin: 0, fontSize: 16, color: 'rgba(1,43,65,0.7)' }}>
                {property.displayAddress as string}
              </p>
              {meta && (
                <p style={{ margin: 0, fontSize: 14, color: 'rgba(1,43,65,0.6)' }}>{meta}</p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: '0 1 340px' }}>
              <div
                style={{
                  fontFamily: "'Quinlee Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(30px,3.4vw,44px)',
                  lineHeight: 1,
                }}
              >
                {formatPrice({
                  priceLabel: property.priceLabel as string,
                  price: property.price as number,
                  listingType: property.listingType as string,
                  rentFrequency: property.rentFrequency as string,
                })}
              </div>
              {!withdrawn && (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href="/contact-us"
                    style={{
                      background: '#FA8300',
                      color: '#012B41',
                      fontWeight: 700,
                      fontSize: 14,
                      padding: '14px 24px',
                      borderRadius: 999,
                      textDecoration: 'none',
                    }}
                  >
                    Book a viewing
                  </a>
                  <a
                    href="tel:03333444035"
                    style={{
                      border: '1px solid rgba(1,43,65,0.2)',
                      color: '#012B41',
                      fontWeight: 600,
                      fontSize: 14,
                      padding: '13px 22px',
                      borderRadius: 999,
                      textDecoration: 'none',
                    }}
                  >
                    Call 0333 3444 035
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section style={{ padding: '32px clamp(16px,4vw,32px) 0' }}>
          <div
            style={{
              maxWidth: 1320,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))',
              gap: 16,
            }}
          >
            {images.slice(0, 6).map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt={image.caption ?? `${property.displayAddress as string}, photograph ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: '100%',
                  borderRadius: 18,
                  objectFit: 'cover',
                  aspectRatio: i === 0 ? '16/10' : '4/3',
                  gridColumn: i === 0 ? '1/-1' : undefined,
                }}
              />
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,32px)' }}>
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,320px)',
            gap: '40px 64px',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0 }}>
            {property.editorialNote && (
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: '#012B41',
                  borderLeft: '3px solid #FA8300',
                  paddingLeft: 20,
                }}
              >
                {property.editorialNote as string}
              </p>
            )}
            {property.summary && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Quinlee Sans',sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(26px,2.8vw,36px)',
                    lineHeight: 1,
                  }}
                >
                  About this property
                </h2>
                {String(property.summary)
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: 'rgba(1,43,65,0.82)',
                        maxWidth: 760,
                      }}
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )}
            {features.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Quinlee Sans',sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(26px,2.8vw,36px)',
                    lineHeight: 1,
                  }}
                >
                  Key features
                </h2>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
                    gap: 12,
                  }}
                >
                  {features.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        fontSize: 15,
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#FA8300',
                          marginTop: 8,
                          flex: '0 0 auto',
                          display: 'inline-block',
                        }}
                      />
                      {f.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              border: '1px solid rgba(1,43,65,0.06)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'rgba(1,43,65,0.5)',
              }}
            >
              Details
            </div>
            {(
              [
                ['Type', property.propertyType],
                ['Bedrooms', property.beds],
                ['Bathrooms', property.baths],
                ['Receptions', property.receptions],
                ['Postcode', property.postcode],
              ] as [string, unknown][]
            )
              .filter(([, v]) => v !== null && v !== undefined && v !== '')
              .map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 16,
                    fontSize: 14,
                    paddingBottom: 10,
                    borderBottom: '1px solid rgba(1,43,65,0.08)',
                  }}
                >
                  <span style={{ color: 'rgba(1,43,65,0.6)' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{String(value)}</span>
                </div>
              ))}
            {floorplans.length > 0 && (
              <a
                href={floorplans[0].url}
                target="_blank"
                rel="noopener"
                style={{ fontSize: 14, fontWeight: 600, color: '#FA8300' }}
              >
                View floorplan
              </a>
            )}
            {property.epcUrl && (
              <a
                href={property.epcUrl as string}
                target="_blank"
                rel="noopener"
                style={{ fontSize: 14, fontWeight: 600, color: '#FA8300' }}
              >
                View EPC
              </a>
            )}
            {property.virtualTourUrl && (
              <a
                href={property.virtualTourUrl as string}
                target="_blank"
                rel="noopener"
                style={{ fontSize: 14, fontWeight: 600, color: '#FA8300' }}
              >
                Virtual tour
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
