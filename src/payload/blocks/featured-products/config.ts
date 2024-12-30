import { Block } from 'payload'

const FeaturedProductsConfig: Block = {
  slug: 'FeaturedProducts',
  interfaceName: 'FeaturedProductsType',
  labels: {
    singular: 'Featured Products',
    plural: 'Featured Products',
  },
  fields: [
    {
      name: 'featuredProducts',
      label: 'Featured Products',
      type: 'array',
      fields: [
        {
          name: 'products',
          label: 'Products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
        },
      ],
    },
  ],
}

export default FeaturedProductsConfig
