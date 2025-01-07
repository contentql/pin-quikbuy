import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductDetailsPageDataType = RequiredDataFromCollectionSlug<'pages'>

export const productDetailsPageData: ProductDetailsPageDataType = {
  title: 'Product Details',

  layout: [
    {
      collectionSlug: 'products',
      blockName: null,
      blockType: 'Details',
    },
  ],

  meta: {
    title: null,
    description: null,
    image: null,
  },
  isHome: false,
  isDynamic: true,
  slugMode: 'generate',
  slug: 'product-details',
  pathMode: 'generate',
  path: '/product/[product-details]',

  parent: {
    id: 2,
    title: 'Products',

    layout: [
      {
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

    breadcrumbs: [
      {
        id: '67753226c405f90001543f86',
        doc: 2,
        url: '/products',
        label: 'Products',
      },
    ],
    updatedAt: '2025-01-01T12:16:38.518Z',
    createdAt: '2025-01-01T12:16:37.102Z',
    _status: 'published',
  },

  _status: 'published',
}
