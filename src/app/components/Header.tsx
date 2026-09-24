import Image from 'next/image'
import Link from 'next/link'
import { CSSProperties } from 'react'

type NavLink = [label: string, href: string]

const links: NavLink[] = [
  ['Properties', '/properties'],
  ['Selling', '/selling'],
  ['Letting', '/letting'],
  ['Sourcing', '/sourcing'],
  ['Conveyancing', '/conveyancing'],
  ['Mortgage', '/mortgage-services'],
  ['About', '/about-us'],
  ['Contact', '/contact-us'],
]

const linkStyle: CSSProperties = {
  padding: '9px 14px',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '999px',
  color: '#012B41',
  whiteSpace: 'nowrap',
}

export default function Header() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: 'clamp(12px,2vw,24px) clamp(12px,2vw,16px) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          background: 'rgba(237,237,229,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(1,43,65,0.08)',
          borderRadius: '999px',
          padding: '8px 10px 8px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
          <Image
            src="/assets/logo-horizontal.png"
            alt="Trent Estate Agents"
            width={160}
            height={36}
            style={{ height: 'clamp(28px,3vw,36px)', width: 'auto', display: 'block' }}
            priority
          />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap' }}>
          {links.map(([label, href]) => (
            <Link key={href} href={href} style={linkStyle}>
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            href="tel:03333444035"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              padding: '9px 12px',
              color: '#012B41',
              whiteSpace: 'nowrap',
            }}
          >
            0333 3444 035
          </Link>
          <Link
            href="/free-valuation"
            style={{
              background: '#012B41',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '11px 20px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
            }}
          >
            Free valuation
          </Link>
        </div>
      </div>
    </div>
  )
}
