import Image from 'next/image'
import Link from 'next/link'

export interface PropertyImage {
  asset?: {
    _ref?: string
  }
  url?: string
  alt?: string
}

export interface Property {
  title: string
  listingType?: string
  priceLabel?: string
  area?: string
  beds?: number
  baths?: number
  propertyType?: string
  description?: string
  images?: PropertyImage[]
  features?: string[]
  address?: string
  reference?: string
}

interface Props {
  property: Property
}

export default function PropertyDetail({ property }: Props) {
  const images = property.images ?? []
  const primaryImage = images[0]?.url

  return (
    <main
      style={{
        maxWidth: '1320px',
        width: '100%',
        margin: '0 auto',
        padding: '120px clamp(16px,4vw,32px) 80px',
        color: '#012B41',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '28px',
          fontSize: '13px',
          color: 'rgba(1,43,65,.55)',
        }}
      >
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" style={{ color: 'inherit', textDecoration: 'none' }}>
          Properties
        </Link>
        <span>/</span>
        <span style={{ color: '#012B41' }}>{property.title}</span>
      </div>

      {/* Property Header */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '32px',
          marginBottom: '36px',
        }}
      >
        <div style={{ maxWidth: '850px' }}>
          {property.listingType && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#012B41',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                padding: '7px 11px',
                borderRadius: '999px',
                marginBottom: '18px',
              }}
            >
              {property.listingType}
            </span>
          )}

          <h1
            style={{
              margin: 0,
              fontFamily: "'Quinlee Sans', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(42px,5vw,72px)',
              lineHeight: 0.95,
              letterSpacing: '-.025em',
            }}
          >
            {property.title}
          </h1>

          {property.area && (
            <div
              style={{
                marginTop: '16px',
                fontSize: '15px',
                color: 'rgba(1,43,65,.62)',
              }}
            >
              {property.area}
            </div>
          )}
        </div>

        {property.priceLabel && (
          <div
            style={{
              flexShrink: 0,
              fontFamily: "'Quinlee Sans', sans-serif",
              fontSize: 'clamp(28px,3vw,42px)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {property.priceLabel}
          </div>
        )}
      </section>

      {/* Gallery */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '12px',
          marginBottom: '52px',
        }}
      >
        {/* Main Image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/10',
            overflow: 'hidden',
            borderRadius: '20px',
            background: 'repeating-linear-gradient(135deg, #D0CEBA 0 8px, #E3E1D2 8px 16px)',
          }}
        >
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={images[0]?.alt || property.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 66vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(1,43,65,.55)',
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: '11px',
              }}
            >
              property photo
            </div>
          )}

          <button
            type="button"
            aria-label="Add property to favourites"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: 0,
              background: 'rgba(255,255,255,.9)',
              color: '#012B41',
              cursor: 'pointer',
              fontSize: '20px',
              boxShadow: '0 8px 24px rgba(1,43,65,.15)',
              zIndex: 2,
            }}
          >
            ♡
          </button>
        </div>

        {/* Secondary Images */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            gap: '12px',
          }}
        >
          {images.slice(1, 3).map((image, index) => (
            <div
              key={image.url || index}
              style={{
                position: 'relative',
                minHeight: 0,
                overflow: 'hidden',
                borderRadius: '20px',
                background: 'repeating-linear-gradient(135deg, #D0CEBA 0 8px, #E3E1D2 8px 16px)',
              }}
            >
              {image.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || `${property.title} ${index + 2}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(1,43,65,.55)',
                    fontSize: '11px',
                  }}
                >
                  property photo
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Content + Enquiry */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) 360px',
          gap: '70px',
          alignItems: 'start',
        }}
      >
        {/* Main Content */}
        <div>
          {/* Property Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              borderTop: '1px solid rgba(1,43,65,.12)',
              borderBottom: '1px solid rgba(1,43,65,.12)',
              marginBottom: '48px',
            }}
          >
            <div style={{ padding: '20px 10px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(1,43,65,.55)', marginBottom: '7px' }}>
                Bedrooms
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{property.beds ?? '—'}</div>
            </div>

            <div style={{ padding: '20px 10px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(1,43,65,.55)', marginBottom: '7px' }}>
                Bathrooms
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{property.baths ?? '—'}</div>
            </div>

            <div style={{ padding: '20px 10px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(1,43,65,.55)', marginBottom: '7px' }}>
                Property type
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>
                {property.propertyType ?? '—'}
              </div>
            </div>

            <div style={{ padding: '20px 10px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(1,43,65,.55)', marginBottom: '7px' }}>
                Reference
              </div>
              <div style={{ fontSize: '18px', fontWeight: 600 }}>{property.reference ?? '—'}</div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <section style={{ marginBottom: '52px' }}>
              <h2
                style={{
                  margin: '0 0 20px',
                  fontFamily: "'Quinlee Sans', sans-serif",
                  fontSize: '36px',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                About this property
              </h2>

              <div
                style={{
                  fontSize: '16px',
                  lineHeight: 1.8,
                  color: 'rgba(1,43,65,.72)',
                  maxWidth: '760px',
                  whiteSpace: 'pre-line',
                }}
              >
                {property.description}
              </div>
            </section>
          )}

          {/* Features */}
          {!!property.features?.length && (
            <section style={{ marginBottom: '52px' }}>
              <h2
                style={{
                  margin: '0 0 22px',
                  fontFamily: "'Quinlee Sans', sans-serif",
                  fontSize: '36px',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                Key features
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                  gap: '12px 40px',
                }}
              >
                {property.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(1,43,65,.08)',
                      fontSize: '14px',
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#012B41',
                        flexShrink: 0,
                      }}
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Address */}
          {property.address && (
            <section>
              <h2
                style={{
                  margin: '0 0 20px',
                  fontFamily: "'Quinlee Sans', sans-serif",
                  fontSize: '36px',
                  fontWeight: 400,
                }}
              >
                Location
              </h2>

              <div
                style={{
                  padding: '22px',
                  border: '1px solid rgba(1,43,65,.1)',
                  borderRadius: '16px',
                  fontSize: '15px',
                  color: 'rgba(1,43,65,.7)',
                }}
              >
                {property.address}
              </div>
            </section>
          )}
        </div>

        {/* Enquiry Card */}
        <aside
          style={{
            position: 'sticky',
            top: '30px',
            background: '#012B41',
            color: '#fff',
            borderRadius: '20px',
            padding: '30px',
          }}
        >
          <div
            style={{
              fontFamily: "'Quinlee Sans', sans-serif",
              fontSize: '34px',
              lineHeight: 1,
              fontWeight: 400,
              marginBottom: '14px',
            }}
          >
            Interested?
          </div>

          <p
            style={{
              margin: '0 0 26px',
              color: 'rgba(255,255,255,.7)',
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            Arrange a viewing or speak to one of our property experts about this property.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              href="/contact"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50px',
                background: '#fff',
                color: '#012B41',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Arrange a viewing
            </Link>

            <a
              href="tel:+440000000000"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50px',
                border: '1px solid rgba(255,255,255,.3)',
                color: '#fff',
                borderRadius: '999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Call our office
            </a>
          </div>

          {property.reference && (
            <div
              style={{
                marginTop: '26px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255,255,255,.15)',
                fontSize: '12px',
                color: 'rgba(255,255,255,.5)',
              }}
            >
              Property reference: {property.reference}
            </div>
          )}
        </aside>
      </section>

      {/* Media Queries */}
      <style jsx>{`
        @media (max-width: 900px) {
          main {
            padding-top: 100px !important;
          }
          main > section:nth-of-type(1) {
            flex-direction: column;
          }
          main > section:nth-of-type(2) {
            grid-template-columns: 1fr !important;
          }
          main > section:nth-of-type(3) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          main > section:nth-of-type(3) aside {
            position: static !important;
          }
        }

        @media (max-width: 600px) {
          main > section:nth-of-type(2) {
            display: block !important;
          }
          main > section:nth-of-type(2) > div:first-child {
            margin-bottom: 12px;
          }
          main > section:nth-of-type(2) > div:last-child {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            height: 240px;
          }
          main > section:nth-of-type(3) > div > div:first-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          main > section:nth-of-type(3) > div > div:first-child > div {
            padding: 16px 8px !important;
          }
        }
      `}</style>
    </main>
  )
}
