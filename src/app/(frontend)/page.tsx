import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import './HomePage.css'
import { getProperties } from '@/lib/property'
import Link from 'next/link'
import { BED_OPTIONS, PRICE_BANDS } from '@/types/property'
import PropertyCardComponent from '../components/PropertyCard'
import PropertySearchForm from '../components/PropertySearchForm'

type SearchParams = Promise<{
  listingType?: string
  minBeds?: string
  minPrice?: string
  maxPrice?: string
  status?: string
  from?: string
  to?: string
}>

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const Q = "font-family:'Quinlee Sans',sans-serif;font-weight:400;"

  const SERVICES = [
    {
      title: 'Sell your home',
      desc: '0.8% of the sale price, £1,800 minimum, payable on completion.',
      href: '/sell-your-home',
    },
    {
      title: 'Let your property',
      desc: 'Four levels of service, from tenant find to full management.',
      href: '/let-your-property',
    },
    {
      title: 'Commercial and mixed use',
      desc: 'Shops, offices and tenanted investments, from 1.5%.',
      href: '/sell-a-commercial-or-mixed-use-property',
    },
    {
      title: 'Selling at auction',
      desc: 'Traditional and conditional methods, at the same 0.8%.',
      href: '/selling-at-auction',
    },
    {
      title: 'Property sourcing',
      desc: 'We find and negotiate on stock that never reaches the portals.',
      href: '/property-sourcing',
    },
    {
      title: 'Overseas landlords',
      desc: 'The property, the tax filings and the licence all stay in order here.',
      href: '/overseas-landlord-management',
    },
    {
      title: 'Conveyancing',
      desc: 'Through Trent Law Solicitors, in the same building.',
      href: '/conveyancing',
    },
    {
      title: 'Mortgage services',
      desc: 'Through Trent Finance, who already know your position.',
      href: '/mortgage-services',
    },
    {
      title: 'Sell a business',
      desc: 'Confidential sale of a going concern, with the premises.',
      href: '/sell-a-business',
    },
  ]

  const TIERS = [
    { name: 'Let only', fee: 'setup only' },
    { name: 'Rent collection', fee: '8%' },
    { name: 'Fully managed', fee: '10%' },
    { name: 'Overseas landlord', fee: '12%' },
  ]

  const params = await searchParams

  const properties = await getProperties({
    listingType: (params.listingType as any) ?? 'any',
    minBeds: Number(params.minBeds ?? 0),
    minPrice: Number(params.minPrice ?? 0),
    maxPrice: Number(params.maxPrice ?? 0),
    statuses: params.status ? [params.status] : undefined,
    from: Number(params.from ?? 0),
    to: Number(params.to ?? 6),
  })

  // console.log('properties', properties[0])

  return (
    <div>
      <section className="home-page-style-01">
        <div className="home-page-style-02"></div>
        <div className="home-page-style-03"></div>
        <div className="home-page-style-04">
          <div className="home-page-style-05">
            <span className="home-page-style-06"></span>
            <span className="home-page-style-07">Nottingham · Nottinghamshire · Erewash</span>
          </div>

          <div className="home-page-style-08">
            <h1 className="home-page-style-09">Property, handled with a solicitor's precision.</h1>
            <div className="home-page-style-10">
              <p className="home-page-style-11">
                We sell, let and manage property across Nottingham, Nottinghamshire and the Erewash
                borough, from one address shared with our own solicitors and our own mortgage
                broker.
              </p>
              <div className="home-page-style-12">
                <Link href="/properties" className="home-page-style-13">
                  Explore properties
                </Link>

                <Link href="/free-valuation" className="home-page-style-14">
                  Book a free valuation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-style-15">
        {/* <form method="get" action="/properties" className="home-page-style-16">
          <select name="tab" className="home-page-style-17">
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
          <select name="price" className="home-page-style-18">
            {PRICE_BANDS.map((b, i) => (
              <option key={i} value={i}>
                {b.label}
              </option>
            ))}
          </select>
          <select name="beds" className="home-page-style-19">
            {BED_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <button type="submit" className="home-page-style-20">
            Search
          </button>
        </form> */}
        <PropertySearchForm />
      </section>

      <section className="home-page-style-21">
        <div className="home-page-style-22">
          <div className="home-page-style-23">
            <div className="home-page-style-24">
              <span className="home-page-style-25"></span>
              <span className="home-page-style-26">One group, one address</span>
            </div>
            <h2 className="home-page-style-27">
              An estate agency, a law firm and a mortgage broker, in the same building.
            </h2>
            <p className="home-page-style-28">The Triangle, NG2 Business Park, Nottingham</p>
          </div>
          <div className="home-page-style-29">
            <p className="home-page-style-30">
              It is very rare to find an estate agency, a law firm and a mortgage broker working
              from the same building, and the difference is practical rather than decorative: your
              sale is progressed by an agent who can walk the file to the conveyancer, your mortgage
              is arranged by people who already know your position, and nobody passes you around a
              call centre.
            </p>
            <p className="home-page-style-31">
              Each firm is separately regulated and we are open about the connections. We disclose
              them to every client, no referral fee passes between the companies, and our clients
              enjoy preferential terms at both.
            </p>
            <Link href="/about-trent-estate-agents" className="home-page-style-32">
              About Trent Estate Agents →
            </Link>
          </div>
        </div>
      </section>

      <section className="home-page-style-33">
        <div className="home-page-style-34">
          <div className="home-page-style-35">
            <h2 className="home-page-style-36">Nine services, one standard.</h2>
            <p className="home-page-style-37">
              Each page tells you exactly how the service runs and what it costs, in writing, before
              you commit to anything.
            </p>
          </div>
          <div className="home-page-style-38">
            {SERVICES.map((s, i) => (
              <Link key={i} href={s.href} className="home-page-style-39">
                <div className="home-page-style-40">{String(i + 1).padStart(2, '0')}</div>
                <div className="home-page-style-41">{s.title}</div>
                <p className="home-page-style-42">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {properties.length > 0 && (
        <section className="home-page-style-43">
          <div className="home-page-style-44">
            <div className="home-page-style-45">
              <h2 className="home-page-style-46">Current sales and lettings stock</h2>
              <p className="home-page-style-47">
                Updated as it lists. Some of what we sell never reaches the portals, so register
                with us to hear about property bank stock first.
              </p>
            </div>
            <div className="home-page-style-48">
              {properties.map((p) => (
                <PropertyCardComponent key={p.id} property={p} />
              ))}
            </div>
            <div className="home-page-style-49">
              <Link href="/properties" className="home-page-style-50">
                View all properties
              </Link>
              <Link href="/register-with-us" className="home-page-style-51">
                Register with us
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="home-page-style-52">
        <div className="home-page-style-53">
          <div className="home-page-style-54">
            <div className="home-page-style-55">
              <span className="home-page-style-56"></span>
              <span className="home-page-style-57">For landlords</span>
            </div>
            <h2 className="home-page-style-58">
              Four levels of service, and an agent who knows the law.
            </h2>
            <p className="home-page-style-59">
              We let and manage at four levels of service, from tenant find alone to full
              management, so you carry exactly as much or as little of the work as you choose.
            </p>
            <div className="home-page-style-60">
              <Link href="/let-your-property" className="home-page-style-61">
                Let your property
              </Link>
              <Link href="/landlord-services-and-fees" className="home-page-style-62">
                Compare the four services
              </Link>
            </div>
          </div>
          <div className="home-page-style-63">
            {TIERS.map((t) => (
              <div key={t.name} className="home-page-style-64">
                <span className="home-page-style-65">{t.name}</span>
                <span className="home-page-style-66">{t.fee}</span>
              </div>
            ))}
            <p className="home-page-style-67">
              Landlords living overseas, whether in Dubai, Lagos, Toronto or Kuala Lumpur: the
              property, the tax filings and the licence all stay in order here.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
