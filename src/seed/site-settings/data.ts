import path from 'path'
import { DataFromGlobalSlug } from 'payload'

export type siteSettingsDataType = Omit<
  DataFromGlobalSlug<'site-settings'>,
  'id'
>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  // id: 1,

  general: {
    title: 'Quikbuy',
    description: 'Quick & easy purchasing focus.',

    faviconUrl: {
      id: 14,
      alt: 'quik-buy-svg',
      updatedAt: '2025-01-01T12:26:04.696Z',
      createdAt: '2025-01-01T12:26:04.696Z',
      url: '/api/media/file/quik-buy-1.svg',
      thumbnailURL: null,
      filename: 'quik-buy-1.svg',
      mimeType: 'image/svg+xml',
      filesize: 793,
      width: 50,
      height: 50,
      focalX: null,
      focalY: null,

      sizes: {
        thumbnail: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },

        blogImageSize2: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },

        blogImageSize3: {
          url: null,
          width: null,
          height: null,
          mimeType: null,
          filesize: null,
          filename: null,
        },
      },
    },

    ogImageUrl: {
      id: 15,
      alt: 'open-graph-image',
      updatedAt: '2025-01-01T12:26:43.147Z',
      createdAt: '2025-01-01T12:26:43.147Z',
      url: '/api/media/file/open-graph-image.webp',
      thumbnailURL: null,
      filename: 'open-graph-image.webp',
      mimeType: 'image/webp',
      filesize: 87282,
      width: 3840,
      height: 2192,
      focalX: 50,
      focalY: 50,

      sizes: {
        thumbnail: {
          url: '/api/media/file/open-graph-image-400x300.webp',
          width: 400,
          height: 300,
          mimeType: 'image/webp',
          filesize: 6332,
          filename: 'open-graph-image-400x300.webp',
        },

        blogImageSize2: {
          url: '/api/media/file/open-graph-image-986x563.webp',
          width: 986,
          height: 563,
          mimeType: 'image/webp',
          filesize: 15304,
          filename: 'open-graph-image-986x563.webp',
        },

        blogImageSize3: {
          url: '/api/media/file/open-graph-image-1470x839.webp',
          width: 1470,
          height: 839,
          mimeType: 'image/webp',
          filesize: 25432,
          filename: 'open-graph-image-1470x839.webp',
        },
      },
    },

    keywords: ['e-commerce'],
    currency: 'usd',
  },

  navbar: {
    logo: {
      imageUrl: {
        id: 13,
        alt: 'quik-buy',
        updatedAt: '2025-01-01T12:23:37.036Z',
        createdAt: '2025-01-01T12:23:37.036Z',
        url: '/api/media/file/quik-buy.png',
        thumbnailURL: null,
        filename: 'quik-buy.png',
        mimeType: 'image/png',
        filesize: 499,
        width: 50,
        height: 50,
        focalX: 50,
        focalY: 50,

        sizes: {
          thumbnail: {
            url: null,
            width: null,
            height: null,
            mimeType: null,
            filesize: null,
            filename: null,
          },

          blogImageSize2: {
            url: '/api/media/file/quik-buy-986x986.png',
            width: 986,
            height: 986,
            mimeType: 'image/png',
            filesize: 109113,
            filename: 'quik-buy-986x986.png',
          },

          blogImageSize3: {
            url: '/api/media/file/quik-buy-1470x1470.png',
            width: 1470,
            height: 1470,
            mimeType: 'image/png',
            filesize: 183420,
            filename: 'quik-buy-1470x1470.png',
          },
        },
      },
      height: null,
      width: null,
    },

    menuLinks: [
      {
        id: '677534985b30ca73ea7dff32',
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Apparel',

          page: {
            relationTo: 'pages',

            value: {
              id: 4,
              title: 'Apparel',

              meta: {
                title: null,
                description: null,
                image: null,
              },
              isHome: false,
              isDynamic: false,
              slugMode: 'generate',
              slug: 'apparel',
              pathMode: 'generate',
              path: '/apparel',
              parent: null,

              breadcrumbs: [
                {
                  id: '67753416c405f90001543f92',
                  doc: 4,
                  url: '/apparel',
                  label: 'Apparel',
                },
              ],
              updatedAt: '2025-01-01T12:24:54.665Z',
              createdAt: '2025-01-01T12:24:53.492Z',
              _status: 'published',

              layout: [],
            },
          },
          url: null,
          id: '677cd0b1e38d28000151ed5c',
        },

        menuLinkGroup: {
          groupTitle: '',

          groupLinks: [],
        },
      },

      {
        id: '677534a45b30ca73ea7dff33',
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Accessories',

          page: {
            relationTo: 'pages',

            value: {
              id: 5,
              title: 'Accessories',

              meta: {
                title: null,
                description: null,
                image: null,
              },
              isHome: false,
              isDynamic: false,
              slugMode: 'generate',
              slug: 'accessories',
              pathMode: 'generate',
              path: '/accessories',
              parent: null,

              breadcrumbs: [
                {
                  id: '67753423c405f90001543f94',
                  doc: 5,
                  url: '/accessories',
                  label: 'Accessories',
                },
              ],
              updatedAt: '2025-01-01T12:25:07.096Z',
              createdAt: '2025-01-01T12:25:05.956Z',
              _status: 'published',

              layout: [],
            },
          },
          url: null,
          id: '677cd0b1e38d28000151ed5e',
        },

        menuLinkGroup: {
          groupTitle: '',

          groupLinks: [],
        },
      },

      {
        id: '677534ae5b30ca73ea7dff34',
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Digital',

          page: {
            relationTo: 'pages',

            value: {
              id: 6,
              title: 'Digital',

              meta: {
                title: null,
                description: null,
                image: null,
              },
              isHome: false,
              isDynamic: false,
              slugMode: 'generate',
              slug: 'digital',
              pathMode: 'generate',
              path: '/digital',
              parent: null,

              breadcrumbs: [
                {
                  id: '6775342cc405f90001543f96',
                  doc: 6,
                  url: '/digital',
                  label: 'Digital',
                },
              ],
              updatedAt: '2025-01-01T12:25:16.070Z',
              createdAt: '2025-01-01T12:25:14.912Z',
              _status: 'published',

              layout: [],
            },
          },
          url: null,
          id: '677cd0b1e38d28000151ed60',
        },

        menuLinkGroup: {
          groupTitle: '',

          groupLinks: [],
        },
      },
    ],
  },

  footer: {
    logo: {
      imageUrl: {
        id: 13,
        alt: 'quik-buy',
        updatedAt: '2025-01-01T12:23:37.036Z',
        createdAt: '2025-01-01T12:23:37.036Z',
        url: '/api/media/file/quik-buy.png',
        thumbnailURL: null,
        filename: 'quik-buy.png',
        mimeType: 'image/png',
        filesize: 499,
        width: 50,
        height: 50,
        focalX: 50,
        focalY: 50,

        sizes: {
          thumbnail: {
            url: null,
            width: null,
            height: null,
            mimeType: null,
            filesize: null,
            filename: null,
          },

          blogImageSize2: {
            url: '/api/media/file/quik-buy-986x986.png',
            width: 986,
            height: 986,
            mimeType: 'image/png',
            filesize: 109113,
            filename: 'quik-buy-986x986.png',
          },

          blogImageSize3: {
            url: '/api/media/file/quik-buy-1470x1470.png',
            width: 1470,
            height: 1470,
            mimeType: 'image/png',
            filesize: 183420,
            filename: 'quik-buy-1470x1470.png',
          },
        },
      },
      height: null,
      width: null,
      description: null,
    },

    footerLinks: [],

    socialLinks: [],
    copyright: null,
  },

  redirectionLinks: {
    productLink: {
      relationTo: 'pages',

      value: {
        id: 3,
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
        parent: 2,

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
        updatedAt: '2025-01-01T12:17:52.710Z',
        createdAt: '2025-01-01T12:17:51.070Z',
        _status: 'published',
      },
    },
  },

  monetization: {
    adSenseId: null,
    measurementId: null,
  },

  themeSettings: {
    lightMode: {
      primary: '#C084FC',
      background: '#F8FAFC',
      text: '#0F0F0F',
      foreground: '#E2E8F0',
      popover: '#000000',
      border: '#000000',
    },

    darkMode: {
      primary: '#60A5FA',
      background: '#0F172A',
      text: '#FFFAFA',
      foreground: '#1E293B',
      popover: '#000000',
      border: '#000000',
    },

    fonts: {
      display: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Chewy&display=swap',
        fontName: 'Chewy',
      },

      body: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        fontName: 'Roboto',
      },
    },
    radius: 'none',
  },

  productInformation: {
    currency: null,
  },
  // updatedAt: '2025-01-07T06:11:18.572Z',
  createdAt: null,
}

export const siteSettingsImages: ImageType[] = [
  {
    alt: 'og-image',
    filePath: path.join(process.cwd(), '/public/images/seed/og-image.png'),
  },
  {
    alt: 'favicon-url',
    filePath: path.join(process.cwd(), '/public/images/seed/quik-buy-logo.png'),
  },
]
