import { revalidateCart } from '../hooks/revalidateCart'
import { CollectionConfig } from 'payload'

export const Cart: CollectionConfig = {
  slug: 'cart',
  labels: {
    singular: 'Cart',
    plural: 'Carts',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateCart],
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
      label: 'Cart Items',
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
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'total',
          type: 'number',
          hooks: {
            beforeChange: [
              ({ siblingData }) => siblingData?.quantity * siblingData?.price,
            ],
          },
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      hooks: {
        beforeChange: [
          ({ data }) =>
            data?.items?.reduce(
              (sum: number, item: { price: number; quantity: number }) =>
                sum + item?.price * item?.quantity,
              0,
            ),
        ],
      },
      admin: {
        readOnly: true,
      },
    },
  ],
}
