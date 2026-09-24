import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';
import {
  formatPrice,
  statusTag,
  metaLine,
  firstImage,
  type PropertyCard,
} from '../../types/property';

interface Props {
  property: PropertyCard;
}

const quinleeSansStyle: CSSProperties = {
  fontFamily: "'Quinlee Sans', sans-serif",
  fontWeight: 400,
};

export default function PropertyCardComponent({ property }: Props) {
  const image = firstImage(property);
  const tag = statusTag(property.status);
  const meta = metaLine(property);

  return (
    <Link
      href={`/properties/${property.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid rgba(1,43,65,0.06)',
        height: '100%',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#D0CEBA' }}>
        {image ? (
          <Image
            src={image}
            alt={property.displayAddress || property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              color: 'rgba(1,43,65,0.45)',
              fontSize: '12px',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
            }}
          >
            Photograph to follow
          </div>
        )}
        {tag && (
          <span
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: '#012B41',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: '999px',
              zIndex: 1,
            }}
          >
            {tag}
          </span>
        )}
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ ...quinleeSansStyle, fontSize: '24px', lineHeight: 1, color: '#012B41' }}>
          {formatPrice(property)}
        </div>
        <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.35 }}>
          {property.title}
        </div>
        {property.area && (
          <div style={{ fontSize: '14px', color: 'rgba(1,43,65,0.65)' }}>
            {property.area}
          </div>
        )}
        {meta && (
          <div style={{ marginTop: 'auto', paddingTop: '14px', fontSize: '13px', color: 'rgba(1,43,65,0.65)' }}>
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}