import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type ProductDataType = RequiredDataFromCollectionSlug<'products'>

export type ProductImageType = {
  alt: string
  filePath: string
}

export const productsData: ProductDataType[] = [
  {
    name: 'Sunbeam Tote',
    slug: 'sunbeam-tote',
    description:
      "Brighten your day with this cheerful yellow bag. Its vibrant color and ample storage space make it an excellent choice for shopping or day trips. Lightweight and durable, it's designed for comfort and convenience. Test",
    brand: 'temp',
    stock: 5,
    price: 25,

    discount: {
      percentage: 5,
      startDate: '2025-01-02T11:30:00.000Z',
      endDate: '2025-01-04T11:30:00.000Z',
    },
    finalPrice: 23.75,

    category: {
      id: 1,
      name: 'Apparel',
      slug: 'apparel',
      description: null,
      parentCategory: null,

      subCategories: [],
      isFeatured: false,
      image: 2,

      products: {
        docs: [2, 1],
        hasNextPage: false,
      },
      productCount: 2,

      meta: {
        title: null,
        description: null,
        image: null,
      },
      updatedAt: '2025-01-05T15:23:30.576Z',
      createdAt: '2025-01-01T12:02:43.483Z',
      _status: 'published',
    },

    tags: [],

    attributes: [],

    images: [0, 1, 2, 3],
    isFeatured: false,
    isNewArrival: false,
    isSpecialOffer: false,
    isShippable: true,

    additionalInformationSections: [],
    snipcartId: null,
    _status: 'published',
  },
  {
    name: 'ShadowStride Shoes',
    slug: 'shadowstride-shoes',
    description:
      'These classic black shoes are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned sole ensures all-day comfort.',
    brand: 'temp2',
    stock: 10,
    price: 20,

    discount: {
      percentage: null,
      startDate: null,
      endDate: null,
    },
    finalPrice: 20,

    category: {
      id: 1,
      name: 'Apparel',
      slug: 'apparel',
      description: null,
      parentCategory: null,

      subCategories: [],
      isFeatured: false,
      image: 2,

      products: {
        docs: [2, 1],
        hasNextPage: false,
      },
      productCount: 2,

      meta: {
        title: null,
        description: null,
        image: null,
      },
      updatedAt: '2025-01-05T15:23:30.576Z',
      createdAt: '2025-01-01T12:02:43.483Z',
      _status: 'published',
    },

    tags: [],

    attributes: [],

    images: [4],
    isFeatured: false,
    isNewArrival: false,
    isSpecialOffer: false,
    isShippable: true,

    additionalInformationSections: [],
    snipcartId: null,
    _status: 'published',
  },
  {
    name: 'Horizon Gaze Sunglasses',
    slug: 'horizon-gaze-sunglasses',
    description:
      'Protect your eyes in style with these chic sunglasses. Featuring polarized lenses, they offer superior UV protection. The lightweight frame provides comfort and a timeless look.tem',
    brand: 'temp',
    stock: 10,
    price: 20,

    discount: {
      percentage: null,
      startDate: null,
      endDate: null,
    },
    finalPrice: 20,

    category: {
      id: 2,
      name: 'Accessories',
      slug: 'accessories',
      description: null,
      parentCategory: null,

      subCategories: [],
      isFeatured: false,
      image: 16,

      products: {
        docs: [3],
        hasNextPage: false,
      },
      productCount: 1,

      meta: {
        title: null,
        description: null,
        image: null,
      },
      updatedAt: '2025-01-01T12:57:08.534Z',
      createdAt: '2025-01-01T12:55:27.071Z',
      _status: 'published',
    },

    tags: [],

    attributes: [],

    images: [5],
    isFeatured: false,
    isNewArrival: false,
    isSpecialOffer: false,
    isShippable: true,

    additionalInformationSections: [],
    snipcartId: null,
    _status: 'published',
  },
]

export const productsImagesData: ProductImageType[] = [
  {
    alt: 'Bag 1',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/bag1.webp',
    ),
  },
  {
    alt: 'Bag 2',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/bag2.webp',
    ),
  },
  {
    alt: 'Bag 3',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/bag3.webp',
    ),
  },
  {
    alt: 'Bag 4',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/bag4.webp',
    ),
  },
  {
    alt: 'shoes',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/shoes.webp',
    ),
  },
  {
    alt: 'Sun glasses',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/products/sun-glasses.webp',
    ),
  },
]
