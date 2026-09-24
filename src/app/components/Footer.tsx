import Image from 'next/image'
import Link from 'next/link'

type NavLink = [title: string, href: string]
type Column = [heading: string, links: NavLink[]]

const cols: Column[] = [
  [
    'Selling',
    [
      ['Sell your home', '/sell-your-home'],
      ['Commercial & mixed use', '/sell-a-commercial-or-mixed-use-property'],
      ['Selling at auction', '/selling-at-auction'],
      ['Sell a business', '/sell-a-business'],
      ['The Complete Move', '/the-complete-move'],
      ['Free valuation', '/free-valuation'],
    ],
  ],
  [
    'Letting',
    [
      ['Let your property', '/let-your-property'],
      ['Let Only', '/let-only'],
      ['Rent Collection', '/rent-collection'],
      ['Fully Managed', '/fully-managed'],
      ['Overseas landlord management', '/overseas-landlord-management'],
      ['Commercial letting', '/commercial-letting'],
      ['Landlord services & fees', '/landlord-services-and-fees'],
      ['Renting with us', '/renting-with-us'],
    ],
  ],
  [
    'Sourcing',
    [
      ['Property sourcing', '/property-sourcing'],
      ['Buying from overseas', '/buying-from-overseas'],
      ['Conveyancing', '/conveyancing'],
      ['Mortgage services', '/mortgage-services'],
      ['Register with us', '/register-with-us'],
    ],
  ],
  [
    'About',
    [
      ['About Trent Estate Agents', '/about-trent-estate-agents'],
      ['Our team', '/our-team'],
      ['Reviews', '/reviews'],
      ['Fees, redress & regulation', '/fees-redress-and-regulation'],
      ['Careers', '/careers'],
      ['Areas we cover', '/areas-we-cover'],
      ['Contact us', '/contact-us'],
    ],
  ],
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        marginTop: '-28px',
        background: '#fff',
        borderRadius: '28px 28px 0 0',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: 'clamp(40px,6vw,64px) clamp(16px,4vw,32px) 0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
            gap: '40px',
            paddingBottom: '44px',
            borderBottom: '1px solid rgba(1,43,65,0.12)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '380px' }}>
            <Link href="/">
              <Image
                src="/assets/logo-horizontal.png"
                alt="Trent Estate Agents"
                width={200}
                height={40}
                style={{ height: '40px', width: 'auto', display: 'block' }}
              />
            </Link>
            <p
              style={{ margin: 0, fontSize: '14px', lineHeight: 1.65, color: 'rgba(1,43,65,0.64)' }}
            >
              A Nottingham estate agency founded by the people behind Trent Law Solicitors. We sell,
              let, manage and source property across Nottingham, Nottinghamshire and the Erewash
              borough, from The Triangle, NG2 Business Park.
            </p>
            <Link
              href="tel:03333444035"
              style={{ fontFamily: "'Quinlee Sans',sans-serif", fontSize: '26px', lineHeight: 1 }}
            >
              0333 3444 035
            </Link>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))',
              gap: '28px 20px',
            }}
          >
            {cols.map(([h, links]) => (
              <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(1,43,65,0.5)',
                  }}
                >
                  {h}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {links.map(([t, href]) => (
                    <Link key={href} href={href} style={{ fontSize: '14px', lineHeight: 1.3, color: "blue" }}>
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: '22px 0 32px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            fontSize: '12px',
            lineHeight: 1.6,
            color: 'rgba(1,43,65,0.64)',
          }}
        >
          <p style={{ margin: 0, maxWidth: '720px' }}>
            Members of The Property Ombudsman (membership T10145). Client money protection through
            UKALA. Registered with HMRC for anti-money laundering supervision. Trent Law Solicitors
            is regulated by the Solicitors Regulation Authority and Trent Finance operates under the
            Financial Conduct Authority through its principal; each is a separate business.
          </p>
          <div>© {new Date().getFullYear()} Trent Estate Agents</div>
        </div>
      </div>
    </footer>
  )
}
