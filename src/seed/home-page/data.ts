import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type HomePageDataType = RequiredDataFromCollectionSlug<'pages'>

export type HomePageImageType = {
  alt: string
  filePath: string
}

export const homepageData: HomePageDataType = {
  title: 'Home Page',

  layout: [
    {
      title: 'Discover our Curated Collection',
      description:
        'Explore our carefully selected products for your home and lifestyle.',
      blockName: null,
      blockType: 'Home',
      image: 0,
    },

    {
      blockName: null,

      featuredProducts: [
        {
          products: [
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
              snipcartId: null,
              updatedAt: '2025-01-05T15:23:29.989Z',
              createdAt: '2025-01-01T12:06:09.590Z',
              _status: 'published',
            },
          ],
        },

        {
          products: [
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
              snipcartId: null,
              updatedAt: '2025-01-01T12:15:58.674Z',
              createdAt: '2025-01-01T12:15:58.674Z',
              _status: 'published',
            },
          ],
        },

        {
          products: [
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
              snipcartId: null,
              updatedAt: '2025-01-01T12:57:07.790Z',
              createdAt: '2025-01-01T12:57:07.790Z',
              _status: 'published',
            },
          ],
        },
      ],
      blockType: 'FeaturedProducts',
    },

    {
      blockName: null,

      categories: [
        {
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
        },

        {
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
        },
      ],
      blockType: 'Categories',
    },
  ],

  meta: {
    title: null,
    description: null,
    image: null,
  },
  isHome: true,
  isDynamic: false,
  slugMode: 'generate',
  slug: 'home-page',
  pathMode: 'generate',
  path: '/',
  parent: null,
  _status: 'published',
}

export const homePageImagesData: HomePageImageType[] = [
  {
    alt: 'Banner block image',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/home-page/banner-block-image.webp',
    ),
  },
]
