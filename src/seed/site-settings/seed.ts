import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import path from 'path'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedSiteSettings = async ({
  contactPage,
  spinner,
}: {
  spinner: Ora
  contactPage: Page
}) => {
  spinner.start('Started creating site-settings...')

  try {
    const ogImageUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(process.cwd(), '/public/images/seed/og-image.png'),
    })

    const faviconUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'favicon-url',
      },
      filePath: path.join(
        process.cwd(),
        '/public/images/seed/quik-buy-logo.png',
      ),
    })

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: {
        general: {
          title: 'QuikBuy',
          description: 'Quick & easy purchasing focus.',
          keywords: ['e-commerce'],
          faviconUrl: faviconUrl.id,
          ogImageUrl: ogImageUrl.id,
        },
        navbar: {
          logo: {
            imageUrl: faviconUrl.id,
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
                  // value: blogsPage.id,
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
      },
    })

    spinner.succeed('Successfully creating site-settings...')
    return result
  } catch (error) {
    spinner.fail('Failed creating site-settings...')
    throw error
  }
}
