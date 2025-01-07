import path from 'path'
import { DataFromGlobalSlug } from 'payload'

export type SiteSettingsDataType = Omit<
  DataFromGlobalSlug<'site-settings'>,
  'id'
>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: SiteSettingsDataType = {
  general: {
    title: 'Quikbuy',
    description: 'Quick & easy purchasing focus.',

    faviconUrl: 0,

    ogImageUrl: 1,

    keywords: ['e-commerce'],
    currency: 'usd',
  },

  navbar: {
    logo: {
      imageUrl: 0,
      height: null,
      width: null,
    },

    menuLinks: [
      {
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Apparel',

          url: null,
          page: {
            relationTo: 'pages',
            value: 0,
          },
        },
      },

      {
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Accessories',

          page: {
            relationTo: 'pages',
            value: 0,
          },
          url: null,
        },
      },

      {
        group: false,

        menuLink: {
          type: 'reference',
          newTab: null,
          icon: null,
          label: 'Digital',

          page: {
            relationTo: 'pages',
            value: 0,
          },
          url: null,
        },
      },
    ],
  },

  footer: {
    logo: {
      imageUrl: 1,
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

      value: 1,
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
}

export const siteSettingsImages: ImageType[] = [
  {
    alt: 'favicon-url',
    filePath: path.join(process.cwd(), '/public/images/seed/quik-buy-logo.png'),
  },
  {
    alt: 'og-image',
    filePath: path.join(process.cwd(), '/public/images/seed/og-image.png'),
  },
]
