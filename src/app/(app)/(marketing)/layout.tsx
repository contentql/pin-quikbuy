import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { SearchProvider } from '@/components/SearchContext'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  const payload = await getPayload({
    config: configPromise,
  })

  const { docs: categoriesData } = await payload.find({
    collection: 'categories',
  })

  const { docs: productsData } = await payload.find({
    collection: 'products',
  })

  return (
    <MetadataProvider metadata={metadata}>
      <SearchProvider>
        <div className='flex min-h-full flex-1 flex-col bg-white'>
          <Navbar
            metadata={metadata}
            user={user}
            categoriesData={categoriesData}
            productsData={productsData}
          />
          {/* <SecondNavbar /> */}
          <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8'>
            {children}
          </main>
          <Footer metadata={metadata} />
          <Branding />
        </div>
      </SearchProvider>
    </MetadataProvider>
  )
}

export default MarketingLayout
