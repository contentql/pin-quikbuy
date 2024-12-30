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
    delete: () => false,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Customer Details',
          fields: [
            {
              name: 'user',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              label: 'User',
              admin: {
                description: 'Select the customer placing the order.',
              },
            },
          ],
        },
        {
          label: 'Order Items',
          fields: [
            {
              name: 'items',
              type: 'array',
              label: 'Order Items',
              required: true,
              minRows: 1,
              admin: {
                description:
                  'List of items included in this order. At least one item is required.',
              },
              fields: [
                {
                  name: 'uniqueId',
                  type: 'text',
                  label: 'Unique ID',
                  required: true,
                  admin: {
                    placeholder: 'Enter unique ID.',
                  },
                },
                {
                  name: 'id',
                  type: 'text',
                  label: 'Product ID',
                  required: true,
                  admin: {
                    placeholder: 'Enter product ID.',
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Product Name',
                  required: true,
                  admin: {
                    placeholder: 'Enter product name.',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Price',
                  admin: {
                    placeholder: 'Enter the price per unit.',
                  },
                },
                {
                  name: 'description',
                  type: 'text',
                  label: 'Description',
                  admin: {
                    placeholder: 'Enter product description.',
                  },
                },
                {
                  name: 'hasTaxesIncluded',
                  type: 'checkbox',
                  label: 'Taxes Included',
                  admin: {
                    description:
                      'Indicates if taxes are included in the price.',
                  },
                },
                {
                  name: 'taxes',
                  type: 'array',
                  label: 'Taxes',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Tax Name',
                      admin: {
                        placeholder: 'Enter tax name.',
                      },
                    },
                    {
                      name: 'rate',
                      type: 'number',
                      label: 'Tax Rate',
                      admin: {
                        placeholder: 'Enter tax rate in percentage.',
                      },
                    },
                    {
                      name: 'amount',
                      type: 'number',
                      label: 'Tax Amount',
                      admin: {
                        placeholder: 'Enter tax amount.',
                      },
                    },
                  ],
                },
                {
                  name: 'categories',
                  type: 'array',
                  label: 'Categories',
                  fields: [
                    {
                      name: 'category',
                      type: 'text',
                      label: 'Category',
                      admin: {
                        placeholder: 'e.g., Clothes, Shirt',
                      },
                    },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Product URL',
                  admin: {
                    placeholder: 'Enter product URL.',
                  },
                },
                {
                  name: 'quantity',
                  type: 'number',
                  required: true,
                  label: 'Quantity',
                  min: 1,
                  admin: {
                    placeholder: 'Enter the quantity.',
                  },
                },
                {
                  name: 'shippable',
                  type: 'checkbox',
                  label: 'Shippable',
                },
                {
                  name: 'taxable',
                  type: 'checkbox',
                  label: 'Taxable',
                },
                {
                  name: 'attributes',
                  type: 'array',
                  label: 'Attributes',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Attribute Name',
                      admin: {
                        placeholder: 'e.g., size, color',
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Attribute Value',
                      admin: {
                        placeholder: 'e.g., XXL, white',
                      },
                    },
                  ],
                },
                {
                  name: 'dimensions',
                  type: 'group',
                  label: 'Dimensions',
                  fields: [
                    {
                      name: 'width',
                      type: 'number',
                      label: 'Width',
                      admin: {
                        placeholder: 'Width in cm.',
                      },
                    },
                    {
                      name: 'height',
                      type: 'number',
                      label: 'Height',
                      admin: {
                        placeholder: 'Height in cm.',
                      },
                    },
                    {
                      name: 'length',
                      type: 'number',
                      label: 'Length',
                      admin: {
                        placeholder: 'Length in cm.',
                      },
                    },
                    {
                      name: 'weight',
                      type: 'number',
                      label: 'Weight',
                      admin: {
                        placeholder: 'Weight in kg.',
                      },
                    },
                  ],
                },
                {
                  name: 'unitPrice',
                  type: 'number',
                  label: 'Unit Price',
                  required: true,
                  admin: {
                    placeholder: 'Enter the unit price.',
                  },
                },
                {
                  name: 'totalPrice',
                  type: 'number',
                  label: 'Total Price',
                  required: true,
                  admin: {
                    readOnly: true,
                    description:
                      'Automatically calculated as quantity × unit price.',
                  },
                  hooks: {
                    beforeChange: [
                      ({ siblingData }) =>
                        siblingData?.quantity * siblingData?.unitPrice,
                    ],
                  },
                },
                {
                  name: 'totalPriceWithoutTaxes',
                  type: 'number',
                  label: 'Total Price Without Taxes',
                },
                {
                  name: 'totalPriceWithoutDiscountsAndTaxes',
                  type: 'number',
                  label: 'Total Without Discounts & Taxes',
                },
                {
                  name: 'totalPriceWithoutDiscountsAndTaxesLegacy',
                  type: 'number',
                  label: 'Legacy Total Without Discounts & Taxes',
                },
                {
                  name: 'addedOn',
                  type: 'date',
                  label: 'Added On',
                },
                {
                  name: 'modificationDate',
                  type: 'date',
                  label: 'Last Modified',
                },
                {
                  name: 'paymentGatewayId',
                  type: 'text',
                  label: 'Payment Gateway ID',
                  admin: {
                    placeholder: 'Enter payment gateway ID.',
                  },
                },
                {
                  name: 'state',
                  type: 'group',
                  label: 'State',
                  fields: [
                    {
                      name: 'committing',
                      type: 'checkbox',
                      label: 'Committing',
                    },
                  ],
                },
              ],
            },
            {
              name: 'totalCount',
              type: 'number',
              label: 'Total Item Count',
              admin: {
                readOnly: true,
                description: 'Total number of items in the order.',
              },
              hooks: {
                beforeChange: [
                  ({ data }) =>
                    data?.items?.reduce(
                      (sum: number, item: any) => sum + item.quantity,
                      0,
                    ),
                ],
              },
            },
            {
              name: 'totalPrice',
              type: 'number',
              label: 'Total Price',
              admin: {
                readOnly: true,
                description: 'The total price of all items in the order.',
              },
              hooks: {
                beforeChange: [
                  ({ data }) =>
                    data?.items?.reduce(
                      (sum: number, item: any) =>
                        sum + item.quantity * item.unitPrice,
                      0,
                    ),
                ],
              },
            },
          ],
        },
        {
          label: 'Billing & Shipping Information',
          fields: [
            {
              type: 'checkbox',
              name: 'shipToBillingAddress',
              label: 'Ship to Billing Address',
            },
            {
              type: 'tabs',
              tabs: [
                {
                  name: 'billingAddress',
                  label: 'Billing Address',
                  fields: [
                    {
                      name: 'fullName',
                      type: 'text',
                      label: 'Full Name',
                      required: true,
                    },
                    {
                      name: 'firstName',
                      type: 'text',
                      label: 'First Name',
                    },
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Name',
                      required: true,
                    },
                    {
                      name: 'company',
                      type: 'text',
                      label: 'Company',
                    },
                    {
                      name: 'address1',
                      type: 'text',
                      label: 'Address Line 1',
                      required: true,
                    },
                    {
                      name: 'address2',
                      type: 'text',
                      label: 'Address Line 2',
                    },
                    {
                      name: 'fullAddress',
                      type: 'text',
                      label: 'Full Address',
                      admin: {
                        readOnly: true,
                      },
                    },
                    {
                      name: 'city',
                      type: 'text',
                      label: 'City',
                      required: true,
                    },
                    {
                      name: 'country',
                      type: 'text',
                      label: 'Country',
                      required: true,
                    },
                    {
                      name: 'postalCode',
                      type: 'text',
                      label: 'Postal Code',
                      required: true,
                    },
                    {
                      name: 'province',
                      type: 'text',
                      label: 'Province',
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      label: 'Phone',
                    },
                    {
                      name: 'vatNumber',
                      type: 'text',
                      label: 'VAT Number',
                    },
                    {
                      name: 'hasMinimalRequiredInfo',
                      type: 'checkbox',
                      label: 'Has Minimal Required Info',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'shippingAddress',
                  label: 'Shipping Address',
                  fields: [
                    {
                      name: 'fullName',
                      type: 'text',
                      label: 'Full Name',
                      required: true,
                    },
                    {
                      name: 'firstName',
                      type: 'text',
                      label: 'First Name',
                    },
                    {
                      name: 'name',
                      type: 'text',
                      label: 'Name',
                      required: true,
                    },
                    {
                      name: 'company',
                      type: 'text',
                      label: 'Company',
                    },
                    {
                      name: 'address1',
                      type: 'text',
                      label: 'Address Line 1',
                      required: true,
                    },
                    {
                      name: 'address2',
                      type: 'text',
                      label: 'Address Line 2',
                    },
                    {
                      name: 'fullAddress',
                      type: 'text',
                      label: 'Full Address',
                      admin: {
                        readOnly: true,
                      },
                    },
                    {
                      name: 'city',
                      type: 'text',
                      label: 'City',
                      required: true,
                    },
                    {
                      name: 'country',
                      type: 'text',
                      label: 'Country',
                      required: true,
                    },
                    {
                      name: 'postalCode',
                      type: 'text',
                      label: 'Postal Code',
                      required: true,
                    },
                    {
                      name: 'province',
                      type: 'text',
                      label: 'Province',
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      label: 'Phone',
                    },
                    {
                      name: 'vatNumber',
                      type: 'text',
                      label: 'VAT Number',
                    },
                    {
                      name: 'hasMinimalRequiredInfo',
                      type: 'checkbox',
                      label: 'Has Minimal Required Info',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'shippingDetails',
                  label: 'Shipping Details',
                  fields: [
                    {
                      name: 'cost',
                      type: 'number',
                      label: 'Shipping Cost',
                      required: true,
                    },
                    {
                      name: 'method',
                      type: 'text',
                      label: 'Shipping Method',
                      required: true,
                    },
                    {
                      name: 'status',
                      type: 'number',
                      label: 'Shipping Status',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'shippingRates',
                  label: 'Shipping Rates',
                  fields: [
                    {
                      name: 'loading',
                      type: 'checkbox',
                      label: 'Loading',
                    },
                    {
                      name: 'status',
                      type: 'text',
                      label: 'Status',
                    },
                    {
                      name: 'items',
                      type: 'array',
                      label: 'Items',
                      fields: [
                        {
                          name: 'item',
                          type: 'text',
                          label: 'Item',
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
          label: 'Discounts',
          fields: [
            {
              name: 'discounts',
              type: 'array',
              label: 'Discounts',
              fields: [
                {
                  name: 'item',
                  type: 'text',
                  label: 'Discount Item',
                  admin: { placeholder: 'Enter discount details.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Order Info',
          fields: [
            {
              name: 'status',
              type: 'number',
              label: 'Order Status',
              required: true,
            },
            {
              name: 'token',
              type: 'text',
              label: 'Order Token',
              required: true,
            },
            {
              name: 'email',
              type: 'text',
              label: 'Customer Email',
              required: true,
            },
          ],
        },
        {
          label: 'Taxes',
          fields: [
            {
              name: 'taxes',
              type: 'group',
              label: 'Taxes',
              fields: [
                { name: 'loading', type: 'checkbox', label: 'Loading' },
                { name: 'status', type: 'text', label: 'Tax Status' },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Tax Items',
                  fields: [{ name: 'item', type: 'text', label: 'Tax Item' }],
                },
              ],
            },
            {
              name: 'discountInducedTaxesVariation',
              type: 'number',
              label: 'Discount Induced Taxes Variation',
            },
          ],
        },
        {
          label: 'Currency & Totals',
          fields: [
            {
              name: 'currency',
              type: 'text',
              label: 'Currency',
              required: true,
            },
            {
              name: 'subtotal',
              type: 'number',
              label: 'Subtotal',
              required: true,
            },
            {
              name: 'total',
              type: 'number',
              label: 'Total',
              required: true,
            },
            {
              name: 'invoiceNumber',
              type: 'text',
              label: 'Invoice Number',
              required: true,
            },
          ],
        },
        {
          label: 'Card Information',
          fields: [
            {
              name: 'card',
              type: 'group',
              label: 'Card Information',
              fields: [
                {
                  name: 'last4',
                  type: 'text',
                  label: 'Card Last Four Digits',
                  required: true,
                },
                {
                  name: 'brand',
                  type: 'text',
                  label: 'Card Brand',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Payment Details',
          fields: [
            {
              name: 'paymentDetails',
              type: 'group',
              label: 'Payment Details',
              fields: [
                {
                  name: 'method',
                  type: 'text',
                  label: 'Payment Method',
                  required: true,
                },
                {
                  name: 'status',
                  type: 'number',
                  label: 'Payment Status',
                  required: true,
                },
                {
                  name: 'details',
                  type: 'json',
                  label: 'Payment Details',
                },
                {
                  name: 'iconUrl',
                  type: 'text',
                  label: 'Payment Icon URL',
                },
                {
                  name: 'instructions',
                  type: 'text',
                  label: 'Payment Instructions',
                },
                {
                  name: 'display',
                  type: 'text',
                  label: 'Payment Display',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
