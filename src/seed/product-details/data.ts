import { Page } from '@payload-types'

export type ProductDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const productDetailsPageData: ProductDetailsPageDataType = {
  title: 'Product Details',

  layout: [
    {
      id: '6775323a5b30ca73ea7dff30',
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

  breadcrumbs: [
    {
      id: '67753270c405f90001543f8a',
      doc: 2,
      url: '/products',
      label: 'Products',
    },

    {
      id: '67753270c405f90001543f8b',
      doc: 3,
      url: '/product/[product-details]',
      label: 'Product Details',
    },
  ],
  _status: 'published',
}
