import path from 'path';
import { DataFromGlobalSlug } from 'payload';


export type siteSettingsDataType = Omit<
  DataFromGlobalSlug<'site-settings'>,
  'id'
>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'QuikBuy',
    description: 'Quick & easy purchasing focus.',
    keywords: ['e-commerce'],
    faviconUrl: 0,
    ogImageUrl: 1,
  },
  navbar: {
    logo: {
      imageUrl: 0,
      description: 'Quick & easy purchasing focus.',
      height: 24,
      width: 24,
    },
    menuLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Apparel',
          page: {
            relationTo: 'pages',
            value: ,
          },
        },

        menuLinkGroup: {
          groupLinks: [],
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Accessories',
          page: {
            relationTo: 'pages',
            // value: authorPages.id,
          },
        },

        menuLinkGroup: {
          groupLinks: [],
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Digital',
          page: {
            relationTo: 'pages',
            // value: contactPage.id,
          },
        },

        menuLinkGroup: {
          groupLinks: [],
        },
      },
    ],
  },
  footer: {
    logo: {
      height: 24,
      width: 24,
      description: 'Quick & easy purchasing focus.',
      imageUrl: faviconUrl.id,
    },
    copyright: '© 2024 all rights reserved',
    footerLinks: [],
    socialLinks: [
      {
        platform: 'youtube',
        value: 'https://youtube.com',
      },
      {
        platform: 'instagram',
        value: 'https://instagram.com',
      },
    ],
  },
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
