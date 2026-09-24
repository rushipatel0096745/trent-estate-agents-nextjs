import { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    {
      name: 'firm',
      type: 'select',
      options: ['Trent Estate Agents', 'Trent Law Solicitors', 'Trent Finance'],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'order', type: 'number' },
  ],
}
