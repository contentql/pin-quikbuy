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
  access: {
    read: ({ req }) => {
      const { user } = req

      if (user) {
        if (user.role.includes('admin')) return true

        return {
          user: {
            equals: user?.id,
          },
        }
      }

      return false
    },
    create: ({ req }) => {
      const { user } = req

      if (user) {
        return {
          user: {
            equals: user?.id,
          },
        }
      }

      return false
    },
    update: ({ req }) => {
      const { user } = req

      if (user) {
        return {
          user: {
            equals: user?.id,
          },
        }
      }

      return false
    },
    delete: ({ req }) => {
      const { user } = req

      if (user) {
        return {
          user: {
            equals: user?.id,
          },
        }
      }

      return false
    },
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
