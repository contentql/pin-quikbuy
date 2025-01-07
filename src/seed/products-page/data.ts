import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductsPageDataType = RequiredDataFromCollectionSlug<'pages'>

export const productsPageData: ProductsPageDataType = {
  title: 'Products',

  layout: [
    {
      id: '677531f9df41dccc1e7895f1',
      title: 'All Products',
      collectionSlug: 'products',
      blockName: null,
      blockType: 'List',
    },
  ],

  meta: {
    title: null,
    description: null,
    image: null,
  },
  isHome: false,
  isDynamic: false,
  slugMode: 'generate',
  slug: 'products',
  pathMode: 'generate',
  path: '/products',
  parent: null,
  _status: 'published',
}
