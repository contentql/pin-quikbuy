import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

export const getCachedSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
    })

    return data
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)
