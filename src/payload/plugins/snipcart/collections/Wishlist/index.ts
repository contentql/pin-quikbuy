import { revalidateWishlist } from '../hooks/revalidateWishlist'
import { CollectionConfig } from 'payload'

export const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  labels: {
    singular: 'Wishlist',
    plural: 'Wishlists',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateWishlist],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Wishlist Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'addedAt',
          type: 'date',
          defaultValue: () => new Date().toISOString(),
        },
      ],
    },
  ],
}
