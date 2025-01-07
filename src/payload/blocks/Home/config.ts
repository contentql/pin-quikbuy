import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'Home',
  interfaceName: 'HomeType',
  labels: {
    singular: 'Home Block',
    plural: 'Home Blocks',
  },
  imageURL: '/images/blocks/hero-block.webp',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default HomeConfig
