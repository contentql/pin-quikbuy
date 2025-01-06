import { RequiredDataFromCollectionSlug } from 'payload'

export type CategoriesDataType = RequiredDataFromCollectionSlug<'categories'>

export type CategoriesImageType = {
  alt: string
  filePath: string
}

export const categoriesData: CategoriesDataType[] = [
  {
    // id: 1,
    name: 'Apparel',
    slug: 'apparel',
    description: null,
    parentCategory: null,

    subCategories: [],
    isFeatured: false,

    image: {
      id: 2,
      alt: 'apparel-image',
      updatedAt: '2025-01-01T12:02:37.656Z',
      createdAt: '2025-01-01T12:02:37.656Z',
      url: '/api/media/file/apparel-image.webp',
      thumbnailURL: null,
      filename: 'apparel-image.webp',
      mimeType: 'image/webp',
      filesize: 33178,
      width: 1200,
      height: 675,
      focalX: 50,
      focalY: 50,

      sizes: {
        thumbnail: {
          url: '/api/media/file/apparel-image-400x300.webp',
          width: 400,
          height: 300,
          mimeType: 'image/webp',
          filesize: 12286,
          filename: 'apparel-image-400x300.webp',
        },

        blogImageSize2: {
          url: '/api/media/file/apparel-image-986x555.webp',
          width: 986,
          height: 555,
          mimeType: 'image/webp',
          filesize: 27920,
          filename: 'apparel-image-986x555.webp',
        },

        blogImageSize3: {
          url: '/api/media/file/apparel-image-1470x827.webp',
          width: 1470,
          height: 827,
          mimeType: 'image/webp',
          filesize: 49154,
          filename: 'apparel-image-1470x827.webp',
        },
      },
    },

    products: {
      docs: [
        {
          id: 2,
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
          category: 1,

          tags: [],

          attributes: [],

          images: [9],
          isFeatured: false,
          isNewArrival: false,
          isSpecialOffer: false,
          isShippable: true,

          additionalInformationSections: [],
          // snipcartId: null,
          updatedAt: '2025-01-01T12:15:58.674Z',
          createdAt: '2025-01-01T12:15:58.674Z',
          _status: 'published',
        },

        {
          id: 1,
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
          category: 1,

          tags: [],

          attributes: [],

          images: [3, 4, 5, 6],
          isFeatured: false,
          isNewArrival: false,
          isSpecialOffer: false,
          isShippable: true,

          additionalInformationSections: [],
          // snipcartId: null,
          updatedAt: '2025-01-05T15:23:29.989Z',
          createdAt: '2025-01-01T12:06:09.590Z',
          _status: 'published',
        },
      ],
      hasNextPage: false,
    },
    productCount: 2,

    meta: {
      title: null,
      description: null,
      image: null,
    },
    // updatedAt: '2025-01-05T15:23:30.576Z',
    // createdAt: '2025-01-01T12:02:43.483Z',
    _status: 'published',
  },
  {
    // id: 2,
    name: 'Accessories',
    slug: 'accessories',
    description: null,
    parentCategory: null,

    subCategories: [],
    isFeatured: false,

    image: {
      id: 16,
      alt: 'accessories',
      updatedAt: '2025-01-01T12:55:24.999Z',
      createdAt: '2025-01-01T12:55:24.999Z',
      url: '/api/media/file/accessories.webp',
      thumbnailURL: null,
      filename: 'accessories.webp',
      mimeType: 'image/webp',
      filesize: 31958,
      width: 1200,
      height: 675,
      focalX: 50,
      focalY: 50,

      sizes: {
        thumbnail: {
          url: '/api/media/file/accessories-400x300.webp',
          width: 400,
          height: 300,
          mimeType: 'image/webp',
          filesize: 10704,
          filename: 'accessories-400x300.webp',
        },

        blogImageSize2: {
          url: '/api/media/file/accessories-986x555.webp',
          width: 986,
          height: 555,
          mimeType: 'image/webp',
          filesize: 25824,
          filename: 'accessories-986x555.webp',
        },

        blogImageSize3: {
          url: '/api/media/file/accessories-1470x827.webp',
          width: 1470,
          height: 827,
          mimeType: 'image/webp',
          filesize: 45064,
          filename: 'accessories-1470x827.webp',
        },
      },
    },

    products: {
      docs: [
        {
          id: 3,
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
          category: 2,

          tags: [],

          attributes: [],

          images: [17],
          isFeatured: false,
          isNewArrival: false,
          isSpecialOffer: false,
          isShippable: true,

          additionalInformationSections: [],
          updatedAt: '2025-01-01T12:57:07.790Z',
          createdAt: '2025-01-01T12:57:07.790Z',
          _status: 'published',
        },
      ],
      hasNextPage: false,
    },
    productCount: 1,

    meta: {
      title: null,
      description: null,
      image: null,
    },
    // updatedAt: '2025-01-01T12:57:08.534Z',
    // createdAt: '2025-01-01T12:55:27.071Z',
    _status: 'published',
  },
]

export const categoriesImages: {
  name: string
  imageURL: { url: string; alt: string }[]
}[] = [
  {
    name: 'Apparel',
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/categories/apparel.webp',
        alt: 'apparel image',
      },
    ],
  },
  {
    name: 'Accessories',
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/categories/accessories.webp',
        alt: 'accessories image',
      },
    ],
  },
  {
    name: 'Digital',
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/categories/digital.webp',
        alt: 'digital image',
      },
    ],
  },
]
