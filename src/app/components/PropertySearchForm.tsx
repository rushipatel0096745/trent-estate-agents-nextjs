'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import '../(frontend)/HomePage.css'

const PRICE_BANDS = [
  { label: 'Any price', min: 0, max: 0 },
  { label: 'Up to £200,000', min: 0, max: 200000 },
  { label: '£200,000 – £350,000', min: 200000, max: 350000 },
  { label: '£350,000 – £500,000', min: 350000, max: 500000 },
  { label: '£500,000+', min: 500000, max: 0 },
]

const BED_OPTIONS = [
  { label: 'Any beds', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
]

export default function PropertySearchForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    formData.forEach((value, key) => {
      if (value) {
        params.set(key, value.toString())
      }
    })

    startTransition(() => {
      router.push(`/properties?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="home-page-style-16">
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

      <button type="submit" disabled={isPending} className="home-page-style-20">
        {isPending ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
