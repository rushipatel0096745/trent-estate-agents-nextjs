import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    {
      name: 'group',
      type: 'select',
      options: ['selling', 'letting', 'sourcing', 'properties', 'about'],
    },
    {
      name: 'intro',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea' }],
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'blocks',
          type: 'blocks',
          blocks: [
            {
              slug: 'para',
              fields: [{ name: 'text', type: 'textarea' }],
            },
            {
              slug: 'subheading',
              fields: [{ name: 'text', type: 'text' }],
            },
            {
              slug: 'bullets',
              fields: [
                {
                  name: 'items',
                  type: 'array',
                  fields: [{ name: 'text', type: 'textarea' }],
                },
              ],
            },
            {
              slug: 'table',
              fields: [
                {
                  name: 'rows',
                  type: 'array',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      fields: [{ name: 'value', type: 'text' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'q', type: 'text' },
        { name: 'a', type: 'textarea' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'devNotes', type: 'textarea' },
  ],
}
