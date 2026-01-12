import { CollectionConfig } from 'payload'

export const Document: CollectionConfig = {
  slug: 'documents',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'text',
      required: true,
    },
  ],
}
