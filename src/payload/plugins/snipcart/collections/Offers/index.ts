import { isAdmin } from '../../access/isAdmin'
import { revalidateOffers } from '../../hooks/revalidateOffers'
import { slugField } from 'node_modules/@contentql/core/dist/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: {
    singular: 'Offer',
    plural: 'Offers',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [revalidateOffers],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField({
      fieldToUse: 'name',
      overrides: {
        name: 'slug',
        type: 'text',
        required: true,
        admin: {
          placeholder: 'Auto-generated slug based on category name',
          description: 'SEO-friendly URL for this category.',
        },
      },
    }),
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'discountPercentage',
      type: 'number',
      min: 0,
      max: 100,
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
    },
    {
      name: 'associatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Associated Products',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      label: 'Active',
    },
  ],
}
