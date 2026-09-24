import { CollectionConfig } from 'payload'

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    {
      name: 'category',
      type: 'select',
      options: ['Selling', 'Letting', 'Buying'],
    },
    { name: 'publishedAt', type: 'date' },
    { name: 'standfirst', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText' },
  ],
}
