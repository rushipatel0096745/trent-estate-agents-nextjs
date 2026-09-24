import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'firstName' },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'firstName', type: 'text' },
    { name: 'area', type: 'text' },
    { name: 'month', type: 'text' },
    {
      name: 'service',
      type: 'select',
      options: ['Sale', 'Letting', 'Fully Managed', 'Conveyancing', 'Sourcing', 'Auction'],
    },
    { name: 'attributionConfirmed', type: 'checkbox', defaultValue: false },
  ],
}
