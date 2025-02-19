import {
  revalidateCartAfterChange,
  revalidateCartAfterDelete,
} from '../../hooks/revalidateCart'
import { CollectionConfig } from 'payload'

import { deleteOldCarts } from './hooks/deleteOldCart'

export const Cart: CollectionConfig = {
  slug: 'cart',
  labels: {
    singular: 'Cart',
    plural: 'Carts',
  },
  versions: {
    drafts: true,
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
  hooks: {
    afterChange: [revalidateCartAfterChange],
    afterDelete: [revalidateCartAfterDelete],
    beforeChange: [deleteOldCarts],
  },
  admin: {
    description:
      'Manage the shopping carts of users, including their selected items and total price.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'User Information',
          fields: [
            {
              name: 'user',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              label: 'User',
              admin: {
                description: 'The user associated with this cart.',
              },
              // filterOptions: ({ user, relationTo }) => {
              //   if (relationTo === 'users') {
              //     return {
              //       id: {
              //         equals: user?.id,
              //       },
              //     }
              //   }

              //   return false
              // },
            },
          ],
        },
        {
          label: 'Cart Items',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Cart Items',
              admin: {
                description: 'List of items added to the cart.',
              },
              fields: [
                {
                  name: 'snipcartId',
                  type: 'text',
                  label: 'Snipcart ID',
                  required: true,
                  admin: {
                    description:
                      'The unique identifier associated with this item in Snipcart.',
                    placeholder: 'Enter Snipcart unique ID',
                    readOnly: true,
                  },
                },
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  required: true,
                  label: 'Product',
                  admin: {
                    description: 'The product added to the cart.',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  required: true,
                  label: 'Quantity',
                  admin: {
                    description: 'Number of units of the product.',
                    placeholder: 'Enter quantity (e.g., 1)',
                  },
                  min: 1,
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Price',
                  admin: {
                    description: 'Price per unit of the product.',
                    placeholder: 'Enter price per unit',
                  },
                },
                {
                  name: 'total',
                  type: 'number',
                  admin: {
                    readOnly: true,
                    description:
                      'Total cost for this item (calculated automatically).',
                  },
                  hooks: {
                    beforeChange: [
                      ({ siblingData }) =>
                        siblingData?.quantity * siblingData?.price,
                    ],
                  },
                },
              ],
            },
            {
              name: 'totalPrice',
              type: 'number',
              label: 'Total Price',
              admin: {
                readOnly: true,
                description:
                  'Total cost of all items in the cart (calculated automatically).',
              },
              hooks: {
                beforeChange: [
                  ({ data }) =>
                    data?.items?.reduce(
                      (
                        sum: number,
                        item: { price: number; quantity: number },
                      ) => sum + item?.price * item?.quantity,
                      0,
                    ),
                ],
              },
            },
          ],
        },
        {
          label: 'Snipcart Details',
          fields: [
            {
              name: 'snipcartId',
              type: 'text',
              label: 'Snipcart ID',
              required: true,
              admin: {
                description:
                  'The unique identifier associated with this cart in Snipcart.',
                placeholder: 'Enter Snipcart unique ID',
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ],
}
