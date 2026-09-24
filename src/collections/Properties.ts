import { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: { useAsTitle: 'title' },
  //groups: ['Apex27', 'Editorial'], // optional visual grouping
  fields: [
    // --- Apex27 fields ---
    { name: 'apex27Id', type: 'text', admin: { readOnly: true } },
    { name: 'slug', type: 'text', unique: true, admin: { readOnly: true } },
    { name: 'title', type: 'text', admin: { readOnly: true } },
    { name: 'displayAddress', type: 'text', admin: { readOnly: true } },
    { name: 'addressLine1', type: 'text', admin: { readOnly: true } },
    { name: 'addressLine2', type: 'text', admin: { readOnly: true } },
    { name: 'area', type: 'text', admin: { readOnly: true } },
    { name: 'town', type: 'text', admin: { readOnly: true } },
    { name: 'county', type: 'text', admin: { readOnly: true } },
    { name: 'postcode', type: 'text', admin: { readOnly: true } },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'listingType',
      type: 'select',
      options: ['sale', 'rent', 'commercial', 'unknown'],
      admin: { readOnly: true },
    },
    { name: 'propertyType', type: 'text', admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      options: ['available', 'under-offer', 'sold', 'let-agreed', 'let', 'withdrawn', 'unknown'],
      admin: { readOnly: true },
    },
    { name: 'price', type: 'number', admin: { readOnly: true } },
    { name: 'priceLabel', type: 'text', admin: { readOnly: true } },
    { name: 'rentFrequency', type: 'text', admin: { readOnly: true } },
    { name: 'beds', type: 'number', admin: { readOnly: true } },
    { name: 'baths', type: 'number', admin: { readOnly: true } },
    { name: 'receptions', type: 'number', admin: { readOnly: true } },
    { name: 'summary', type: 'textarea', admin: { readOnly: true } },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
      admin: { readOnly: true },
    },
    {
      name: 'imageUrls',
      type: 'array',
      fields: [
        { name: 'url', type: 'text' },
        { name: 'caption', type: 'text' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'floorplanUrls',
      type: 'array',
      fields: [{ name: 'url', type: 'text' }],
      admin: { readOnly: true },
    },
    { name: 'virtualTourUrl', type: 'text', admin: { readOnly: true } },
    { name: 'epcUrl', type: 'text', admin: { readOnly: true } },
    { name: 'publicListing', type: 'checkbox', defaultValue: true, admin: { readOnly: true } },
    { name: 'agentName', type: 'text', admin: { readOnly: true } },
    { name: 'agentPhone', type: 'text', admin: { readOnly: true } },
    { name: 'branchId', type: 'text', admin: { readOnly: true } },
    { name: 'sourceHash', type: 'text', admin: { readOnly: true, hidden: true } },
    { name: 'syncedAt', type: 'date', admin: { readOnly: true } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { readOnly: true } },

    // --- Editorial fields ---
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'editorialNote', type: 'textarea' },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
