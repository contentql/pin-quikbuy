import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import {
  SiteSettingsDataType,
  siteSettingsData,
  siteSettingsImages,
} from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<string | SiteSetting> => {
  try {
    spinner.start(`Started creating site settings...`)

    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          in: ['products', 'product-details'],
        },
      },
    })
    const productPageId = pages.find(page => page.slug === 'products')
      ?.id as number
    const productDetailsPageId = pages.find(
      page => page.slug === 'product-details',
    )?.id as number

    const siteSettingsImageSeedResult = await Promise.allSettled(
      siteSettingsImages.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )

    const formattedImagesResult = siteSettingsImageSeedResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const faviconImageId = formattedImagesResult.at(0)?.id as number
    const ogImageId = formattedImagesResult.at(1)?.id as number

    const formattedSiteSettingsData: SiteSettingsDataType = {
      ...siteSettingsData,
      general: {
        ...siteSettingsData.general,
        faviconUrl: faviconImageId,
        ogImageUrl: ogImageId,
      },
      navbar: {
        ...siteSettingsData.navbar,
        logo: {
          ...siteSettingsData.navbar.logo,
          imageUrl: faviconImageId,
        },
        menuLinks: siteSettingsData.navbar.menuLinks?.map(menuLinkData => {
          return {
            ...menuLinkData,
            menuLink: {
              ...menuLinkData.menuLink,
              label: menuLinkData.menuLink?.label as string,
              page: {
                relationTo: 'pages',
                value: productPageId,
              },
            },
          }
        }),
      },
      footer: {
        ...siteSettingsData.footer,
        logo: {
          ...siteSettingsData.footer.logo,
          imageUrl: faviconImageId,
        },
      },
      redirectionLinks: {
        ...siteSettingsData.redirectionLinks,
        productLink: {
          relationTo: 'pages',
          value: productDetailsPageId,
        },
      },
    }

    const result = await payload.updateGlobal({
      slug: 'site-settings',
      data: formattedSiteSettingsData,
    })

    spinner.succeed(`Successfully created site settings.`)

    return result
  } catch (error) {
    spinner.fail(`Failed to create site settings.`)

    throw error
  }
}

export default seed
