import { Block } from 'payload'

const CategoriesConfig: Block = {
  slug: 'Categories',
  interfaceName: 'CategoriesType',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  fields: [
    {
      name: 'categories',
      label: 'categories',
      type: 'array',
      fields: [
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'categories',
        },
      ],
    },
  ],
}

export default CategoriesConfig
