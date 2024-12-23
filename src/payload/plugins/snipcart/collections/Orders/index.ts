import { revalidateOrders } from '../hooks/revalidateOrders'
import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateOrders],
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
      label: 'Order Items',
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
          admin: {
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => siblingData?.quantity * siblingData?.price,
            ],
          },
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) =>
            data?.items?.reduce(
              (sum: number, item: { quantity: number; price: number }) =>
                sum + item?.quantity * item?.price,
              0,
            ),
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      defaultValue: 'Pending',
    },
    {
      name: 'placedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'paymentMethod',
      type: 'text',
      label: 'Payment Method',
      required: true,
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      fields: [
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
        },
        {
          name: 'addressLine2',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'zipCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
